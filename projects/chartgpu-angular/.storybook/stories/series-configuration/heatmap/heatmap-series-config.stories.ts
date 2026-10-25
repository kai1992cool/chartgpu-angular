import type { ChartGPUOptions, HeatmapSeriesConfig } from 'chartgpu';
import type { StoryObj } from '@storybook/angular';
import { createOptionsMeta } from '../../shared';

const series: HeatmapSeriesConfig = {
  type: 'heatmap',
  name: 'Intensity',
  data: {
    xStart: 0,
    xStep: 1,
    yStart: 0,
    yStep: 1,
    columns: 5,
    rows: 4,
    z: [1, 2, 3, 4, 5, 2, 4, 7, 5, 3, 3, 6, 9, 6, 4, 1, 3, 5, 4, 2]
  },
  colormap: 'viridis',
  zScale: 'linear',
  opacity: 0.9,
  cellGapPx: 1
};

const options: ChartGPUOptions = {
  series: [series],
  xAxis: { type: 'value', name: 'Column' },
  yAxis: { type: 'value', name: 'Row' },
  tooltip: { show: true, trigger: 'item' }
};

export default {
  title: 'ChartGPU/API Options/Series Configuration/HeatmapSeriesConfig',
  ...createOptionsMeta(
    'Series Configuration/HeatmapSeriesConfig',
    'HeatmapSeriesConfig renders a uniform data-space grid. Edit its grid dimensions, z values, colormap, z scale, opacity, and cell spacing.'
  )
};

type Story = StoryObj;

export const HeatmapSeries: Story = { args: { options } };
