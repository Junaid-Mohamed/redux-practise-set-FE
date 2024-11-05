import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addBook, updateBook } from "./bookSlice";

const BookForm = () => {

    const [bookForm, setBookForm] = useState({
        id:"",
        bookName:"",
        author:"",
        genre:""
    })

    const book = useLocation().state?.book;
   
    const {books} = useSelector((state)=> state.books);

    console.log("Books in form page",books)
    const dispatch = useDispatch();

    useEffect(()=>{
        if(book){
            setBookForm({
                id:book._id,
                bookName: book.bookName,
                author:book.author,
                genre:book.genre
            })
        }else{
            setBookForm({
        id:"",       
        bookName:"",
        author:"",
        genre:"" })
        }
    },[book])

    const handleChange = (e) => {
        const {name,value} = e.target;
        setBookForm((prevState)=>(
            {...prevState,
            [name]:value}
        ))
        
    }

    const handleSubmit = () => {
        console.log(bookForm);

        if(book){
            dispatch(updateBook(bookForm))
            setBookForm({
                bookName:"",
            author:"",
            genre:""
            })
        }else{
            dispatch(addBook(bookForm));
        setBookForm({
            bookName:"",
        author:"",
        genre:""
        })
        }

        
    }
    return(
        <div>
            <h1>Add Book</h1>
            <label>Book Name: </label>
            <input type="text" value={bookForm.bookName} onChange={handleChange} name="bookName" /> <br /><br />
            <label>Author: </label>
            <input type="text" value={bookForm.author} onChange={handleChange} name="author" /><br /><br />
            <label>Genre: </label>
            <input type="text" value={bookForm.genre} onChange={handleChange} name="genre" /> <br /><br />
        <button onClick={handleSubmit} >Add Book</button>
        </div>
    )
}

export default BookForm;