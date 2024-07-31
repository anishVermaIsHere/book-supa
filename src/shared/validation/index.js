import {object,string,number} from 'zod';


export const bookSchema = object({
    title: string()
      .min(3, {message:'Title must be of minimum 3 characters'})
      .max(100, {message:'Title must be of maximum 100 characters'}),
    author: string()
      .min(3, {message:'Author must be of minimum 3 characters'})
      .max(30, {message:'Author must be of maximum 30 characters'}),
    price: number().refine(value=>value>=0),
      // .gte(1, 'Price must be of minimum 3 digits')
      // .lte(999999, 'Price must be of maximum 6 digits'),
    pages: number()
      .lte(9999, 'Pages limit exceeded, only 5000 pages allowed'),
    published_year: number()
      .gte(1900,{message:'Must be above or equal to 1900'})
      .lte(9999,{message:'Must be less or equal to 3000'})
  });

 