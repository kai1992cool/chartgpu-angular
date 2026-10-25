import { bootstrapApplication } from '@angular/platform-browser';
import { provideChartGpuContext } from 'chartgpu-angular';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [provideChartGpuContext(), provideExperimentalZonelessChangeDetection()],
}).catch((error: unknown) => console.error(error));
