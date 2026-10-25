import type { Meta, StoryObj } from '@storybook/angular';
import { DataZoomRecipeComponent } from './recipe-demos';

const meta: Meta<DataZoomRecipeComponent> = {
  title: 'ChartGPU/Recipes/DataZoom Basics',
  component: DataZoomRecipeComponent,
  parameters: {
    docs: {
      description: {
        component: 'Enable inside and slider dataZoom controls, then observe the zoom range through the zoomChange output. Ranges use percent-space from 0 to 100.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DataZoomRecipeComponent>;

export const ZoomAndReadRange: Story = {};
