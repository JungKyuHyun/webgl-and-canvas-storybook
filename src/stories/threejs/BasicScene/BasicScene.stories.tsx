import React from "react";
import { Meta, Story } from "@storybook/react";
import { Scene1 } from "./Scene1";

export default {
  title: "Threejs/BasicScene",
} as Meta;

const Template: Story = (args) => <Scene1 {...args} />;

export const scene1 = Template.bind({});
