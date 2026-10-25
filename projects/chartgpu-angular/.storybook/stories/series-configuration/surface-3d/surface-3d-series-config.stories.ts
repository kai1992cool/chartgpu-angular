import type { ChartGPUOptions, Surface3DSeriesConfig } from 'chartgpu';
import type { StoryObj } from '@storybook/angular';
import { createOptionsMeta } from '../../shared';

const series: Surface3DSeriesConfig = {
  type: 'surface3d',
  name: 'Height field',
  data: {
    xStart: 0,
    xStep: 1,
    zStart: 0,
    zStep: 1,
    columns: 4,
    rows: 4,
    y: [0, 1, 0, 1, 1, 2, 1, 2, 0, 1, 2, 1, 1, 2, 1, 0]
  },
  colormap: 'viridis',
  wireframe: true,
  opacity: 0.9,
  contours: { show: true, levels: 4 }
};

const options: ChartGPUOptions = {
  coordinateSystem: 'cartesian3d',
  axes3d: { showBox: true, showGrid: true },
  series: [series]
};

export default {
  title: 'ChartGPU/API Options/Series Configuration/Surface3DSeriesConfig',
  ...createOptionsMeta(
    'Series Configuration/Surface3DSeriesConfig',
    'Surface3DSeriesConfig renders a regular XZ height grid with a colormap, optional wireframe, opacity, and contours.'
  )
};

type Story = StoryObj;

export const Surface3DSeries: Story = { args: { options } };
