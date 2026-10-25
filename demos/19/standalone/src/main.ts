import { bootstrapApplication } from '@angular/platform-browser';
import { provideChartGpuContext } from 'chartgpu-angular';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [provideChartGpuContext()],
}).catch((error: unknown) => console.error(error));
