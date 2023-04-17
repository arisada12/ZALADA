import { Injectable } from '@angular/core';
import { Book } from '../shared/models/Book';
import { sample_book, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tags';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor() { }

  getAll():Book[]{
    return sample_book
  }
  getBookBySearchTerms(searchTerm:string){
    return this.getAll().filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }
  getAllTags():Tag[]{
    return sample_tags
  }
  getBookByTag(tag:string):Book[]{
    if (tag === "All"){
      return this.getAll()
    }else{
      return this.getAll().filter(book => book.tags?.includes(tag))
    }
  }

  getBookById(bookId:string):Book{
    return this.getAll().find(book => book.id == bookId) ?? new Book()
  }
}
