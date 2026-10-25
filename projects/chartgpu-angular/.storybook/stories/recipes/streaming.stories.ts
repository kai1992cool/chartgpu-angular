import type { Meta, StoryObj } from '@storybook/angular';
import { StreamingLineRecipeComponent } from './recipe-demos';

const lineMeta: Meta<StreamingLineRecipeComponent> = {
  title: 'ChartGPU/Recipes/Streaming/Line',
  component: StreamingLineRecipeComponent,
  parameters: {
    docs: {
      description: {
        component: 'Append one line data point at a time through the chart handle instead of rebuilding the options array. The timer is cleared when the story is destroyed.',
      },
    },
  },
};

export default lineMeta;
export const Line: StoryObj<StreamingLineRecipeComponent> = {};
