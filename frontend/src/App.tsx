import { useState } from "react";
import TestComponent from "./components/TestComponent.tsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <TestComponent />
      </div>
    </>
  );
}

export default App;
