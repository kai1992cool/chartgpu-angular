import type { StoryObj } from '@storybook/angular';
import type { ChartGPUOptions } from 'chartgpu';
import { createOptionsMeta } from '../shared';

const options: ChartGPUOptions = {
  series: [
    {
      type: 'line',
      name: 'Primary series',
      data: { x: [0, 1, 2, 3, 4], y: [7, 10, 9, 13, 12] },
      color: '#4f46e5',
      visible: true,
      sampling: 'none',
      samplingThreshold: 5000
    },
    {
      type: 'scatter',
      name: 'Shared base settings',
      data: { x: [0.5, 1.4, 2.6, 3.7], y: [4, 7, 5, 9] },
      color: '#ec4899',
      visible: true,
      sampling: 'none'
    }
  ],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' }
};

export default {
  title: 'ChartGPU/API Options/Series Configuration/SeriesConfigBase',
  ...createOptionsMeta(
    'Series Configuration/SeriesConfigBase',
    'Shared SeriesConfigBase properties used by Cartesian series: name, yAxis, data, color, visible, sampling, and samplingThreshold. The options control includes all per-series fields.'
  )
};

type Story = StoryObj;

export const SharedSeriesProperties: Story = {
  args: { options }
};
