import { provideChartGpuContext } from '../src/lib/gpu-context.provider';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i
    }
  }
};

export const decorators = [
  (story: unknown) => ({
    providers: [provideChartGpuContext()],
    template: '<ng-container *ngComponentOutlet="story"></ng-container>',
    props: { story },
  }),
];
