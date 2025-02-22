import { Theme } from "@radix-ui/themes";
import Home from "./pages/Home";
import Game from "./pages/Game";
import { useState } from "react";

function App() {
  const [connected, setConnected] = useState<boolean>(false);
  return (
    <Theme accentColor="indigo">
     

      <Game/>
    </Theme>
  );
}

export default App;
