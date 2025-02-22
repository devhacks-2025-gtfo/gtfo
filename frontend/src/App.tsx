import { Theme } from "@radix-ui/themes";
import Home from "./pages/Home";
import Game from "./pages/Game";
import { useState } from "react";

function App() {
  const [connected, setConnected] = useState<boolean>(false);
  return (
    <Theme accentColor="indigo">
      {connected ? (
        <Game />
      ) : (
        <Home connected={connected} setConnected={setConnected} />
      )}
    </Theme>
  );
}

export default App;
