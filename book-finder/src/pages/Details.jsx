import { useParams} from 'react-router'
import { useState, useEffect } from 'react'


function Details(props) {
    const { savedBooks, setSavedBooks } = props;

    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [authorName, setAuthorName] = useState([]);
    const isBookSaved = savedBooks.some ((savedBook) => savedBook.key === book?.key);

  

  useEffect(() => {
    async function fetchBook() {
      try {
        setIsLoading(true);
        const response = await fetch(`https://openlibrary.org${decodeURIComponent(id)}.json`);
        const bookData = await response.json();

        if (!response.ok) {
            throw new Error('Book was not found');
        }

        setBook(bookData);

        //haetaan kirjailijan nimi erikseen 
        const authorKeys = bookData.authors.map(async (author) => {
            const response = await fetch(`https://openlibrary.org${author.author.key}.json`);
        
            const authorData = await response.json();
            return authorData.name;
        });

        const authorNames = await Promise.all(authorKeys);
        setAuthorName(authorNames);

      } catch (error) {
        console.error('Error fetching book details;', error);
      }
      finally {
        setIsLoading(false);
      }
    }

    fetchBook();
    }, [id]);

  return (
    <div className="container">
      <h1 className="text-dark">Book Details</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : book ? ( 

        /* Kirjan tiedot */
        <div>
            <div className="row">

        {/* KANSIKUVA */}
            <div className="col-md-4"> 
                {book.covers && book.covers[0] && (
                    <div className="mb-3">
                    <img 
                    src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`}
                    alt={book.title}
                 />
                </div>
             )}
        </div>

        {/* NIMI JA KIRJAILIJA */}
        <div className="col-md-8">
            <h2 className="text-dark fw-bold">{book.title}</h2>
            <h6 className="text-muted mb-3">
            Author: {authorName.join(', ') || 'Unknown author'}</h6>

        {/* JULKAISUAIKA */}
            <p className = "mb-3"> First published: {book.first_publish_date || 'Unknown' } </p>

        {/* Nappi kirjan lisäämiseksi tai poistamiseksi kirjastosta */}
            {isBookSaved ? (
              <button
                className="btn btn-danger mb-3"
                onClick={() =>
                  setSavedBooks((currentBooks) =>
                    currentBooks.filter((savedBook) => savedBook.key !== book.key)
                  )
                }
              >
                Remove from Library
              </button>
            ) : (
              <button
                className="btn btn-primary mb-3"
                onClick={() =>
                  setSavedBooks((currentBooks) => [...currentBooks, book])
                }
              >
                Add to Library
              </button>
            )}

            </div>
            </div>

            {/* KUVAUS */}
            <div className = "card mb-3 p-3 bg-light border -0 shadow-sm">
                <div className = "card-body">
                    <h3 className = "card-title">About the book</h3>

                <p className = "card-text text-muted">
                    {book.description?.value || book.description || 'No description available'}</p>
            </div>
        </div>

            <div>
                {book.subjects ? (
                    <ul>
                        {book.subjects.slice(0,5).map((subject, index) => (
                            <li key={index}>{subject}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No subjects available</p>
                )}

            </div>
        </div>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  )
}

export default Details