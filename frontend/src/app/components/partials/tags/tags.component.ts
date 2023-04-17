import { Component } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Tag } from 'src/app/shared/models/Tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  tags?:Tag[]
  constructor(bookService:BookService){
    this.tags = bookService.getAllTags();
  }

}
