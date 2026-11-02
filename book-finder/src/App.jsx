import { Routes, Route } from 'react-router'
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import MyLibrary from "./pages/MyLibrary.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<Details />} />
        <Route path="/library" element={<MyLibrary />} />
      </Routes>
    </div>
  );
}

export default App
