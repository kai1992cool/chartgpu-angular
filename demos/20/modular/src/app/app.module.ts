import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartGpuAngularComponent, provideChartGpuContext } from 'chartgpu-angular';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ChartGpuAngularComponent],
  providers: [provideChartGpuContext(), provideZonelessChangeDetection()],
  bootstrap: [AppComponent],
})
export class AppModule {}
