import type { StoryObj } from '@storybook/angular';
import type { ChartGPUOptions } from 'chartgpu';
import { createOptionsMeta } from '../shared';

const options: ChartGPUOptions = {
  series: [{
    type: 'bar',
    name: 'Sales',
    data: { x: [0, 1, 2, 3], y: [8, 13, 10, 17] },
    color: '#7c3aed'
  }],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  animation: { duration: 500, easing: 'cubicOut', delay: 0 }
};

export default {
  title: 'ChartGPU/API Options/Animation/AnimationConfig',
  ...createOptionsMeta(
    'Animation/AnimationConfig',
    'AnimationConfig demonstrates duration, easing, and delay. Set animation to false in Controls to disable transitions.'
  )
};

type Story = StoryObj;

export const AnimationOptions: Story = {
  args: { options }
};
