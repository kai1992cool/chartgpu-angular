import { Directive, effect, input, output } from '@angular/core';
import { connectCharts } from 'chartgpu';
import type { ChartGPUInstance, ChartSyncOptions } from 'chartgpu';

@Directive({
  selector: '[libChartgpuConnectCharts]',
  standalone: true,
})
export class ChartgpuConnectChartsDirective {
  readonly charts = input<ReadonlyArray<ChartGPUInstance | null | undefined>>([], {
    alias: 'libChartgpuConnectCharts',
  });
  readonly syncOptions = input<ChartSyncOptions | undefined>();
  readonly connectionError = output<Error>();

  private readonly ids = new WeakMap<object, number>();
  private nextId = 1;
  private signature: string | undefined;

  constructor() {
    effect(onCleanup => {
      const charts = this.charts();
      const options = this.syncOptions();
      const optionsSignature = options
        ? `crosshair=${options.syncCrosshair ?? ''},zoom=${options.syncZoom ?? ''}`
        : '';
      const signature = `${charts.map(chart => {
        if (!chart) {
          return 'null';
        }

        let id = this.ids.get(chart);
        if (id === undefined) {
          id = this.nextId++;
          this.ids.set(chart, id);
        }
        return `${id}:${chart.disposed ? 1 : 0}`;
      }).join('|')}|${optionsSignature}`;

      if (signature === this.signature) {
        return;
      }
      this.signature = signature;

      if (charts.length === 0 || charts.some(chart => !chart || chart.disposed)) {
        return;
      }

      const resolved: ChartGPUInstance[] = [];
      for (const chart of charts) {
        if (!chart || chart.disposed) {
          return;
        }
        resolved.push(chart);
      }

      try {
        const disconnect = connectCharts(resolved, options);
        onCleanup(disconnect);
      } catch (cause: unknown) {
        this.connectionError.emit(cause instanceof Error ? cause : new Error(String(cause)));
      }
    });
  }
}
