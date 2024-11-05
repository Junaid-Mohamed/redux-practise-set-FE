
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import store from './app/store.js'
import BookForm from './features/Books/BookForm.jsx'
import BookList from './features/Books/BookList.jsx'
import MovieForm from './features/movies/MovieForm.jsx'
import './index.css'


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/add-movie',
    element: <MovieForm/>
  },
  {
    path:'/add-book',
    element: <BookForm/>
  }

])

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>

)
