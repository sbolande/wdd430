import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter();

  documents = [
    new Document('1', 'Test 1', 'This is test 1.', 'https://www.example.com/1'),
    new Document('2', 'Test 2', 'This is test 2.', 'https://www.example.com/2'),
    new Document('3', 'Test 3', 'This is test 3.', 'https://www.example.com/3'),
    new Document('4', 'Test 4', 'This is test 4.', 'https://www.example.com/4'),
    new Document('5', 'Test 5', 'This is test 5.', 'https://www.example.com/5'),
  ];

  constructor() {}

  ngOnInit(): void {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
