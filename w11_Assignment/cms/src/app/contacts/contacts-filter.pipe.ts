import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): any {
    let filteredContacts = contacts.filter((c) =>
      c.name.toLowerCase().includes(term.toLowerCase())
    );
    if (filteredContacts.length < 1) return contacts;
    return filteredContacts;
  }
}
