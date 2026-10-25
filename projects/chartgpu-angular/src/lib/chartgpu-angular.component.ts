import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  afterNextRender,
  effect,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import {
  ChartGPU,
  type ChartGPUCrosshairMovePayload,
  type ChartGPUDeviceLostPayload,
  type ChartGPUEventPayload,
  type ChartGPUInstance,
  type ChartGPUZoomRangeChangePayload,
  type OHLCDataPoint,
} from 'chartgpu';
import type {
  ChartgpuAppendDataOptions,
  ChartgpuCartesianSeriesData,
  ChartgpuChartHandle,
  ChartgpuClickEvent,
  ChartgpuDataAppendEvent,
  ChartgpuGPUContext,
  ChartgpuOptions,
  ChartgpuReadyEvent,
  ChartgpuResizeEvent,
  ChartgpuStyle,
  ChartgpuZoomChangeEvent,
  ChartgpuZoomRangeChangeEvent,
} from './chartgpu-angular.types';

@Component({
  selector: 'lib-chartgpu-angular',
  standalone: true,
  imports: [NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'chartgpu-angular' },
  template: `
    <div
      #host
      class="chartgpu-host"
      [class]="className() ?? ''"
      [ngStyle]="style()"
      (click)="emitClick($event)"
    >
      <div #canvasHost class="chartgpu-canvas-host"></div>
      @if (initializationError(); as error) {
        <div class="chartgpu-error" role="alert">{{ error.message }}</div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .chartgpu-host {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .chartgpu-canvas-host {
      position: absolute;
      inset: 0;
    }

    .chartgpu-error {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      padding: 1rem;
      text-align: center;
    }
  `],
})
export class ChartGpuAngularComponent implements ChartgpuChartHandle, OnDestroy {
  readonly options = input.required<ChartgpuOptions>();
  readonly gpuContext = input<ChartgpuGPUContext | null>(null);
  readonly theme = input<ChartgpuOptions['theme'] | undefined>(undefined);
  readonly className = input<string | undefined>();
  readonly style = input<ChartgpuStyle | undefined>();

  readonly ready = output<ChartgpuReadyEvent>();
  readonly chartReady = output<ChartGPUInstance>();
  readonly chartDispose = output<void>();
  readonly resize = output<ChartgpuResizeEvent>();
  readonly click = output<ChartgpuClickEvent>();
  readonly chartClick = output<ChartGPUEventPayload>();
  readonly mouseOver = output<ChartGPUEventPayload>();
  readonly mouseOut = output<ChartGPUEventPayload>();
  readonly crosshairMove = output<ChartGPUCrosshairMovePayload>();
  readonly dataAppend = output<ChartgpuDataAppendEvent>();
  readonly zoomChange = output<ChartgpuZoomChangeEvent>();
  readonly zoomRangeChange = output<ChartgpuZoomRangeChangeEvent>();
  readonly deviceLost = output<ChartGPUDeviceLostPayload>();
  readonly chartError = output<Error>();

  readonly host = viewChild<ElementRef<HTMLDivElement>>('host');
  readonly canvasHost = viewChild<ElementRef<HTMLDivElement>>('canvasHost');

  private readonly chartInstance = signal<ChartGPUInstance | null>(null);
  readonly initializationError = signal<Error | null>(null);
  private chartContainer?: HTMLDivElement;
  private createdWithOptions?: {
    options: ChartgpuOptions;
    theme: ChartgpuOptions['theme'] | undefined;
  };
  private resizeTimeout?: ReturnType<typeof setTimeout>;
  private resizeObserver?: ResizeObserver;
  private removeChartListeners?: () => void;
  private destroying = false;

  constructor(private readonly destroyRef: DestroyRef) {
    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
      if (this.resizeTimeout !== undefined) {
        clearTimeout(this.resizeTimeout);
      }
      this.disposeChart();
    });

    afterNextRender(() => {
      const container = this.host()?.nativeElement;
      if (container) {
        this.observeResize(container);
      }
    });

    effect(onCleanup => {
      const container = this.canvasHost()?.nativeElement;
      const options = this.options();
      const gpuContext = this.gpuContext();
      const theme = this.theme();

      this.initializationError.set(null);
      if (!container) {
        this.disposeChart();
        return;
      }
      if (typeof navigator === 'undefined' || !('gpu' in navigator)) {
        this.reportError(new Error('WebGPU not supported in this browser'));
        return;
      }

      if (untracked(() => this.chartInstance()) && this.chartContainer === container) {
        return;
      }

      let cancelled = false;
      let createdInstance: ChartGPUInstance | undefined;
      const initialOptions = this.getEffectiveOptions(options, theme);

      void (gpuContext
        ? ChartGPU.create(container, initialOptions, gpuContext)
        : ChartGPU.create(container, initialOptions)
      ).then(instance => {
        createdInstance = instance;
        if (cancelled) {
          instance.dispose();
          return;
        }

        try {
          const latest = untracked(() => ({
            options: this.options(),
            theme: this.theme(),
          }));
          if (latest.options !== options || latest.theme !== theme) {
            instance.setOption(this.getEffectiveOptions(latest.options, latest.theme));
          }

          this.createdWithOptions = latest;
          this.chartContainer = container;
          this.chartInstance.set(instance);
          this.removeChartListeners = this.listenToChart(instance);
          this.ready.emit({ container });
          this.chartReady.emit(instance);

          const range = instance.getZoomRange();
          if (range) {
            this.emitZoomRange(range);
          }
        } catch (cause: unknown) {
          instance.dispose();
          throw cause;
        }
      }).catch((cause: unknown) => {
        if (cancelled) {
          return;
        }
        if (createdInstance && this.chartInstance() !== createdInstance && !createdInstance.disposed) {
          createdInstance.dispose();
        }
        this.reportError(cause);
      });

      onCleanup(() => {
        cancelled = true;
        if (this.chartContainer === container) {
          this.disposeChart();
        }
      });
    }, { allowSignalWrites: true });

    effect(() => {
      const options = this.options();
      const theme = this.theme();
      const instance = this.chartInstance();
      if (!instance || instance.disposed) {
        return;
      }

      if (this.createdWithOptions?.options === options && this.createdWithOptions.theme === theme) {
        this.createdWithOptions = undefined;
        return;
      }

      try {
        instance.setOption(this.getEffectiveOptions(options, theme));
      } catch (cause: unknown) {
        this.reportError(cause);
      }
    }, { allowSignalWrites: true });
  }

  protected emitClick(event: MouseEvent): void {
    this.click.emit({ x: event.offsetX, y: event.offsetY });
  }

  ngOnDestroy(): void {
    this.destroying = true;
  }

  getChart(): ChartGPUInstance | null {
    const instance = this.chartInstance();
    return instance && !instance.disposed ? instance : null;
  }

  getContainer(): HTMLDivElement | null {
    return this.canvasHost()?.nativeElement ?? null;
  }

  appendData(
    seriesIndex: number,
    newPoints: ChartgpuCartesianSeriesData | OHLCDataPoint[],
    options?: ChartgpuAppendDataOptions,
  ): void {
    this.getChart()?.appendData(seriesIndex, newPoints, options);
  }

  renderFrame(): boolean {
    return this.getChart()?.renderFrame() ?? false;
  }

  needsRender(): boolean {
    return this.getChart()?.needsRender() ?? false;
  }

  getRenderMode(): 'auto' | 'external' {
    return this.getChart()?.getRenderMode() ?? 'auto';
  }

  setRenderMode(mode: 'auto' | 'external'): void {
    this.getChart()?.setRenderMode(mode);
  }

  setOption(options: ChartgpuOptions): void {
    this.getChart()?.setOption(options);
  }

  setZoomRange(start: number, end: number, source?: unknown): void {
    this.getChart()?.setZoomRange(start, end, source);
  }

  setInteractionX(x: number | null, source?: unknown): void {
    this.getChart()?.setInteractionX(x, source);
  }

  getInteractionX(): number | null {
    return this.getChart()?.getInteractionX() ?? null;
  }

  hitTest(event: PointerEvent | MouseEvent) {
    return this.getChart()?.hitTest(event) ?? null;
  }

  private getEffectiveOptions(
    options: ChartgpuOptions,
    theme: ChartgpuOptions['theme'] | undefined,
  ): ChartgpuOptions {
    return theme !== undefined ? { ...options, theme } : options;
  }

  private listenToChart(instance: ChartGPUInstance): () => void {
    const click = (payload: ChartGPUEventPayload) => this.chartClick.emit(payload);
    const mouseOver = (payload: ChartGPUEventPayload) => this.mouseOver.emit(payload);
    const mouseOut = (payload: ChartGPUEventPayload) => this.mouseOut.emit(payload);
    const crosshairMove = (payload: ChartGPUCrosshairMovePayload) => this.crosshairMove.emit(payload);
    const dataAppend = (payload: ChartgpuDataAppendEvent) => this.dataAppend.emit(payload);
    const zoomChange = (payload: ChartGPUZoomRangeChangePayload) => this.emitZoomRange(payload);
    const deviceLost = (payload: ChartGPUDeviceLostPayload) => this.deviceLost.emit(payload);

    instance.on('click', click);
    instance.on('mouseover', mouseOver);
    instance.on('mouseout', mouseOut);
    instance.on('crosshairMove', crosshairMove);
    instance.on('dataAppend', dataAppend);
    instance.on('zoomRangeChange', zoomChange);
    instance.on('deviceLost', deviceLost);

    return () => {
      if (instance.disposed) {
        return;
      }
      instance.off('click', click);
      instance.off('mouseover', mouseOver);
      instance.off('mouseout', mouseOut);
      instance.off('crosshairMove', crosshairMove);
      instance.off('dataAppend', dataAppend);
      instance.off('zoomRangeChange', zoomChange);
      instance.off('deviceLost', deviceLost);
    };
  }

  private emitZoomRange(range: { start: number; end: number }): void {
    this.zoomChange.emit({ range: { start: range.start, end: range.end } });
    this.zoomRangeChange.emit({ start: range.start, end: range.end });
  }

  private observeResize(container: HTMLDivElement): void {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    this.resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      const { width, height } = entry.contentRect;
      this.resize.emit({ width, height, container });
      if (this.resizeTimeout !== undefined) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout(() => {
        this.chartInstance()?.resize();
        this.resizeTimeout = undefined;
      }, 100);
    });
    this.resizeObserver.observe(container);
  }

  private reportError(cause: unknown): void {
    const error = cause instanceof Error ? cause : new Error(String(cause));
    this.initializationError.set(error);
    this.chartError.emit(error);
  }

  private disposeChart(): void {
    const instance = this.chartInstance();
    this.removeChartListeners?.();
    this.removeChartListeners = undefined;
    if (instance && !instance.disposed) {
      instance.dispose();
      if (!this.destroying) {
        this.chartDispose.emit();
      }
    }
    this.chartInstance.set(null);
    this.chartContainer = undefined;
    this.createdWithOptions = undefined;
  }
}
