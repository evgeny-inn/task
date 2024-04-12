import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import axios from 'axios';
import nock from 'nock';

import App from '../src/App';

axios.defaults.adapter = 'http';

const host = 'http://localhost:8080';

describe('app', () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });

  beforeAll(async () => {
    await render(<App />);
  });

  it.only('renders initial contacts', async () => {
    const scope = nock(host)
      .get('/contacts')
      .reply(200, {
        responseObject: {
          id: 1,
          firstname: 'Matthias',
          lastname: 'Käpernick',
          email: 'dev-jobs@autohaus-koenig.de',
        }
      });

    await waitFor(() => {
      const requestIsPerformed = scope.isDone();
      expect(requestIsPerformed).toBe(true);
      const contact = screen.getByText('Matthias');
      expect(contact).toBeInTheDocument();
    });
  });

  it('creates a contact', async () => {
    const newContact = {
      firstname: 'Billy',
      lastname: 'Bob',
      email: 'billy.bob@gmail.com',
    };

    nock(host)
      .post('/contacts', newContact)
      .reply(201, {
        responseObject: {
          id: 2,
          ...newContact,
        }
      });

    const addButton = screen.getByText('Neuer Eintrag');
    await userEvent.click(addButton);

    const vorname = screen.getByLabelText(/vorname/);
    await userEvent.type(vorname, 'Billy');

    const nachname = screen.getByLabelText(/nachname/);
    await userEvent.type(nachname, 'Bob');

    const email = screen.getByLabelText(/e-mail/);
    await userEvent.type(email,'billy.bob@gmail.com');

    const saveButton = screen.getByText('Speichern');
    await userEvent.click(saveButton);

    expect(screen.getByText('Billy Bob')).toBeInTheDocument();
  });

  it('updates an existing contact', async () => {
    const updatedContact = {
      firstname: 'Billy',
      lastname: 'Johnson',
      email: 'billy.bob@gmail.com',
    };

    nock(host)
      .put('/contacts/2', updatedContact)
      .reply(200, { id: 2, ...updatedContact });

    const contact = screen.getByText('Billy Bob');
    await userEvent.click(contact);

    const nachname = screen.getByLabelText(/nachname/);
    await userEvent.type(nachname, 'Johnson');

    const saveButton = screen.getByText('Speichern');
    await userEvent.click(saveButton);

    expect(screen.getByText('Billy Johnson')).toBeInTheDocument();
  });

  it('deletes an existing contact', async () => {
    nock(host)
      .delete('/contacts/2')
      .reply(200);

    const contact = screen.getByText('Billy Johnson');
    await userEvent.click(contact);

    const deleteButton = screen.getByText('Löschen');
    await userEvent.click(deleteButton);

    expect(screen.getByText('Billy Johnson')).not.toBeInTheDocument();
  });
});
