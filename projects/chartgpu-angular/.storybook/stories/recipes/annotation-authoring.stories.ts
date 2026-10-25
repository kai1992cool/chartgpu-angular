import type { Meta, StoryObj } from '@storybook/angular';
import { AnnotationAuthoringRecipeComponent } from './recipe-demos';

const meta: Meta<AnnotationAuthoringRecipeComponent> = {
  title: 'ChartGPU/Recipes/Annotation Authoring',
  component: AnnotationAuthoringRecipeComponent,
  parameters: {
    docs: {
      description: {
        component: 'Use createAnnotationAuthoring with the chart container and instance. The authoring helper owns annotation changes, so the chart options intentionally omit annotations.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<AnnotationAuthoringRecipeComponent>;

export const ContextMenuAndHandles: Story = {};
