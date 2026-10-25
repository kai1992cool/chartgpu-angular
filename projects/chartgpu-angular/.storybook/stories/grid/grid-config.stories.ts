import type { StoryObj } from '@storybook/angular';
import type { ChartGPUOptions } from 'chartgpu';
import { createOptionsMeta } from '../shared';

const options: ChartGPUOptions = {
  series: [{
    type: 'scatter',
    name: 'Measurements',
    data: { x: [1, 2, 3, 4, 5], y: [3, 7, 4, 8, 5] },
    symbolSize: 12
  }],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  grid: { left: 72, right: 32, top: 28, bottom: 56 },
  gridLines: {
    show: true,
    color: '#94a3b8',
    opacity: 0.45,
    horizontal: { show: true, count: 4 },
    vertical: { show: true, count: 5 }
  }
};

export default {
  title: 'ChartGPU/API Options/Grid/GridConfig',
  ...createOptionsMeta(
    'Grid/GridConfig',
    'GridConfig controls plot padding. GridLinesConfig controls grid visibility, density, color, and opacity. Edit either nested object in Controls.'
  )
};

type Story = StoryObj;

export const GridAndGridLines: Story = {
  args: { options }
};
