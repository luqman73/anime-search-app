import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import AnimeDetail from "./pages/AnimeDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
