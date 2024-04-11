import { useContext } from 'react';
import { ContactsContext } from '../providers';

const useContacts = () => useContext(ContactsContext);

export default useContacts;
