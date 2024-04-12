import { useState, useEffect, createContext } from 'react';
import { client } from '../api';

interface Contact {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

interface ContactsContext {
  contacts: Contact[],
  createContact: (payload: Partial<Contact>) => void,
  updateContact: (contactId: number, payload: Partial<Contact>) => void,
  deleteContact: (contactId: number) => void,
}

interface ContactsProviderProps {
  children: React.ReactNode;
}

const ContactsContext = createContext<ContactsContext>({
  contacts: [],
  createContact: () => {},
  updateContact: () => {},
  deleteContact: () => {},
});

const ContactsProvider = ({ children }: ContactsProviderProps) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data } = await client.get('/contacts');
      setContacts(data.responseObject);
    };
    fetchContacts();
  }, []);

  const createContact = async (payload: Partial<Contact>) => {
    const { data } = await client.post('/contacts', { ...payload });
    const updatedContacts = [...contacts, data.responseObject];
    setContacts(updatedContacts);
  };

  const updateContact = async (contactId: number, payload: Partial<Contact>) => {
    await client.put(`/contacts/${contactId}`, { ...payload });
    const updatedContacts = contacts.map((contact) => contact.id === contactId
      ? { ...contact, ...payload }
      : contact
    );
    setContacts(updatedContacts);
  };

  const deleteContact = async (contactId: number) => {
    await client.delete(`/contacts/${contactId}`);
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    setContacts(updatedContacts);
  };

  return (
    <ContactsContext.Provider value={{ contacts, createContact, updateContact, deleteContact }}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
export { ContactsContext };
