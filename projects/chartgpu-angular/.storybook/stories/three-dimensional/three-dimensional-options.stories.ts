import type { StoryObj } from '@storybook/angular';
import type { ChartGPUOptions } from 'chartgpu';
import { createOptionsMeta } from '../shared';

const options: ChartGPUOptions = {
  coordinateSystem: 'cartesian3d',
  camera: { type: 'perspective', fovY: 0.8, eye: [4, 3, 5], target: [2, 2, 2] },
  interaction3d: { orbit: true, pan: true, zoom: true },
  axes3d: { showBox: true, showGrid: true, x: { name: 'X' }, y: { name: 'Y' }, z: { name: 'Z' } },
  series: [{
    type: 'pointCloud3d',
    name: 'Point cloud',
    data: {
      x: [0, 1, 2, 3, 4],
      y: [0.5, 1.5, 0.8, 2, 1.2],
      z: [0, 0.5, 1, 1.5, 2]
    },
    color: '#4f46e5'
  }]
};

export default {
  title: 'ChartGPU/API Options/3D/ThreeDimensionalOptions',
  ...createOptionsMeta(
    '3D/ThreeDimensionalOptions',
    '3D ChartGPUOptions including coordinateSystem, camera, interaction3d, axes3d, and a pointCloud3d series. Edit the nested 3D settings in Controls.'
  )
};

type Story = StoryObj;

export const PointCloud3D: Story = {
  args: { options }
};
