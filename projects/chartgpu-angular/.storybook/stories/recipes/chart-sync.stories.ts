import type { Meta, StoryObj } from '@storybook/angular';
import { ChartSyncRecipeComponent } from './recipe-demos';

const meta: Meta<ChartSyncRecipeComponent> = {
  title: 'ChartGPU/Recipes/Chart Sync',
  component: ChartSyncRecipeComponent,
  parameters: {
    docs: {
      description: {
        component: 'Connect initialized chart instances to synchronize crosshair interaction and zoom. The Angular wrapper includes ChartgpuConnectChartsDirective to manage the connection lifecycle.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ChartSyncRecipeComponent>;

export const SyncedCrosshairAndZoom: Story = {};
