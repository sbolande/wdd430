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
  // private maxDocumentId: number;

  constructor(private http: HttpClient) {}

  //#region "SERVER"
  // GET REQUEST
  getDocuments(): Document[] {
    this.http
      .get<{ message: string; documents: Document[] }>(this.documentsUrl)
      .subscribe((res) => {
        console.log(res.message);
        this.documents = res.documents;
        // this.maxDocumentId = this.getMaxId();
        this.sortAndSend();
      });

    return this.documents.slice();
  }

  // PUT REQUEST - deprecated during switch to MongoDB
  // storeDocuments() {
  //   this.http
  //     .put(this.documentsUrl, JSON.stringify(this.documents), {
  //       headers: new HttpHeaders().set('Content-Type', 'application/json'),
  //     })
  //     .subscribe(() => {
  //       this.documents.sort((a, b) => {
  //         if (a < b) return -1;
  //         if (a > b) return 1;
  //         return 0;
  //       });
  //       this.documentListChangedEvent.next(this.documents.slice());
  //     });
  // }
  //#endregion "SERVER"

  //#region "CRUD"
  addDocument(newDoc: Document) {
    if (!newDoc) return;
    newDoc.id = '';
    this.http
      .post<{ message: string; document: Document }>(
        this.documentsUrl,
        newDoc,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .subscribe((res) => {
        this.documents.push(res.document);
        this.sortAndSend();
      });
  }

  getDocument(id: string): Document {
    return this.documents.find((d) => d.id === id);
  }

  updateDocument(original: Document, newDoc: Document) {
    if (!newDoc || !original) return;
    const pos = this.documents.indexOf(original);
    if (pos < 0) return;

    newDoc.id = original.id;
    newDoc._id = original._id;
    this.http
      .put(`${this.documentsUrl}/${original.id}`, newDoc, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe((res) => {
        this.documents[pos] = newDoc;
        this.sortAndSend();
      });
  }

  deleteDocument(doc: Document) {
    if (!doc) return;
    const pos = this.documents.indexOf(doc);
    if (pos < 0) return;
    this.http.delete(`${this.documentsUrl}/${doc.id}`).subscribe((res) => {
      this.documents.splice(pos, 1);
      this.sortAndSend();
    });
  }
  //#endregion "CRUD"

  //#region "Helpers"

  // getMaxId(): number {
  //   let maxId = 0;
  //   this.documents.forEach((d) => {
  //     if (+d.id > maxId) maxId = +d.id;
  //   });
  //   return maxId;
  // }

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
