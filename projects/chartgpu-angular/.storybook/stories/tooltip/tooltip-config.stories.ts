import type { StoryObj } from '@storybook/angular';
import type { ChartGPUOptions } from 'chartgpu';
import { createOptionsMeta } from '../shared';

const options: ChartGPUOptions = {
  series: [
    { type: 'line', name: 'Actual', data: { x: [0, 1, 2, 3], y: [8, 12, 10, 15] } },
    { type: 'line', name: 'Target', data: { x: [0, 1, 2, 3], y: [7, 9, 11, 13] }, color: '#f97316' }
  ],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  tooltip: { show: true, trigger: 'axis' },
  legend: { show: true }
};

export default {
  title: 'ChartGPU/API Options/Tooltip/TooltipConfig',
  ...createOptionsMeta(
    'Tooltip/TooltipConfig',
    'TooltipConfig controls tooltip visibility, trigger mode, and an optional formatter. Set trigger to item or axis in the options control.'
  )
};

type Story = StoryObj;

export const TooltipTriggers: Story = {
  args: { options }
};
