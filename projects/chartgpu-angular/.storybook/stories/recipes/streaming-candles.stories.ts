import type { Meta, StoryObj } from '@storybook/angular';
import { StreamingCandlesRecipeComponent } from './recipe-demos';

const meta: Meta<StreamingCandlesRecipeComponent> = {
  title: 'ChartGPU/Recipes/Streaming/Candlesticks',
  component: StreamingCandlesRecipeComponent,
  parameters: {
    docs: {
      description: {
        component: 'Append OHLC values to a candlestick chart, with the streaming interval cleaned up when the story is destroyed.',
      },
    },
  },
};

export default meta;

export const Candlesticks: StoryObj<StreamingCandlesRecipeComponent> = {};
