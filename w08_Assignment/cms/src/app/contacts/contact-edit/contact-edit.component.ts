import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  groupContacts: any[];

  constructor() {}

  ngOnInit(): void {}

  onRemoveItem(index: number) {}

  onCancel() {}
}
