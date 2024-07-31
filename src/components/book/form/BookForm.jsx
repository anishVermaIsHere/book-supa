import { useContext, useEffect } from 'react';
import style from './bookform.module.css';
import { useQueryClient, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import BookContext from '../../../context/BookContext';
import { bookSchema } from '../../../shared/validation';
import { bookAPI } from '../../../shared/services/api';

const BookForm = () => {
  const {register,handleSubmit,formState:{errors},setValue}=useForm({resolver:zodResolver(bookSchema)});
  const {handleFormToggle,book,setBook}=useContext(BookContext);
  const queryClient=useQueryClient();
  

  // functions declaration
  const closeForm=()=>{
    handleFormToggle();
    setBook(null);
  }

  const onSubmit=(formData)=>{
    if(book!==null){
      try {
        bookAPI.update(book.id,formData);
      } catch (error) {
        alert(error.message);
      }
  } else {
      try {
        bookAPI.add(formData);
      } catch (error) {
        alert(error.message);
      }
  }
    setBook(null);
    handleFormToggle();
  }

  const mutation = useMutation(onSubmit, {
    onSuccess: ()=>{
      // Invalidate and refetch
      queryClient.invalidateQueries('books');
    },
    onError:(error)=>{
      alert(error);
    }
  })


  useEffect(()=>{
    if(book!==null){
      const {title,price,pages,published_year,author}=book;
      setValue('title',title);
      setValue('author',author);
      setValue('price',price);
      setValue('pages',pages);
      setValue('published_year',published_year);
    } 
    return;
  },[book])

  
  return (
    <div className={style.container}>
      <div className={style.row}>
        <div className={style.head}>
          <h5>Book Manage</h5>
          <i className="fa-solid fa-xmark" onClick={closeForm}/>
        </div>
        <form onSubmit={handleSubmit(mutation.mutate)}>
            <div className={style.formGroup}>
                <div className={style.formInputGroup}>
                  <label htmlFor='title'>Title</label>
                  <input type="text" name="title" id="title" {...register('title')}/>
                  {errors.title && (
                      <p className={style.errorMessage}>{errors.title?.message}</p>
                    )}
                </div>
                <div className={style.formInputGroup}>
                  <label htmlFor='author'>Author</label>
                  <input type="text" name="author" id="author" {...register('author')}/>
                  {errors.author && (
                      <p className={style.errorMessage}>{errors.author?.message}</p>
                    )}
                </div>
                <div className={style.formInputGroup}>
                  <label htmlFor='price'>Price</label>
                  <input type="number" name="price" id="price" {...register('price',{valueAsNumber:true})}/>
                  {errors.price && (
                      <p className={style.errorMessage}>{errors.price?.message}</p>
                    )}
                </div>
                <div className={style.formInputGroup}>
                  <label htmlFor='pages'>Pages</label>
                  <input type="number" name="pages" id="pages" {...register('pages',{valueAsNumber:true})}/>
                  {errors.pages && (
                      <p className={style.errorMessage}>{errors.pages?.message}</p>
                    )}
                </div>
                <div className={style.formInputGroup}>
                  <label htmlFor='published_year'>Year</label>
                  <input type="number" name="published_year" id="published_year" {...register('published_year',{valueAsNumber:true})}/>
                  {errors.published_year && (
                      <p className={style.errorMessage}>{errors.published_year?.message}</p>
                    )}
                </div>

                <div className={style.buttonGroup}>
                  {book!==null?
                  <button type='submit' title='update book' className='btn' id='update'>Update</button>
                  :<button type='submit' title='add book' className='btn' id='submit' >Add</button>}
                </div>
            </div>
        </form>
      </div>
    </div>
  )
}

export default BookForm