import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

function MyLibrary(props) {
    const { savedBooks, setSavedBooks } = props;

  return (
    <div className="container-fluid">
      <h1 className="text-dark"> My Library</h1>

      {savedBooks.length === 0 ? (
        <p> Your library is empty </p>
    ) : ( 
        <>
        <p>You have {savedBooks.length} books in your library.</p>

        {savedBooks.map((book) => (
            <div key = {book.key} className="book-card">
              <Link to ={`/books/${encodeURIComponent(book.key)}`}
              className ="text-decoration-none book-title-link">
            <h3 className="text-dark">{book.title}</h3>
          </Link>
              

                {book.covers && book.covers[0] && (
                    <img
                    src= {`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`}
                    alt = {book.title}
                />
              )}
                
              <div className = "mb-2"> 
                <p> Rating:</p>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="btn p-0 border 0 bg-transparent text-warning" onClick={() => {
                        setSavedBooks((currentBooks) =>
                            currentBooks.map((savedBook) =>
                                savedBook.key === book.key ? {...savedBook, rating: star} : savedBook
                            )
                        );
                    }}>
                        {star <= (book.rating || 0) ? '★' : '☆'}
                    </button>
                ))}

              </div>


                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    setSavedBooks((currentBooks) =>
                      currentBooks.filter((savedBook) => savedBook.key !== book.key)
                    )
                    toast.error('Book removed from Library!');
                  }}
                >
                  Remove from Library
                </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default MyLibrary