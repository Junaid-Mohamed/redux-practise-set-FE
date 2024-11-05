import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BookList from "./BookList";
import { fetchBooks } from "./bookSlice";

const Book = () => {

    const dispatch = useDispatch();

    const {books,status, error} = useSelector((state)=> state.books);
  
    useEffect(()=>{
        dispatch(fetchBooks())
    },[])

    return(<div>
        <h1>Books</h1>
        {status === "loading" && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <Link to={'/add-book'} >Add New Book</Link>
        {status === "success" && <BookList books={books} />}
    </div>)
}

export default Book;