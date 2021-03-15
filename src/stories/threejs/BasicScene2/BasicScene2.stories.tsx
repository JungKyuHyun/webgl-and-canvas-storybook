import { Meta, Story } from "@storybook/react";
import { Scene1 } from "./Scene1";

export default {
  title: "Threejs/BasicScene2",
  parameters: {
    docs: {
      description: {
        component:
          "`BasicScene`은 여러 개의 하위 컴포넌트로 구성되어 있으며, 각각의 컴포넌트에서 threejs의 가장 기본적인 부분을 다룹니다.",
      },
    },
  },
  argTypes: {
    fov: {
      defaultValue: 45,
      description: "field of view의 줄임말로 시야각을 의미",
      control: { type: "range", min: 0, max: 90 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
    rotationSpeed: {
      defaultValue: 0.02,
      description: "cube의 회전 속도",
      control: { type: "range", min: 0, max: 1, step: 0.02 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
} as Meta;

export const scene1: Story = (args) => <Scene1 {...args} />;
scene1.parameters = {
  docs: {
    description: {
      story: "최초 가장 순수한 형태의 예제 컴포넌트 개발",
    },
  },
};
