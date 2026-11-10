import { Routes, Route } from 'react-router'
import { useState } from 'react'
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import MyLibrary from "./pages/MyLibrary.jsx";
import NavBar from "./NavBar.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [savedBooks, setSavedBooks] = useState([]);

  return (
  <>
  <NavBar />
  
  <div className="App">
    <div className ="page-content">
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
      <ToastContainer
      position = "bottom-center"
      autoClose={1500}
      theme = "light" />
    </div>
  </div>
    </>

  )
}

export default App
