import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  documents = [
    new Document('1', 'Test', 'This is a test.', 'https://www.example.com/'),
  ];

  constructor() {}

  ngOnInit(): void {}
}
