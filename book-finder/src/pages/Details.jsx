import { useParams} from 'react-router'
import { useState, useEffect } from 'react'

function Details() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authorName, setAuthorName] = useState([]);

  

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
      <h1>Book Details</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : book ? ( 
        <div>
            <h2>{book.title}</h2>
            <h3>Author: {authorName.join(', ') || 'Unknown author'}</h3>
            <p> First published: {book.first_publish_date || 'Unknown' } </p>
            <p>{book.description?.value || book.description || 'No description available'}</p>

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