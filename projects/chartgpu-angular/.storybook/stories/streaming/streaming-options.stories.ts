import type { StoryObj } from '@storybook/angular';
import type { ChartGPUOptions } from 'chartgpu';
import { createOptionsMeta } from '../shared';

const options: ChartGPUOptions = {
  series: [{
    type: 'line',
    name: 'Live values',
    data: { x: [0, 1, 2, 3, 4, 5], y: [4, 7, 6, 9, 8, 11] },
    color: '#0891b2'
  }],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  dataZoom: [{ type: 'inside', start: 25, end: 100 }],
  autoScroll: true
};

export default {
  title: 'ChartGPU/API Options/Streaming/AutoScroll',
  ...createOptionsMeta(
    'Streaming/AutoScroll',
    'autoScroll keeps the visible x range anchored to the newest data when streaming updates are appended. This static story focuses on its ChartGPUOptions configuration.'
  )
};

type Story = StoryObj;

export const AutoScroll: Story = {
  args: { options }
};
