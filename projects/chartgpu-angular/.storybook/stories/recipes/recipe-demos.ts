import { Component, DestroyRef, inject, signal, viewChild } from '@angular/core';
import {
  createAnnotationAuthoring,
  type ChartGPUInstance,
  type ChartGPUOptions,
  type ScatterPointTuple,
} from 'chartgpu';
import { ChartGpuAngularComponent } from '../../../src/lib/chartgpu-angular.component';
import { ChartgpuConnectChartsDirective } from '../../../src/lib/connect-charts.directive';

const crosshairOptions: ChartGPUOptions = {
  series: [{
    type: 'line',
    data: [{ x: 0, y: 2 }, { x: 1, y: 3 }, { x: 2, y: 1 }],
  }],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  tooltip: { show: true, trigger: 'axis' },
  dataZoom: [{ type: 'inside' }, { type: 'slider' }],
};

const zoomOptions: ChartGPUOptions = {
  series: [{
    type: 'line',
    data: Array.from({ length: 200 }, (_, x) => ({ x, y: Math.sin(x * 0.05) * 10 })),
  }],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  tooltip: { show: true, trigger: 'axis' },
  dataZoom: [{ type: 'inside' }, { type: 'slider' }],
};

@Component({
  selector: 'storybook-crosshair-recipe',
  standalone: true,
  imports: [ChartGpuAngularComponent],
  template: `
    <p>Crosshair X: {{ x === null ? 'none' : x.toFixed(2) }}</p>
    <lib-chartgpu-angular
      [options]="options"
      [style]="chartStyle"
      theme="dark"
      (crosshairMove)="x = $event.x"
    />
  `,
  styles: [':host { display: block; height: 360px; }'],
})
export class CrosshairRecipeComponent {
  readonly options = crosshairOptions;
  readonly chartStyle = { width: '100%', height: '100%' };
  x: number | null = null;
}

@Component({
  selector: 'storybook-datazoom-recipe',
  standalone: true,
  imports: [ChartGpuAngularComponent],
  template: `
    <p>
      Zoom: {{ zoom ? zoom.start.toFixed(2) + ' → ' + zoom.end.toFixed(2) : 'none' }}
    </p>
    <lib-chartgpu-angular
      [options]="options"
      [style]="chartStyle"
      theme="dark"
      (zoomChange)="zoom = $event.range"
    />
  `,
  styles: [':host { display: block; height: 360px; }'],
})
export class DataZoomRecipeComponent {
  readonly options = zoomOptions;
  readonly chartStyle = { width: '100%', height: '100%' };
  zoom: { start: number; end: number } | null = null;
}

const syncOptionsA: ChartGPUOptions = {
  series: [{ type: 'line', data: [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 4 }] }],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  tooltip: { show: true, trigger: 'axis' },
  dataZoom: [{ type: 'inside' }, { type: 'slider' }],
};

const syncOptionsB: ChartGPUOptions = {
  series: [{ type: 'bar', data: [{ x: 0, y: 3 }, { x: 1, y: 1 }, { x: 2, y: 5 }] }],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  tooltip: { show: true, trigger: 'axis' },
  dataZoom: [{ type: 'inside' }, { type: 'slider' }],
};

@Component({
  selector: 'storybook-chart-sync-recipe',
  standalone: true,
  imports: [ChartGpuAngularComponent, ChartgpuConnectChartsDirective],
  template: `
    <section
      [libChartgpuConnectCharts]="charts()"
      [syncOptions]="syncOptions"
      (connectionError)="connectionError = $event"
    >
      <p>Crosshair and zoom are synchronized between both charts.</p>
      @if (connectionError) {
        <p role="alert">{{ connectionError.message }}</p>
      }
      <lib-chartgpu-angular
        [options]="optionsA"
        [style]="chartStyle"
        theme="dark"
        (chartReady)="setChart(0, $event)"
      />
      <lib-chartgpu-angular
        [options]="optionsB"
        [style]="chartStyle"
        theme="dark"
        (chartReady)="setChart(1, $event)"
      />
    </section>
  `,
  styles: [`
    :host { display: block; }
    section { display: grid; gap: 12px; }
    lib-chartgpu-angular { display: block; height: 220px; }
  `],
})
export class ChartSyncRecipeComponent {
  readonly optionsA = syncOptionsA;
  readonly optionsB = syncOptionsB;
  readonly chartStyle = { width: '100%', height: '220px' };
  readonly syncOptions = { syncZoom: true };
  readonly charts = signal<readonly (ChartGPUInstance | null)[]>([null, null]);
  connectionError: Error | null = null;

  setChart(index: number, instance: ChartGPUInstance): void {
    this.charts.update(charts => charts.map((chart, chartIndex) =>
      chartIndex === index ? instance : chart,
    ));
  }
}

const annotationOptions: ChartGPUOptions = {
  series: [{ type: 'line', data: [{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 2 }] }],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  tooltip: { show: true, trigger: 'axis' },
  dataZoom: [{ type: 'inside' }, { type: 'slider' }],
};

@Component({
  selector: 'storybook-annotation-authoring-recipe',
  standalone: true,
  imports: [ChartGpuAngularComponent],
  template: `
    <p>Right-click the chart to add and edit annotations.</p>
    <lib-chartgpu-angular
      [options]="options"
      [style]="chartStyle"
      theme="dark"
      (chartReady)="startAuthoring($event)"
    />
  `,
  styles: [':host { display: block; height: 420px; }'],
})
export class AnnotationAuthoringRecipeComponent {
  private readonly chartComponent = viewChild(ChartGpuAngularComponent);
  private readonly destroyRef = inject(DestroyRef);
  private authoring: ReturnType<typeof createAnnotationAuthoring> | undefined;

  readonly options = annotationOptions;
  readonly chartStyle = { width: '100%', height: '100%' };

  constructor() {
    this.destroyRef.onDestroy(() => this.disposeAuthoring());
  }

  startAuthoring(instance: ChartGPUInstance): void {
    this.disposeAuthoring();
    const container = this.chartComponent()?.getContainer();
    if (container && !instance.disposed) {
      this.authoring = createAnnotationAuthoring(container, instance, {
        enableContextMenu: true,
        menuZIndex: 1000,
      });
    }
  }

  private disposeAuthoring(): void {
    this.authoring?.dispose();
    this.authoring = undefined;
  }
}

function generateDensityPoints(count: number): ScatterPointTuple[] {
  return Array.from({ length: count }, (_, index) => {
    const x = (index * 0.61803398875) % 100;
    const y = (index * 0.75487766625) % 100;
    return [x, y];
  });
}

function createDensityOptions(): ChartGPUOptions {
  return {
    xAxis: { type: 'value' },
    yAxis: { type: 'value' },
    tooltip: { show: true, trigger: 'axis' },
    series: [{
      type: 'scatter',
      name: 'Density',
      data: generateDensityPoints(250_000),
      mode: 'density',
      binSize: 2,
      densityColormap: 'viridis',
      densityNormalization: 'log',
      sampling: 'none',
    }],
    grid: { left: 60, right: 40, top: 40, bottom: 40 },
  };
}

@Component({
  selector: 'storybook-scatter-density-recipe',
  standalone: true,
  imports: [ChartGpuAngularComponent],
  template: `
    <lib-chartgpu-angular [options]="options" [style]="chartStyle" theme="dark" />
  `,
  styles: [':host { display: block; height: 400px; }'],
})
export class ScatterDensityRecipeComponent {
  readonly options = createDensityOptions();
  readonly chartStyle = { width: '100%', height: '100%' };
}

const streamingLineOptions: ChartGPUOptions = {
  series: [{ type: 'line', data: [] }],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  dataZoom: [{ type: 'inside' }, { type: 'slider' }],
  autoScroll: true,
};

@Component({
  selector: 'storybook-streaming-line-recipe',
  standalone: true,
  imports: [ChartGpuAngularComponent],
  template: `
    <lib-chartgpu-angular
      [options]="options"
      [style]="chartStyle"
      theme="dark"
      (chartReady)="startStreaming()"
    />
  `,
  styles: [':host { display: block; height: 360px; }'],
})
export class StreamingLineRecipeComponent {
  private readonly chartComponent = viewChild(ChartGpuAngularComponent);
  private readonly destroyRef = inject(DestroyRef);
  private timer: ReturnType<typeof setInterval> | undefined;
  private x = 0;

  readonly options = streamingLineOptions;
  readonly chartStyle = { width: '100%', height: '100%' };

  constructor() {
    this.destroyRef.onDestroy(() => this.stopStreaming());
  }

  startStreaming(): void {
    if (this.timer !== undefined) {
      return;
    }
    this.timer = setInterval(() => {
      this.chartComponent()?.appendData(0, [{ x: this.x, y: Math.sin(this.x * 0.05) }]);
      this.x++;
    }, 50);
  }

  private stopStreaming(): void {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}

const streamingCandlesOptions: ChartGPUOptions = {
  xAxis: { type: 'time' },
  yAxis: { type: 'value' },
  tooltip: { show: true, trigger: 'axis' },
  dataZoom: [
    { type: 'inside', start: 80, end: 100 },
    { type: 'slider', start: 80, end: 100 },
  ],
  autoScroll: true,
  series: [{ type: 'candlestick', sampling: 'ohlc', data: [] }],
};

@Component({
  selector: 'storybook-streaming-candles-recipe',
  standalone: true,
  imports: [ChartGpuAngularComponent],
  template: `
    <lib-chartgpu-angular
      [options]="options"
      [style]="chartStyle"
      theme="dark"
      (chartReady)="startStreaming()"
    />
  `,
  styles: [':host { display: block; height: 420px; }'],
})
export class StreamingCandlesRecipeComponent {
  private readonly chartComponent = viewChild(ChartGpuAngularComponent);
  private readonly destroyRef = inject(DestroyRef);
  private timer: ReturnType<typeof setInterval> | undefined;
  private last = 100;

  readonly options = streamingCandlesOptions;
  readonly chartStyle = { width: '100%', height: '100%' };

  constructor() {
    this.destroyRef.onDestroy(() => this.stopStreaming());
  }

  startStreaming(): void {
    if (this.timer !== undefined) {
      return;
    }
    this.timer = setInterval(() => {
      const open = this.last;
      const close = open + (Math.random() - 0.5) * 2;
      const high = Math.max(open, close) + Math.random();
      const low = Math.min(open, close) - Math.random();
      this.last = close;
      this.chartComponent()?.appendData(0, [{
        timestamp: Date.now(),
        open,
        close,
        high,
        low,
      }]);
    }, 500);
  }

  private stopStreaming(): void {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}
