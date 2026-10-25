import { bootstrapApplication } from '@angular/platform-browser';
import { provideChartGpuContext } from 'chartgpu-angular';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [provideChartGpuContext(), provideZonelessChangeDetection()],
}).catch((error: unknown) => console.error(error));
