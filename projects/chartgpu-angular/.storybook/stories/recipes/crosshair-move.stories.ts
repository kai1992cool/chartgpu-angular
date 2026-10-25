import type { Meta, StoryObj } from '@storybook/angular';
import { CrosshairRecipeComponent } from './recipe-demos';

const meta: Meta<CrosshairRecipeComponent> = {
  title: 'ChartGPU/Recipes/Crosshair Move',
  component: CrosshairRecipeComponent,
  parameters: {
    docs: {
      description: {
        component: 'Subscribe to crosshairMove and display the current interaction x coordinate in domain units.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<CrosshairRecipeComponent>;

export const ReadInteractionX: Story = {};
