import { useState } from 'react'
import './App.css'

function App() {
  const [searchText, setSearchText] = useState('')
  function handleSearch() {
    if (!searchText.trim()) { //tarkistetaan, että hakusana ei ole tyhjä
      return;
    }
    fetchBooks(searchText);
  }
  const [books, setBooks] = useState([]);

  async function fetchBooks(query) { //haetaan kirjoja Open Library API:sta
    let encoded = encodeURIComponent(query); //muutetaan hakusana sopivaan muotoon
    let url = 'https://openlibrary.org/search.json?q=' + encoded;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setBooks(data.docs);
    } catch (error) {
      console.error('There was a problem fetching data:', error);
    }
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
      onChange={(e) => setSearchText(e.target.value)} // päivitetään hakusana tilaan, kun käyttäjä kirjoittaa
      />
      <button onClick={handleSearch}>Search</button>
      {books.map((book) => ( // käydään läpi haetut kirjat ja näytetään niiden nimet
        <div key={book.key}>
          <h3>{book.title}</h3>
          <p>{book.author_name ? book.author_name.join(', ') : 'Unknown author'}</p>
      </div>
    ))}


    </section>

    </main>
  )

}
export default App
