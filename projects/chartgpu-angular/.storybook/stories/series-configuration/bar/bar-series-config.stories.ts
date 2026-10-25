import type { StoryObj } from '@storybook/angular';
import type { BarSeriesConfig, ChartGPUOptions } from 'chartgpu';
import { createOptionsMeta } from '../../shared';

const series: BarSeriesConfig = {
  type: 'bar',
  name: 'Quarterly totals',
  data: { x: [0, 1, 2, 3], y: [12, 18, 15, 24] },
  color: '#f59e0b',
  barWidth: '60%',
  barGap: 0.15,
  barCategoryGap: 0.2,
  itemStyle: { borderRadius: 4, borderWidth: 1, borderColor: '#b45309' }
};

const options: ChartGPUOptions = {
  series: [series],
  xAxis: { type: 'category', name: 'Quarter' },
  yAxis: { type: 'value', name: 'Total' }
};

export default {
  title: 'ChartGPU/API Options/Series Configuration/BarSeriesConfig',
  ...createOptionsMeta(
    'Series Configuration/BarSeriesConfig',
    'BarSeriesConfig shows bar width, spacing, stacking, and item style options, plus inherited series fields.'
  )
};

type Story = StoryObj;

export const BarSeries: Story = { args: { options } };
