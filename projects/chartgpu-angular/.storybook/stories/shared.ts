import type { Meta } from "@storybook/angular";
import { ChartGpuAngularComponent as ChartGpuAngularComponent } from "../../src/lib/chartgpu-angular.component";

export function createOptionsMeta(
  section: string,
  description: string,
): Meta<ChartGpuAngularComponent> {
  return {
    title: `ChartGPU/API Options/${section}`,
    component: ChartGpuAngularComponent,
    argTypes: {
      options: {
        control: "object",
        description:
          "Edit the complete ChartGPUOptions object, including nested series configuration.",
      },
      style: { table: { disable: true } },
    },
    args: {
      style: { width: "100%", height: "440px" },
    },
    parameters: {
      docs: {
        description: { component: description },
      },
    },
  };
}
