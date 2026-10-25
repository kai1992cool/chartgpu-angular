import type { StoryObj } from '@storybook/angular';
import type { ChartGPUOptions, ScatterSeriesConfig } from 'chartgpu';
import { createOptionsMeta } from '../../shared';

const scatterSeries: ScatterSeriesConfig = {
  type: 'scatter',
  name: 'Scatter observations',
  data: {
    x: [0.4, 1.1, 1.8, 2.2, 2.9, 3.3, 4.1, 4.7],
    y: [2.2, 4.1, 3.2, 5.3, 4.7, 7.1, 6.2, 8.4],
    size: [8, 12, 10, 16, 14, 20, 17, 24]
  },
  color: '#db2777',
  visible: true,
  sampling: 'none',
  samplingThreshold: 5000,
  mode: 'points',
  symbol: 'circle',
  symbolSize: 14
};

const options: ChartGPUOptions = {
  series: [scatterSeries],
  xAxis: { type: 'value', name: 'X', min: 0, max: 5 },
  yAxis: { type: 'value', name: 'Y', min: 0, max: 10 },
  grid: { left: 56, right: 24, top: 24, bottom: 48 },
  gridLines: { show: true },
  dataZoom: [{ type: 'inside', start: 0, end: 100 }],
  tooltip: { show: true, trigger: 'item' },
  legend: { show: true, position: 'bottom' },
  animation: { duration: 350 }
};

export default {
  title: 'ChartGPU/API Options/Series Configuration/ScatterSeriesConfig',
  ...createOptionsMeta(
    'Series Configuration/ScatterSeriesConfig',
    'An editable scatter chart demonstrating ScatterSeriesConfig together with inherited SeriesConfigBase fields. Change chart-level options such as axes, grid, zoom, tooltip, legend, and animation, and series-level fields such as name, color, visible, sampling, mode, symbol, and symbolSize in the options control. Scatter density mode can be selected by changing series[0].mode.'
  )
};

type Story = StoryObj;

export const ScatterSeries: Story = {
  args: { options }
};
