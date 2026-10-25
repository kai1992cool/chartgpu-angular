import type { Meta, StoryObj } from '@storybook/angular';
import { ScatterDensityRecipeComponent } from './recipe-demos';

const meta: Meta<ScatterDensityRecipeComponent> = {
  title: 'ChartGPU/Recipes/Scatter Density',
  component: ScatterDensityRecipeComponent,
  parameters: {
    docs: {
      description: {
        component: 'Render 250,000 stable scatter points as a binned density heatmap. Keeping the data and options references stable avoids re-uploading the full dataset.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ScatterDensityRecipeComponent>;

export const BinnedHeatmap: Story = {};
