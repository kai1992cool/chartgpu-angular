import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartGpuAngularComponent } from 'chartgpu-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ChartGpuAngularComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
