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

                {book.cover_i && (
                    <img
                    src= {`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt = {book.title}
                />
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default MyLibrary