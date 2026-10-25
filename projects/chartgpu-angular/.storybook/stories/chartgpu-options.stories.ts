import type { StoryObj } from '@storybook/angular';
import type { ChartGPUOptions } from 'chartgpu';
import { createOptionsMeta } from './shared';

const options: ChartGPUOptions = {
  series: [
    {
      type: 'line',
      name: 'Observed',
      data: { x: [0, 1, 2, 3, 4], y: [8, 12, 10, 16, 14] },
      color: '#4f46e5',
      lineStyle: { width: 3 }
    },
    {
      type: 'bar',
      name: 'Events',
      data: { x: [0, 1, 2, 3, 4], y: [3, 5, 4, 7, 6] },
      color: '#f59e0b'
    }
  ],
  xAxis: { type: 'value', name: 'Time' },
  yAxis: { type: 'value', name: 'Value' },
  grid: { left: 56, right: 24, top: 24, bottom: 48 },
  gridLines: { show: true, opacity: 0.5 },
  theme: 'light',
  renderMode: 'auto',
  antialias: true,
  devicePixelRatio: 1
};

export default {
  title: 'ChartGPU/API Options/ChartGPUOptions',
  ...createOptionsMeta(
    'ChartGPUOptions',
    'Top-level chart configuration, including series, axes, layout, theme, rendering, and device settings. Edit the options object in Controls to try any supported ChartGPUOptions property. antialias and devicePixelRatio are create-time settings and require chart recreation to take effect.'
  )
};

type Story = StoryObj;

export const ChartConfiguration: Story = {
  args: { options }
};
