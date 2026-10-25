import { Component, DestroyRef, inject, viewChild } from '@angular/core';
import { ChartgpuAngularComponent } from '../../../projects/chartgpu-angular/src/lib/chartgpu-angular.component';
import type { ChartgpuOptions } from '../../../projects/chartgpu-angular/src/lib/chartgpu-angular.types';

const options: ChartgpuOptions = {
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  dataZoom: [
    { type: 'inside' },
    { type: 'slider' },
  ],
  autoScroll: true,
  series: [{ type: 'line', data: [] }],
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChartgpuAngularComponent],
  template: `
    <main class="demo">
      <h1>ChartGPU-Angular - Standalone</h1>
      <p>Angular 20 demo: real-time streaming line chart</p>

      <lib-chartgpu-angular
        [options]="options"
        [style]="chartStyle"
        theme="dark"
        (chartReady)="startStreaming()"
      />
    </main>
  `,
  styles: [`
    .demo {
      max-width: 720px;
      margin: 3rem auto;
      padding: 0 1rem;
      font-family: Arial, sans-serif;
      text-align: center;
    }
  `]
})
export class AppComponent {
  readonly options = options;
  readonly chartStyle = { width: '100%', height: '360px' };

  private readonly chartComponent = viewChild(ChartgpuAngularComponent);
  private readonly destroyRef = inject(DestroyRef);
  private timer: ReturnType<typeof setInterval> | undefined;
  private x = 0;

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
