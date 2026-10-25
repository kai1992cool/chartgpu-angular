import type { StoryObj } from '@storybook/angular';
import type { ChartGPUOptions } from 'chartgpu';
import { createOptionsMeta } from '../shared';

const options: ChartGPUOptions = {
  series: [{
    type: 'line',
    name: 'Temperature',
    data: { x: [0, 1, 2, 3, 4], y: [18, 21, 19, 25, 23] },
    color: '#0ea5e9'
  }],
  xAxis: { type: 'value', name: 'Hour' },
  yAxis: { type: 'value', name: '°C' },
  annotations: [
    { type: 'lineX', x: 2 },
    { type: 'lineY', y: 22 },
    { type: 'bandX', from: 1, to: 2 },
    { type: 'point', x: 3, y: 25 }
  ]
};

export default {
  title: 'ChartGPU/API Options/Annotations/AnnotationConfig',
  ...createOptionsMeta(
    'Annotations/AnnotationConfig',
    'AnnotationConfig overlays such as lineX, lineY, bandX, and point. Change or add annotation objects in the options control.'
  )
};

type Story = StoryObj;

export const AnnotationTypes: Story = {
  args: { options }
};
