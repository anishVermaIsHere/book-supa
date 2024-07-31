import { useContext } from 'react'
import BookContext from '../../context/BookContext';
import AlertBox from '../alert/AlertBox';
import BookForm from './form/BookForm';
import BookList from './BookList';

const BookSection = () => {
  const {isFormOpen,handleFormToggle,isAlert}=useContext(BookContext);
  return (
    <section className='container' style={{padding:'1rem'}}>
      <h3 style={{marginBottom:'2rem',textAlign:'center'}}>Book Manage App with Supabase DB</h3>
        <div>
          <button type='button' id="addBook" className='btn' onClick={handleFormToggle}>Add Book</button>
        </div>
        {isAlert&&<AlertBox />}
        {isFormOpen&&<BookForm />}
        <BookList />
    </section>
  )
}

export default BookSection