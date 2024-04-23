import { createContext } from 'react';
import type { Contact } from '../types';

interface ContactsContext {
  contacts: Contact[],
  createContact: (payload: Partial<Contact>) => void,
  updateContact: (contactId: number, payload: Partial<Contact>) => void,
  deleteContact: (contactId: number) => void,
}

const ContactsContext = createContext<ContactsContext>({
  contacts: [],
  createContact: () => {},
  updateContact: () => {},
  deleteContact: () => {},
});

export default ContactsContext;
