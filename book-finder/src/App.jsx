import { useState } from 'react'
import './App.css'

function App() {
  const [searchText, setSearchText] = useState('')
  function handleSearch() {
    console.log(searchText)
  }
    return (
    <main className="app">
      <header className= "header">
        <h1>Book Finder</h1>
        <p>TEKSTIÄ TEKSTIÄ TEKSTIÄ</p>
      </header>
  

    <section className="search">
      <h2>Search for books:</h2>
      <input type="text"
      placeholder="Search for books"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </section>

    </main>
  )

}
export default App
