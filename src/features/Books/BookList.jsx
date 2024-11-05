import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBook } from "./bookSlice";

const BookList = ({books}) => {

    const dispatch = useDispatch ();
 
    const handleDelete = (bookId) => {
        dispatch(deleteBook(bookId));
    }

    return(
        <div>
            <h1>Book List</h1>
            {books?.map((book)=>(
                <div key={book._id} >
                    <h3>Title: {book.bookName}</h3>
                    <p>Author: {book.author}</p>
                    <p>Genre: {book.genre}</p>
                    <Link to={'/add-book'} state={{book}} >Edit</Link>
                    <button onClick={()=>handleDelete(book._id)} >Delete</button>
                </div>
            ))}

        </div>
    )
}

export default BookList;