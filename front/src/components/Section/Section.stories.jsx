import { storiesOf } from "@storybook/react";
import React from "react";
import Section from "./Section";

storiesOf("Section", module).add("Full-width Section", () => (
  <Section background="#eee" fullWidth={true}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio architecto
    suscipit tenetur eligendi quas consectetur laboriosam ullam reiciendis eius
    beatae, ipsam voluptate blanditiis non vel? Velit ullam itaque laborum et.
  </Section>
));

storiesOf("Section", module).add("Fixed-width Section", () => (
  <Section background="#eee" fullWidth={false}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio architecto
    suscipit tenetur eligendi quas consectetur laboriosam ullam reiciendis eius
    beatae, ipsam voluptate blanditiis non vel? Velit ullam itaque laborum et.
  </Section>
));

storiesOf("Section", module).add("Transparent Section", () => (
  <Section background="">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio architecto
    suscipit tenetur eligendi quas consectetur laboriosam ullam reiciendis eius
    beatae, ipsam voluptate blanditiis non vel? Velit ullam itaque laborum et.
  </Section>
));
