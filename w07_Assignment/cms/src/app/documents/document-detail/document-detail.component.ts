import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from 'src/app/win-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})
export class DocumentDetailComponent implements OnInit {
  nativeWindow: any;
  document: Document;

  constructor(
    private docService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private winRef: WinRefService
  ) {}

  ngOnInit(): void {
    this.nativeWindow = this.winRef.getNativeWindow();

    this.route.params.subscribe((params: Params) => {
      this.document = this.docService.getDocument(params['id']);
    });
  }

  onView() {
    if (this.document.url) this.nativeWindow.open(this.document.url);
  }

  onDelete() {
    this.docService.deleteDocument(this.document);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
