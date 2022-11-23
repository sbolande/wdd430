import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  selectedDocumentEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  private documentsUrl = 'http://localhost:3000/documents';
  private documents: Document[] = [];

  constructor(private http: HttpClient) {}

  //#region "CRUD"
  getDocuments() {
    this.http
      .get<{ message: string; documents: Document[] }>(this.documentsUrl)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.documents = res.documents;
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }

  addDocument(newDoc: Document) {
    if (!newDoc) return;
    newDoc.id = '';
    this.http
      .post<{ message: string; document: Document }>(
        this.documentsUrl,
        newDoc,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.documents.push(res.document);
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }

  updateDocument(original: Document, newDoc: Document) {
    if (!newDoc || !original) return;
    const pos = this.documents.indexOf(original);
    if (pos < 0) return;

    newDoc.id = original.id;
    newDoc._id = original._id;
    this.http
      .put<{ message: string }>(`${this.documentsUrl}/${original.id}`, newDoc, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.documents[pos] = newDoc;
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }

  deleteDocument(doc: Document) {
    if (!doc) return;
    const pos = this.documents.indexOf(doc);
    if (pos < 0) return;
    this.http
      .delete<{ message: string }>(`${this.documentsUrl}/${doc.id}`)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.documents.splice(pos, 1);
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }
  //#endregion "CRUD"

  //#region "Helpers"
  getDocument(id: string): Document {
    return this.documents.find((d) => d.id === id);
  }

  sortAndSend() {
    this.documents.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.documentListChangedEvent.next(this.documents.slice());
  }
  //#endregion "Helpers"
}
