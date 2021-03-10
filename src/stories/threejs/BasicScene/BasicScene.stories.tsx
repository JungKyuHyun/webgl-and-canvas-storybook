import { Meta, Story } from "@storybook/react";
import { Scene1 } from "./Scene1";
import { Scene2 } from "./Scene2";
import { Scene3 } from "./Scene3";
import { Scene4 } from "./Scene4";

export default {
  title: "Threejs/BasicScene",
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
      control: { type: "range", min: 30, max: 90 },
      table: {
        category: "Camera",
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
    near: {
      defaultValue: 0.1,
      description: "카메라 앞에 렌더링 되는 근거리 공간 범위",
      control: { type: "range", min: 0, max: 10, step: 0.1 },
      table: {
        category: "Camera",
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
    far: {
      defaultValue: 1000,
      description: "카메라 앞에 렌더링 되는 원거리 공간 범위",
      control: { type: "range", min: 100, max: 2000, step: 100 },
      table: {
        category: "Camera",
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
    rendererColor: {
      control: { type: "color" },
      description: "전체 배경 색상",
      table: {
        category: "Background",
        type: { summary: "string | number | THREE.Color" },
      },
    },
    axesSize: {
      defaultValue: 20,
      description:
        "X 축은 빨간색입니다. Y 축은 녹색입니다. Z 축은 파란색입니다.",
      control: { type: "range", min: 0, max: 50, step: 5 },
      table: {
        category: "Axes",
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
    cameraPostionX: {
      defaultValue: -30,
      control: { type: "range", min: -150, max: 150, step: 5 },
      table: {
        category: "Camera",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    cameraPostionY: {
      defaultValue: 40,
      control: { type: "range", min: 0, max: 200, step: 10 },
      table: {
        category: "Camera",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    cameraPostionZ: {
      defaultValue: 30,
      control: { type: "range", min: 0, max: 300, step: 10 },
      table: {
        category: "Camera",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    spotLightColor: {
      control: { type: "color" },
      table: {
        category: "Light",
        type: { summary: "string | number | THREE.Color" },
        defaultValue: { summary: "undefined" },
      },
    },
    enabledShadow: {
      description: "그림자 사용 여부",
      defaultValue: true,
      control: { type: "boolean" },
      table: {
        category: "Shadow",
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    spotLightX: {
      defaultValue: -40,
      control: { type: "range", min: -200, max: 200, step: 10 },
      table: {
        category: "Light",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    spotLightY: {
      defaultValue: 60,
      control: { type: "range", min: -200, max: 200, step: 10 },
      table: {
        category: "Light",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    spotLightZ: {
      defaultValue: -10,
      control: { type: "range", min: -200, max: 200, step: 10 },
      table: {
        category: "Light",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
  },
} as Meta;

export const scene1: Story = (args) => <Scene1 {...args} />;
scene1.argTypes = {
  spotLightX: { control: false },
  spotLightY: { control: false },
  spotLightZ: { control: false },
  spotLightColor: { control: false },
  enabledShadow: { control: false },
};

export const scene2: Story = (args) => <Scene2 {...args} />;

export const scene3: Story = (args) => <Scene3 {...args} />;

export const scene4: Story = (args) => <Scene4 {...args} />;
