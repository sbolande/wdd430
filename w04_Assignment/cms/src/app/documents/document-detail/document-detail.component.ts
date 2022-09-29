import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})
export class DocumentDetailComponent implements OnInit {
  @Input() document: Document;

  constructor() {}

  ngOnInit(): void {}
}
