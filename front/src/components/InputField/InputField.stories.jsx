import { storiesOf } from "@storybook/react";
import React from "react";
import InputField from "./InputField";

storiesOf("Input", module)
  .add("Text Field", () => (
    <InputField
      type="text"
      placeholder="Name"
      handleChange={(e) => console.log(e.target.value)}
    />
  ))
  .add("Password Field", () => (
    <InputField
      type="password"
      placeholder="Password"
      handleChange={(e) => console.log(e.target.value)}
    />
  ))
  .add("Number Field", () => (
    <InputField
      type="number"
      placeholder="Age"
      handleChange={(e) => console.log(e.target.value)}
    />
  ))
  .add("Long Text Field", () => (
    <InputField
      type="longtext"
      placeholder="This is a placeholder"
      handleChange={(e) => console.log(e.target.value)}
    />
  ))
  .add("Dropdown Field", () => (
    <InputField
      type="dropdown"
      options={[
        { id: 1, name: "Vilnius", value: "vilnius" },
        { id: 2, name: "Kaunas", value: "kaunas" },
      ]}
      handleChange={(e) => console.log(e.target.value)}
    />
  ));
