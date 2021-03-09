import React from "react";
import { Meta, Story } from "@storybook/react";
import { Scene1 } from "./Scene1";
import { Scene2 } from "./Scene2";

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
    spotLightColor: {
      control: { type: "color" },
    },
    enabledShadow: {
      defaultValue: true,
      control: { type: "boolean" },
    },
    spotLightX: {
      defaultValue: -40,
      control: { type: "range", min: -200, max: 200, step: 10 },
    },
    spotLightY: {
      defaultValue: 60,
      control: { type: "range", min: -200, max: 200, step: 10 },
    },
    spotLightZ: {
      defaultValue: -10,
      control: { type: "range", min: 200, max: 200, step: 10 },
    },
  },
} as Meta;

const Template1: Story = (args) => {
  return <Scene1 {...args} />;
};

const Template2: Story = (args) => {
  return <Scene2 {...args} />;
};

export const scene1 = Template1.bind({});

export const scene2 = Template2.bind({});
