import { makeEnvironmentProviders } from '@angular/core';
import { ChartgpuGPUContextService } from './gpu-context.service';

export function provideChartGpuContext() {
  return makeEnvironmentProviders([ChartgpuGPUContextService]);
}