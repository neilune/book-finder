import { Routes, Route } from 'react-router'
import { useState } from 'react'
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import MyLibrary from "./pages/MyLibrary.jsx";
import NavBar from "./NavBar.jsx";


function App() {
  const [savedBooks, setSavedBooks] = useState([]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
         path="/books/:id" element={<Details 
         savedBooks={savedBooks}
         setSavedBooks={setSavedBooks}
         />
         } 
        />
        <Route path="/library" element={<MyLibrary 
        savedBooks={savedBooks}
        setSavedBooks={setSavedBooks}
        />
        } 
      />
      </Routes>
    </div>
  )
}

export default App
