function MyLibrary(props) {
    const { savedBooks, setSavedBooks } = props;

  return (
    <div className="container">
      <h1>My Library</h1>

      {savedBooks.length === 0 ? (
        <p> Your library is empty </p>
    ) : ( 
        <>
        <p>You have {savedBooks.length} books in your library.</p>

        {savedBooks.map((book) => (
            <div key = {book.key} className="book-card">
                <h3>{book.title}</h3>

                {book.covers && book.covers[0] && (
                    <img
                    src= {`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`}
                    alt = {book.title}
                />
              )}
                
              <div> 
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
                  className="btn btn-danger"
                  onClick={() =>
                    setSavedBooks((currentBooks) =>
                      currentBooks.filter((savedBook) => savedBook.key !== book.key)
                    )
                  }
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