import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartgpuAngularComponent } from '../../../../../projects/chartgpu-angular/src/lib/chartgpu-angular.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ChartgpuAngularComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
