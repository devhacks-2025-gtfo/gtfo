
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Blank from "../pages/Blank";

function App() {
   

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/blank" element={<Blank/>} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;
