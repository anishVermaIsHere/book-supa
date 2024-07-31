import { useContext } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import style from './alert.module.css';
import BookContext from '../../context/BookContext';
import { bookAPI } from '../../shared/services/api';


const AlertBox = () => {
  const {book,setBook, isAlert,setIsAlert}=useContext(BookContext);
  const queryClient=useQueryClient();
  
  const handleDelete=()=>{
    bookAPI.delete(book.id);
    setIsAlert(!isAlert);
    setBook(null);
  }

  const mutation = useMutation(handleDelete, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('books')
    },
  })


 

  return (
    <div className={style.overlay}>
        <div className={`flexCenter ${style.alertBox}`}>
            <p style={{marginBottom:'1.2rem'}}>Are you sure to delete?</p>
            <div className={style.alertActions}>
                <button className={`btn ${style.delete}`} title='delete' onClick={mutation.mutate}>Delete</button>
                <button className='btn' title='cancel' onClick={()=>setIsAlert(!isAlert)}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default AlertBox