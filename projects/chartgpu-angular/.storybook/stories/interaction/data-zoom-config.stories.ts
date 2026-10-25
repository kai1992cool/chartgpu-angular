import type { StoryObj } from '@storybook/angular';
import type { ChartGPUOptions } from 'chartgpu';
import { createOptionsMeta } from '../shared';

const options: ChartGPUOptions = {
  series: [{
    type: 'line',
    name: 'Signal',
    data: {
      x: Array.from({ length: 24 }, (_, index) => index),
      y: [8, 10, 9, 12, 15, 11, 14, 17, 13, 16, 20, 18, 15, 19, 22, 18, 21, 24, 20, 23, 26, 22, 25, 28]
    }
  }],
  xAxis: { type: 'value', name: 'Sample' },
  yAxis: { type: 'value', name: 'Amplitude' },
  dataZoom: [{ type: 'inside', start: 20, end: 80 }],
  tooltip: { show: true, trigger: 'axis' }
};

export default {
  title: 'ChartGPU/API Options/Interaction/DataZoomConfig',
  ...createOptionsMeta(
    'Interaction/DataZoomConfig',
    'DataZoomConfig enables an interactive inside zoom. Edit the dataZoom array to change the visible range or configure a slider. Tooltip behavior is also exposed as a chart-level option.'
  )
};

type Story = StoryObj;

export const ZoomAndTooltip: Story = {
  args: { options }
};
