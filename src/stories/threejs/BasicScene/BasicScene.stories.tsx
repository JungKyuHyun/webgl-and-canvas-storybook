import React from "react";
import { Meta, Story } from "@storybook/react";
import { Scene1 } from "./Scene1";

export default {
  title: "Threejs/BasicScene",
  argTypes: {
    fov: { defaultValue: 45, control: { type: "range", min: 30, max: 90 } },
    near: {
      defaultValue: 0.1,
      control: { type: "range", min: 0, max: 10, step: 0.1 },
    },
    far: {
      defaultValue: 1000,
      control: { type: "range", min: 100, max: 2000, step: 100 },
    },
    rendererColor: {
      control: { type: "color" },
    },
    axesSize: {
      defaultValue: 20,
      control: { type: "range", min: 0, max: 50, step: 5 },
    },
    cameraPostionX: {
      defaultValue: -30,
      control: { type: "range", min: -150, max: 150, step: 5 },
    },
    cameraPostionY: {
      defaultValue: 40,
      control: { type: "range", min: 0, max: 200, step: 10 },
    },
    cameraPostionZ: {
      defaultValue: 30,
      control: { type: "range", min: 0, max: 300, step: 10 },
    },
  },
} as Meta;

const Template: Story = (args) => {
  return <Scene1 {...args} />;
};

export const scene1 = Template.bind({});