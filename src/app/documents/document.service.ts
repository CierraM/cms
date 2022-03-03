import { Injectable, Output } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { max, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[];
  documentChangedEvent = new Subject<Document[]>();
  maxId: number;

  constructor(private http:HttpClient) { 
    this.documents = []
    this.maxId = this.getMaxId();
  }

  getDocuments(){
    this.http.get('https://angular-http-57b12-default-rtdb.firebaseio.com/documents.json').subscribe((documents: Document[]) => {
      //success
      this.documents = documents;
      this.maxId = this.getMaxId();
      this.documents.sort();
      this.documentChangedEvent.next(this.documents.slice());
    }, (err) => {
      //error
      console.log(err)
    })
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    let selected = null;
    this.documents.forEach(document => {
      if (document.id === id) {
        selected = document
      }
    })
    return selected;
  }

  
  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    
    this.maxId++;
    newDocument.id = this.maxId.toString();
    this.documents.push(newDocument);
    // this.documentChangedEvent.next(this.documents.slice());
    this.storeDocuments();
    
  }
  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach(document => {
      let currentId = parseInt(document.id)
      if (currentId > maxId) {
        maxId = currentId;
      }
    })

    return maxId
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument)

    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id.toString();

    this.documents[pos] = newDocument
    // this.documentChangedEvent.next(this.documents.slice())
    this.storeDocuments();

  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    // this.documentChangedEvent.next(this.documents.slice());
    this.storeDocuments();

  }
  
  storeDocuments() {
    const payload = JSON.stringify(this.documents);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.put('https://angular-http-57b12-default-rtdb.firebaseio.com/documents.json', payload, { headers: headers }).subscribe(() => {
      this.documentChangedEvent.next(this.documents.slice());
    })
  }
}
