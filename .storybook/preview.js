import { NormalizeCss } from "../src/styles/normalize";

export const decorators = [
  (Story) => (
    <>
      <NormalizeCss />
      <Story />
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
};
