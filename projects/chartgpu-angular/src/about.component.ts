import { ChangeDetectionStrategy, Component } from "@angular/core";
import { StorybookShared } from "./storybook-shared";

@Component({
  selector: "app-about",
  standalone: true,
  template: `
    <section class="container px-0">
      @if (isAboutLoading()) {
        <p class="px-5 py-8 text-slate-400 sm:px-8 text-info" role="status">
          Loading README.md...
        </p>
      } @else {
        @if (aboutLoadError()) {
          @if (aboutLoadError(); as error) {
            <p
              class="px-5 py-8 text-rose-300 sm:px-8 text-warning"
              role="alert"
            >
              {{ error }}
            </p>
          }
        } @else {
          @if (aboutReadmeHtml(); as html) {
            <article
              class="readme-content px-5 py-6 sm:px-8"
              [innerHTML]="html"
            ></article>
          }
        }
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent extends StorybookShared {}
