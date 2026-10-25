# chartgpu-angular

Angular workspace for the chartgpu-angular library.

## Repository layout

- `projects/chartgpu-angular` keeps the library isolated from the workspace root
- `scripts` holds versioned build and Storybook automation
- `.github/workflows` is reserved for CI/CD pipelines
- `angular-versions.json` tracks supported Angular and Storybook combinations

## Goals

- clear separation between workspace, library, automation, and release files
- multi version support for Angular and Storybook
- automation ready scripts for local and CI use
- CI/CD ready workflows for build, test, and documentation publishing

## Chart components and shared GPU features

Import `ChartGPUComponent` into a standalone component to render charts. It
supports ChartGPU options and theme updates, shared GPU contexts, chart event
outputs, resize observation, and an imperative API available through `ViewChild`.
ChartGPU requires WebGPU; browsers without WebGPU display an error in the
component instead of leaving an empty chart.

```ts
import { Component, viewChild } from '@angular/core';
import { ChartGPUComponent, type ChartgpuOptions } from 'chartgpu-angular';

@Component({
  standalone: true,
  imports: [ChartGPUComponent],
  template: `
    <lib-chartgpu-angular
      [options]="options"
      theme="dark"
      (chartReady)="onReady($event)"
      (chartClick)="onClick($event)"
    />
  `,
})
export class DashboardComponent {
  readonly chart = viewChild(ChartGPUComponent);
  readonly options: ChartgpuOptions = {
    series: [{ type: 'line', data: [{ x: 0, y: 0 }, { x: 1, y: 1 }] }],
  };

  onReady(): void {}
  onClick(): void {}
}
```

For dashboards, inject `ChartgpuGPUContextService` and call `initialize()` once.
Its `context()` signal provides the shared adapter, device, and pipeline cache;
pass that value to each chart's `gpuContext` input. The service intentionally
retains the device for the application lifetime.

Import `ChartgpuConnectChartsDirective` and use it to synchronize chart interactions:

```html
<div
  [libChartgpuConnectCharts]="[firstChart.getChart(), secondChart.getChart()]"
  [syncOptions]="{ syncCrosshair: true, syncZoom: true }"
></div>
```
