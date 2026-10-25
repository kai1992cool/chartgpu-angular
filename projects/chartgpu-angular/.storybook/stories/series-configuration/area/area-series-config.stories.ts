import type { StoryObj } from '@storybook/angular';
import type { AreaSeriesConfig, ChartGPUOptions } from 'chartgpu';
import { createOptionsMeta } from '../../shared';

const series: AreaSeriesConfig = {
  type: 'area',
  name: 'Filled range',
  data: { x: [0, 1, 2, 3, 4], y: [5, 8, 6, 11, 9] },
  color: '#0ea5e9',
  baseline: 0,
  areaStyle: { opacity: 0.35 },
  connectNulls: false,
  step: 'after'
};

const options: ChartGPUOptions = {
  series: [series],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  legend: { show: true }
};

export default {
  title: 'ChartGPU/API Options/Series Configuration/AreaSeriesConfig',
  ...createOptionsMeta(
    'Series Configuration/AreaSeriesConfig',
    'AreaSeriesConfig demonstrates the baseline, areaStyle, connectNulls, and step properties along with inherited series configuration.'
  )
};

type Story = StoryObj;

export const AreaSeries: Story = { args: { options } };
