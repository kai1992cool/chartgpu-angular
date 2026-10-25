import type { StoryObj } from '@storybook/angular';
import type { ChartGPUOptions } from 'chartgpu';
import { createOptionsMeta } from '../shared';

const options: ChartGPUOptions = {
  series: [{
    type: 'line',
    name: 'Requests',
    data: { x: [1, 2, 3, 4, 5], y: [12, 18, 15, 24, 20] }
  }],
  xAxis: { type: 'value', name: 'Minute', min: 0, max: 6, tickCount: 6 },
  yAxis: { type: 'value', name: 'Requests / sec', min: 0, max: 30, autoRange: 'continuous' },
  axes: {
    y: [{ id: 'secondary', type: 'value', position: 'right', name: 'Secondary scale' }]
  }
};

export default {
  title: 'ChartGPU/API Options/Axes/AxisConfig',
  ...createOptionsMeta(
    'Axes/AxisConfig',
    'AxisConfig options for xAxis, yAxis, and additional y axes, including domains, labels, tick counts, and auto-range behavior.'
  )
};

type Story = StoryObj;

export const AxisConfiguration: Story = {
  args: { options }
};
