import React from "react";
import { Button, Section } from "../../components";

function Home() {
  return (
    <>
      <Section>
        Welcome to your React boilerplate. We hope that this will bring you up
        to speed with your development.
      </Section>
      <Section background="#eee">
        <Button color="primary" handleClick={() => alert("Button in work!")}>
          Check React Now
        </Button>
      </Section>
    </>
  );
}

export default Home;
