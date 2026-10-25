import type { ChartGPUOptions, PointCloud3DSeriesConfig } from 'chartgpu';
import type { StoryObj } from '@storybook/angular';
import { createOptionsMeta } from '../../shared';

const series: PointCloud3DSeriesConfig = {
  type: 'pointCloud3d',
  name: 'Sensor points',
  data: {
    x: [0, 1, 2, 3, 4],
    y: [0.5, 1.5, 0.8, 2, 1.2],
    z: [0, 0.5, 1, 1.5, 2],
    value: [10, 30, 20, 50, 40]
  },
  pointStyle: { size: 8, opacity: 0.9 },
  colorBy: { colormap: 'plasma' }
};

const options: ChartGPUOptions = {
  coordinateSystem: 'cartesian3d',
  axes3d: { showBox: true, showGrid: true },
  interaction3d: { orbit: true, pan: true, zoom: true },
  series: [series]
};

export default {
  title: 'ChartGPU/API Options/Series Configuration/PointCloud3DSeriesConfig',
  ...createOptionsMeta(
    'Series Configuration/PointCloud3DSeriesConfig',
    'PointCloud3DSeriesConfig plots XYZ data with optional scalar color mapping and point styling. The surrounding chart options configure the 3D coordinate system and interaction.'
  )
};

type Story = StoryObj;

export const PointCloud3DSeries: Story = { args: { options } };
