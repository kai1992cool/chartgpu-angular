import type { ChartGPUOptions, ImpulseSeriesConfig } from 'chartgpu';
import type { StoryObj } from '@storybook/angular';
import { createOptionsMeta } from '../../shared';

const series: ImpulseSeriesConfig = {
  type: 'impulse',
  name: 'Events',
  data: { x: [0, 1, 2, 3, 4], y: [4, 8, 6, 11, 9] },
  color: '#ea580c',
  baseline: 0,
  showMarker: true,
  symbolSize: 8,
  lineStyle: { width: 2 }
};

const options: ChartGPUOptions = {
  series: [series],
  xAxis: { type: 'value', name: 'Time' },
  yAxis: { type: 'value', name: 'Magnitude' }
};

export default {
  title: 'ChartGPU/API Options/Series Configuration/ImpulseSeriesConfig',
  ...createOptionsMeta(
    'Series Configuration/ImpulseSeriesConfig',
    'ImpulseSeriesConfig demonstrates event stems, baseline, marker visibility, symbol size, and line style.'
  )
};

type Story = StoryObj;

export const ImpulseSeries: Story = { args: { options } };
