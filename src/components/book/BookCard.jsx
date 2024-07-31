import style from './book.module.css';
import { bookAPI } from '../../shared/services/api';
import { useContext } from 'react';
import BookContext from '../../context/BookContext';

const BookCard = (book) => {
    const {isAlert,setIsAlert,setBook,setFormOpen}=useContext(BookContext);
    const {title,pages,price,author,published_year}=book;
    const deleteAlert=()=>{
        setBook(book);
        setIsAlert(!isAlert);
    }
    const handleEdit=async()=>{
       const res= await bookAPI.getById(book.id);
        setBook(res.data[0]);
        setFormOpen(true);
    }
  return (
    <div className={` ${style.bookListItem}`}>
        <div>
            <img src='./defaultbookimage.jpg' alt={title} />
        </div>

        <div style={{marginLeft:'0.8rem',width:'100%'}}>
            <div className={`${style.bookLabel} ${style.bTitle}`}>
                <span style={{marginRight:'0.5rem'}}>
                <i className="fa-solid fa-book"></i>
                </span>
                {title}</div>
            <div className={`${style.bookLabel} ${style.bAuthor}`}>
                <span style={{marginRight:'0.5rem'}}>
                    <i className="fa-regular fa-user"></i>
                </span>
                {author}
            </div>
            <div className={`${style.bookLabel} ${style.bPrice}`}>${price}</div>
            <div className={`${style.bookLabel} ${style.bPages}`}>Pages: {pages}</div>
            <div className={`${style.bookLabel} ${style.bPubYear}`}>Year: {published_year}</div>
        </div>

        <div style={{display:'flex', gap:'0.5rem'}}>
            <span onClick={deleteAlert}>
                <i className={`fa-solid fa-trash ${style.delete}`}></i> 
            </span>
            <span onClick={handleEdit}>
                <i className={`fa-regular fa-pen-to-square ${style.edit}`}></i>
            </span>
        </div>
    </div>
  )
}

export default BookCard