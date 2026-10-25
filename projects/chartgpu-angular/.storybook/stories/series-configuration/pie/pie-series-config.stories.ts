import type { StoryObj } from '@storybook/angular';
import type { ChartGPUOptions, PieSeriesConfig } from 'chartgpu';
import { createOptionsMeta } from '../../shared';

const series: PieSeriesConfig = {
  type: 'pie',
  name: 'Traffic sources',
  data: [
    { name: 'Direct', value: 42, color: '#2563eb' },
    { name: 'Search', value: 31, color: '#16a34a' },
    { name: 'Referral', value: 18, color: '#f59e0b' },
    { name: 'Other', value: 9, color: '#db2777' }
  ],
  radius: ['35%', '72%'],
  center: ['50%', '50%'],
  startAngle: 90
};

const options: ChartGPUOptions = {
  series: [series],
  legend: { show: true, position: 'bottom' },
  tooltip: { show: true, trigger: 'item' }
};

export default {
  title: 'ChartGPU/API Options/Series Configuration/PieSeriesConfig',
  ...createOptionsMeta(
    'Series Configuration/PieSeriesConfig',
    'PieSeriesConfig demonstrates slice data, radius, center, start angle, and item styling. Edit both the series and chart-level options.'
  )
};

type Story = StoryObj;

export const PieSeries: Story = { args: { options } };
