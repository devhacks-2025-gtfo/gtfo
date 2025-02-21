import { Theme } from "@radix-ui/themes";
import StartPage from "./components/StartPage";

function App() {
  return (
    <Theme accentColor="indigo">
      <StartPage />
    </Theme>
  );
}

export default App;
