import { createContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { bookAPI } from '../shared/services/api';

const BookContext = createContext({});

export const DataProvider=({children})=>{
    
    const {data,isLoading}=useQuery(['books'],async()=>await bookAPI.get());
    const [book,setBook]=useState(null);
    const [isFormOpen,setFormOpen]=useState(false);
    const [isAlert, setIsAlert]=useState(false);

    
    // functions declaration
    const handleFormToggle=()=>{
        setFormOpen(!isFormOpen);
        setBook(null);
    }

    // provider values
    const valueProps={
        isFormOpen,
        setFormOpen,
        handleFormToggle,
        isAlert,
        setIsAlert,
        book,
        setBook,
        data,
        isLoading
    }

    return <BookContext.Provider value={valueProps}>
        {children}
    </BookContext.Provider>
};

export default BookContext;