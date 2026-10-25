import type { StoryObj } from '@storybook/angular';
import type { ChartGPUOptions } from 'chartgpu';
import { createOptionsMeta } from '../shared';

const options: ChartGPUOptions = {
  series: [
    { type: 'line', name: 'Alpha', data: { x: [0, 1, 2, 3], y: [4, 7, 5, 9] } },
    { type: 'bar', name: 'Beta', data: { x: [0, 1, 2, 3], y: [3, 5, 8, 6] } }
  ],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  theme: 'dark',
  palette: ['#38bdf8', '#a78bfa', '#34d399', '#fbbf24']
};

export default {
  title: 'ChartGPU/API Options/Theme/ThemeAndPalette',
  ...createOptionsMeta(
    'Theme/ThemeAndPalette',
    'ChartGPUOptions theme and palette settings. Switch between built-in light/dark themes or edit the custom palette colors.'
  )
};

type Story = StoryObj;

export const ThemeAndPalette: Story = {
  args: { options }
};
