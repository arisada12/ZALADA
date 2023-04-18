import { Injectable } from '@angular/core';
import { Book } from '../shared/models/Book';
import { sample_book, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tags';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BOOKS_BY_ID_URL, BOOKS_BY_SEARCH_URL, BOOKS_BY_TAG_URL, BOOKS_TAGS_URL, BOOKS_URL } from '../shared/models/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http:HttpClient) {}

  getAll(): Observable<Book[]>{
    return this.http.get<Book[]>(BOOKS_URL)
  }

  getBookBySearchTerms(searchTerm:string){
    return this.http.get<Book[]>(BOOKS_BY_SEARCH_URL + searchTerm)
  }
  getAllTags(): Observable<Tag[]>{
    return this.http.get<Tag[]>(BOOKS_TAGS_URL)
  }
  getBookByTag(tag:string):Observable<Book[]>{
    if (tag === "All"){
      return this.getAll()
    }else{
      return this.http.get<Book[]>(BOOKS_BY_TAG_URL + tag)
    }
  }

  getBookById(bookId:string): Observable<Book>{
    return this.http.get<Book>(BOOKS_BY_ID_URL + bookId)
  }
}
