# chartgpu-angular

An Angular wrapper for ChartGPU, a chart rendering runtime for building responsive, interactive charts in Angular templates.

This is an unofficial wrapper library. It is not affiliated with, endorsed by, or sponsored by ChartGPU or any other upstream vendor unless explicitly stated otherwise.

[![npm version](https://img.shields.io/npm/v/chartgpu-angular.svg)](https://www.npmjs.com/package/chartgpu-angular)
[![npm downloads](https://img.shields.io/npm/dy/chartgpu-angular.svg)](https://www.npmjs.com/package/chartgpu-angular)
[![GitHub stars](https://img.shields.io/github/stars/kai1992cool/chartgpu-angular.svg)](https://github.com/kai1992cool/chartgpu-angular)
[![license](https://img.shields.io/npm/l/chartgpu-angular.svg)](https://github.com/kai1992cool/chartgpu-angular/blob/master/LICENSE)

## Features

- Uses ChartGPU rendering through Angular components and directives.
- Configure charts with standard options and theme updates.
- Define chart content with Angular templates.
- Bind chart events as Angular outputs.
- Use shared GPU context handling for dashboards and multiple charts.

## Installation

### 1. Install the package

```bash
npm install chartgpu-angular
```

## Key Implementation Notes:

* **This project is an unofficial wrapper library.**
* **WebGPU is required for rendering.**
* **The shared GPU context service is intended for dashboard-style reuse.**

## Angular version examples & Documentation

StackBlitz examples will be added as each Angular version's rollout is published.

| Angular version | Standalone example | NgModule example | Documentation |
| --------------- | ------------------ | ---------------- | ------------- |
| Angular 14 | [Modular Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/14/modular) | [Standalone Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/14/standalone) | [Storybook](https://kai1992cool.github.io/chartgpu-angular/demos?version=14) |
| Angular 15 | [Modular Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/15/modular) | [Standalone Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/15/standalone) | [Storybook](https://kai1992cool.github.io/chartgpu-angular/demos?version=15) |
| Angular 16 | [Modular Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/16/modular) | [Standalone Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/16/standalone) | [Storybook](https://kai1992cool.github.io/chartgpu-angular/demos?version=16) |
| Angular 17 | [Modular Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/17/modular) | [Standalone Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/17/standalone) | [Storybook](https://kai1992cool.github.io/chartgpu-angular/demos?version=17) |
| Angular 18 | [Modular Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/18/modular) | [Standalone Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/18/standalone) | [Storybook](https://kai1992cool.github.io/chartgpu-angular/demos?version=18) |
| Angular 19 | [Modular Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/19/modular) | [Standalone Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/19/standalone) | [Storybook](https://kai1992cool.github.io/chartgpu-angular/demos?version=19) |
| Angular 20 | [Modular Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/20/modular) | [Standalone Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/20/standalone) | [Storybook](https://kai1992cool.github.io/chartgpu-angular/demos?version=20) |
| Angular 21 | [Modular Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/21/modular) | [Standalone Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/21/standalone) | [Storybook](https://kai1992cool.github.io/chartgpu-angular/demos?version=21) |
| Angular 22 | [Modular Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/22/modular) | [Standalone Demo](https://stackblitz.com/github/kai1992cool/chartgpu-angular/tree/main/demos/22/standalone) | [Storybook](https://kai1992cool.github.io/chartgpu-angular/demos?version=22) |

Example usage:

```ts
import { Component } from '@angular/core';
import { ChartGPUComponent } from 'chartgpu-angular';

@Component({
  standalone: true,
  imports: [ChartGPUComponent],
  template: `<lib-chartgpu-angular />`,
})
export class ExampleComponent {}
```

## Configuring Styling

### 1. Simplest way

The default setup should include the required chart styles for the component, so no separate CSS setup is usually needed.

### 2. Configure chart CSS (when needed)
If you need additional styles for chart modules or custom visual effects, serve the CSS files as assets in your application configuration.

Then pass the asset URL in the appropriate style injection option used by the component.

## Setup

Choose the setup that matches your Angular application.

### Standalone application

Import `ChartGPUComponent` from `chartgpu-angular` and add it to the `imports` array of each standalone component that uses it:

```ts
import { Component } from '@angular/core';
import { ChartGPUComponent } from 'chartgpu-angular';

@Component({
  standalone: true,
  imports: [ChartGPUComponent],
  template: `<lib-chartgpu-angular />`,
})
export class ExampleComponent {}
```

### NgModule application

Import `ChartGPUComponent` in the `imports` array of the module that declares the component using it:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChartGPUComponent } from 'chartgpu-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ChartGPUComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Documentation and demos

- [ChartGPU documentation](https://chartgpu.io/docs/)

## License

MIT
