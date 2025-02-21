import { useState } from "react";
import TestComponent from "./components/TestComponent.tsx";
import { Theme, Flex, Text, Button } from "@radix-ui/themes";

function App() {
  return (
    <Theme>
      <div>
        <TestComponent />
        <Flex direction="column" gap="2">
          <Text>Hello from Radix Themes :)</Text>
          <Button>Let's go</Button>
        </Flex>
      </div>
    </Theme>
  );
}

export default App;
