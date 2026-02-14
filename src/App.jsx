import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignToText from "./pages/SignToText";
import TextToSign from "./pages/TextToSign";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-to-text" element={<SignToText />} />
        <Route path="/text-to-sign" element={<TextToSign />} />
      </Routes>
    </BrowserRouter>
  );
}
