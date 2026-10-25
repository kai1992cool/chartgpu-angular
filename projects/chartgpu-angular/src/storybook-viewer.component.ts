import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StorybookShared } from './storybook-shared';

@Component({
  selector: 'app-storybook-viewer',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section>
      @if (statusMessage(); as statusMsg) {
        <p
          class="m-0 rounded-lg border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200"
          role="status"
        >
          {{ statusMsg }}
        </p>
      }

      <iframe
        style="border: none;height: calc(100vh - 75px); width: 100%;"
        sandbox="allow-scripts allow-same-origin"
        referrerpolicy="no-referrer"
        allow="geolocation 'none'; microphone 'none'; camera 'none'"
        [src]="storybookUrl()"
        [title]="'ng-swiper-element Storybook for Angular ' + selectedVersion()"
      ></iframe>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorybookViewerComponent extends StorybookShared {}
