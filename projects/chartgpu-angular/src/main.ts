import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { provideRouter } from "@angular/router";
import { routes } from "./app-routing.module";
import { provideZonelessChangeDetection } from "@angular/core";

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideZonelessChangeDetection()],
});
