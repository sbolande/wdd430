import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.messageSender = this.contactService.getContact(
      this.message.sender
    ).name;
  }
}
