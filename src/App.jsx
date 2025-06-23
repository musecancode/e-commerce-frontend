import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CategoryPage from "./CategoryPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
