import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path=":slug" element={<Work />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
