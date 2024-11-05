import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchBooks = createAsyncThunk('books/fetchBooks', async(_,{rejectWithValue}) => {
    try{
        const response = await axios.get('http://localhost:3000/books');
        return response.data;
    }catch(error){
        return rejectWithValue(error.message);
    }
})

export const addBook = createAsyncThunk('books/addBook', async(bookData, {rejectWithValue})=>{
    try{
        console.log(bookData);
        const response = await axios.post('http://localhost:3000/books', bookData);
        console.log(response.data);
        return response.data;
    }catch(error){
        return rejectWithValue(error.message);
    }
})

export const deleteBook = createAsyncThunk("books/deleteBook", async(bookId, {rejectWithValue})=>{
    try{
        const response = await axios.delete(`http://localhost:3000/books/${bookId}`);
        console.log(response);
        return response.data;
    }catch(error){
        return rejectWithValue(error.message);
    }
})

export const updateBook = createAsyncThunk("books/updateBook", async(bookData, {rejectWithValue})=>{
    try{
        const response = await axios.put(`http://localhost:3000/books/${bookData.id}`, bookData);
        return response.data;
    }catch(error){
        return rejectWithValue(error.message);
    }
})

export const bookSlice = createSlice({
    name:'books',
    initialState:{
        books:[],
        status: 'idle',
        error: null
    },
    reducers:{},
    extraReducers: (builder) => {
        // fetch book
        builder.addCase(fetchBooks.pending, (state)=>{
            state.status = "loading"
        })
        builder.addCase(fetchBooks.fulfilled, (state,action)=>{
            state.status = "success";
            state.books = action.payload;
        })
        builder.addCase(fetchBooks.rejected, (state,action)=>{
            state.status = 'error';
            state.error = action.payload
        })
        // add book
        builder.addCase(addBook.pending, (state)=>{
            state.status = "loading"
        })
        builder.addCase(addBook.fulfilled, (state,action)=>{
            state.status = "success";
            console.log(action.payload);
            state.books.push(action.payload);
        })
        builder.addCase(addBook.rejected, (state,action)=>{
            state.status = 'error';
            state.error = action.payload
        })

        // delete book
        builder.addCase(deleteBook.pending, (state)=>{
            state.status = "loading"
        })
        builder.addCase(deleteBook.fulfilled, (state,action)=>{
            state.status = "success";
            console.log(action.payload);
            state.books = state.books.filter((book)=> book._id !== action.payload.book._id);
        })
        builder.addCase(deleteBook.rejected, (state,action)=>{
            state.status = 'error';
            state.error = action.payload
        })

         // update book
         builder.addCase(updateBook.pending, (state)=>{
            state.status = "loading"
        })
        builder.addCase(updateBook.fulfilled, (state,action)=>{
            state.status = "success";
            const bookIndex = state.books.findIndex((book)=> book._id === action.payload._id);

            if(bookIndex !== -1){
                state.books[bookIndex] = action.payload
            }
        })
        builder.addCase(updateBook.rejected, (state,action)=>{
            state.status = 'error';
            state.error = action.payload
        })
    }
})

// export const {fetchBooks} = bookSlice.actions;
export default bookSlice.reducer;