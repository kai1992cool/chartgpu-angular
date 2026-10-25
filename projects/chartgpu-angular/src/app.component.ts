import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { StorybookShared } from './storybook-shared';
import { marked } from 'marked';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  styles: [`
    .asdfasdf span:nth-child(1), .asdfasdf span:nth-child(2) {
      height: 28px !important; 
    }
  `],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <span class="navbar-brand" routerLink="/">chartgpu-angular</span>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/"
                routerLinkActive="text-info-emphasis"
                [routerLinkActiveOptions]="{ exact: true }"
                ariaCurrentWhenActive="page"
                >About</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/demos"
                routerLinkActive="text-info-emphasis"
                [routerLinkActiveOptions]="{ exact: true }"
                ariaCurrentWhenActive="page"
                >Demos</a
              >
            </li>
          </ul>

          <span class="d-flex gap-3 align-items-center asdfasdf">
            <a
              class="github-button"
              href="https://github.com/kai1992cool/chartgpu-angular"
              data-color-scheme="no-preference: light; light: light; dark: dark;"
              data-size="large"
              data-show-count="true"
              aria-label="Star kai1992cool/chartgpu-angular on GitHub"
              >Star</a
            >
            <a
              class="github-button"
              href="https://github.com/kai1992cool/chartgpu-angular/issues"
              data-color-scheme="no-preference: light; light: light; dark: dark;"
              data-size="large"
              data-show-count="true"
              aria-label="Issue kai1992cool/chartgpu-angular on GitHub"
              >Issue</a
            >
            <a
              class="nav-link d-flex gap-2 align-items-center text-info-emphasis"
              href="https://github.com/kai1992cool/chartgpu-angular"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View chartgpu-angular on GitHub"
            >
              <i class="fa-brands fa-github"></i>
              <span class="hidden sm:inline">GitHub</span>
            </a>
            <a
              class="nav-link d-flex gap-2 align-items-center text-info-emphasis"
              href="https://www.npmjs.com/package/chartgpu-angular"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View chartgpu-angular on npm"
            >
              <i class="fa-brands fa-npm"></i>
              <span class="sr-only sm:not-sr-only">npm</span>
            </a>
            <span style="margin-right: 0.5rem;" class="text-muted"
              >Version:</span
            >
            <select
              id="version-select"
              class="form-select"
              [ngModel]="selectedVersion()"
              (ngModelChange)="onVersionChange($any($event))"
            >
              @for (version of availableVersions(); track $index) {
              <option class="bg-slate-900" [value]="version">
                {{ version }}
              </option>
              }
            </select>
          </span>
        </div>
      </div>
    </nav>
    <main>
      <div
        class="container-fluid my-5 pt-3"
        style="margin-bottom: 0px !important;padding-bottom: 0px !important;"
      >
        <router-outlet></router-outlet>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends StorybookShared {
  private readonly document: Document = inject(DOCUMENT);
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);

  constructor() {
    super();
    const version = this.resolveVersion(
      this.route.snapshot.queryParamMap.get('version') ??
        this.route.snapshot.data['version'] ??
        this.selectedVersion()
    );
    this.selectedVersion.set(version);
    this.storybookUrl.set(this.createStorybookUrl(version));
  }

  ngOnInit(): void {
    void this.loadAvailableVersions();
  }

  onVersionChange(version: string): void {
    const selectedVersion = this.resolveVersion(version);
    this.selectedVersion.set(selectedVersion);
    this.storybookUrl.set(this.createStorybookUrl(selectedVersion));
    this.loadAbout(selectedVersion);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { version: selectedVersion },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private resolveVersion(version: string | null): string {
    if (version && this.angularVersions.includes(version)) {
      return version;
    }

    return this.selectedVersion() || '19';
  }

  private createStorybookUrl(version: string): SafeResourceUrl {
    const url = new URL(
      `/chartgpu-angular/v${version}/`,
      this.document.location.href
    );
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.toString());
  }

  private async loadAvailableVersions(): Promise<void> {
    let couldNotCheckVersion = false;
    const checks = await Promise.all(
      this.angularVersions.map(async (version) => {
        try {
          const url = new URL(
            `../chartgpu-angular/v${version}/index.html`,
            this.document.location.href
          );
          const response = await fetch(url, {
            method: 'HEAD',
            cache: 'no-store',
          });
          return { version, published: response.ok };
        } catch (error) {
          console.error(
            `Could not check Angular ${version} Storybook availability.`,
            error
          );
          couldNotCheckVersion = true;
          return { version, published: null };
        }
      })
    );

    this.availableVersions.set(
      checks
        .filter((check) => check.published !== false)
        .map((check) => check.version)
    );

    const newestPublished = [...checks]
      .reverse()
      .find((check) => check.published === true);
    if (newestPublished) {
      const requestedVersion = this.resolveVersion(
        this.route.snapshot.queryParamMap.get('version') ??
          this.route.snapshot.data['version'] ??
          newestPublished.version
      );
      this.selectedVersion.set(requestedVersion);
      this.storybookUrl.set(this.createStorybookUrl(requestedVersion));
      this.loadAbout(requestedVersion);
      return;
    }

    this.statusMessage.set(
      couldNotCheckVersion
        ? 'Could not check all published Storybook versions. You can still choose a version above.'
        : 'No Angular Storybook versions have been deployed yet.'
    );
  }

  async loadAbout(version: string) {
    this.isAboutLoading.set(true);
    try {
      // route the README one folder before the current location, since the README is in the root of the project
      const readmeUrl = new URL(
        `../chartgpu-angular/v${version}/README.md`,
        (this.document as any).location.href
      );
      const response = await fetch(readmeUrl);
      if (!response.ok) {
        throw new Error(
          `README.md request failed with status ${response.status}.`
        );
      }

      this.aboutReadmeHtml.set(await marked.parse(await response.text()));
    } catch (error) {
      console.error('Failed to load README.md.', error);
      this.aboutLoadError.set(
        'README.md could not be loaded. Please use the GitHub link to view the project documentation.'
      );
    } finally {
      this.isAboutLoading.set(false);
    }
  }
}
