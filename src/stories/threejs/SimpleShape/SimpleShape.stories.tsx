import { Meta, Story } from "@storybook/react";
import { Cube } from "./Cube";

export default {
  title: "Threejs/SimpleShape",
  parameters: {
    docs: {
      description: {
        component:
          "`SimpleShape`에서는 여러 개의 기본적인 도형을 만들어 봅니다.",
      },
    },
  },
  argTypes: {
    cameraPositionZ: {
      defaultValue: 400,
      description: "카메라의 z축 위치를 결정",
      control: { type: "range", min: 0, max: 1000, step: 50 },
      table: {
        category: "Camera",
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
} as Meta;

export const scene1: Story = (args) => <Cube {...args} />;
scene1.parameters = {
  docs: {
    description: {
      story: "빛이 반사되는 재질을 가진 단순한 사각형 도형",
    },
  },
};
