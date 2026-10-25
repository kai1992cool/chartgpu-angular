import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartGpuAngularComponent, provideChartGpuContext } from 'chartgpu-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ChartGpuAngularComponent],
  providers: [provideChartGpuContext()],
  bootstrap: [AppComponent],
})
export class AppModule {}
