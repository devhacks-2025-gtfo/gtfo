import { Theme } from "@radix-ui/themes";
import Home from "./pages/Home";
import Game from "./pages/Game";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Theme accentColor="indigo">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  );
}

export default App;
