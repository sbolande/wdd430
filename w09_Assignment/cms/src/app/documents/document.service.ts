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

  private documentsUrl =
    'https://wdd430-cms-2022-default-rtdb.firebaseio.com/documents.json';
  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) {}

  //#region "Firebase"
  // GET REQUEST
  getDocuments(): Document[] {
    this.http
      .get<Document[]>(this.documentsUrl)
      .subscribe((docs: Document[]) => {
        this.documents = docs;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
      });

    return this.documents.slice();
  }

  // PUT REQUEST
  storeDocuments() {
    this.http
      .put(this.documentsUrl, JSON.stringify(this.documents), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.documents.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }
  //#endregion "Firebase"

  //#region "CRUD"
  addDocument(newDoc: Document) {
    if (newDoc === null || newDoc === undefined) return;
    this.maxDocumentId++;
    newDoc.id = `${this.maxDocumentId}`;
    this.documents.push(newDoc);
    this.storeDocuments();
  }

  getDocument(id: string): Document {
    return this.documents.find((d) => d.id === id);
  }

  updateDocument(original: Document, newDoc: Document) {
    if (
      newDoc === null ||
      newDoc === undefined ||
      original === null ||
      original === undefined
    ) {
      return;
    }
    const pos = this.documents.indexOf(original);
    if (pos < 0) return;

    newDoc.id = original.id;
    this.documents[pos] = newDoc;
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }
  //#endregion "CRUD"

  //#region "Helpers"
  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach((d) => {
      if (+d.id > maxId) maxId = +d.id;
    });
    return maxId;
  }
  //#endregion "Helpers"
}
