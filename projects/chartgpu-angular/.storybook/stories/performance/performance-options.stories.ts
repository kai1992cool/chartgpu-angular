import type { StoryObj } from '@storybook/angular';
import type { ChartGPUOptions } from 'chartgpu';
import { createOptionsMeta } from '../shared';

const options: ChartGPUOptions = {
  series: [{
    type: 'line',
    name: 'Sampled signal',
    data: {
      x: Array.from({ length: 80 }, (_, index) => index),
      y: Array.from({ length: 80 }, (_, index) => 20 + Math.sin(index / 4) * 12 + Math.cos(index / 2) * 3)
    },
    sampling: 'lttb',
    samplingThreshold: 40,
    lineStyle: { width: 2 }
  }],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  performance: { lod: 'auto' }
};

export default {
  title: 'ChartGPU/API Options/Performance/PerformanceConfig',
  ...createOptionsMeta(
    'Performance/PerformanceConfig',
    'Per-series sampling and the chart performance LOD policy. Adjust sampling, samplingThreshold, or performance.lod in Controls to compare automatic and strict rendering fidelity.'
  )
};

type Story = StoryObj;

export const SamplingAndLod: Story = {
  args: { options }
};
