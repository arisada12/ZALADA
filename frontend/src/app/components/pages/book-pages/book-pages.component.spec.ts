import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPagesComponent } from './book-pages.component';

describe('BookPagesComponent', () => {
  let component: BookPagesComponent;
  let fixture: ComponentFixture<BookPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
