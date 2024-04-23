import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';

import App from '../src/App';

Polly.register(NodeHttpAdapter);

let polly: Polly;

beforeAll(() => {
  polly = new Polly('rest api', {
    adapters: ['node-http'],
  });

  const { server } = polly;

  server
    .get(`/contacts`)
    .intercept((_, res) => {
      const data = {
        responseObject: [
          {
            id: 1,
            firstname: 'Matthias',
            lastname: 'Käpernick',
            email: 'dev-jobs@autohaus-koenig.de',
          },
        ],
      };
      res.status(200).json(data);
    });

  server
    .post(`/contacts`)
    .intercept((_, res) => {
      const newContact = {
        firstname: 'Billy',
        lastname: 'Bauer',
        email: 'billy.bauer@gmail.com',
      };
      res.status(201).json({
        responseObject: { id: 2, ...newContact },
      });
    });

  server
    .put(`/contacts/2`)
    .intercept((_, res) => {
      const updatedContact = {
        firstname: 'Billy',
        lastname: 'Johnson',
        email: 'billy.bauer@gmail.com',
      };
      res.status(200).json({
        responseObject: { id: 2, ...updatedContact }
      })
    });

  server
    .delete(`/contacts/2`)
    .intercept((_, res) => {
      res.status(200);
    })
});

afterAll(async () => {
  await polly.stop();
});

it('peforms CRUD operations', async () => {
  await render(<App />);

  const initialContact = await screen.findByText('Matthias Käpernick');
  expect(initialContact).toBeInTheDocument();

  const addButton = screen.getByText('Neuer Eintrag');
  await userEvent.click(addButton);

  const name = screen.getByLabelText(/vorname/i);
  await userEvent.type(name, 'Billy');

  const surname = screen.getByLabelText(/nachname/i);
  await userEvent.type(surname, 'Bauer');

  const email = screen.getByLabelText(/e-mail/i);
  await userEvent.type(email,'billy.bauer@gmail.com');

  const submitButton = screen.getByText('Speichern');
  await userEvent.click(submitButton);

  expect(await screen.findByText('Billy Bauer')).toBeInTheDocument();
  const contacts = screen.getAllByRole('listitem');
  expect(contacts).toHaveLength(2);

  const contact = screen.getByText('Billy Bauer');
  await userEvent.click(contact);

  const surnameToUpdate = screen.getByLabelText(/nachname/i);
  await userEvent.clear(surnameToUpdate);
  await userEvent.type(surnameToUpdate, 'Johnson');

  const saveButton = screen.getByText('Speichern');
  await userEvent.click(saveButton);


  expect(await screen.findByText('Billy Johnson')).toBeInTheDocument();
  expect(screen.queryByText('Billy Bauer')).not.toBeInTheDocument();

  const updatedContact = screen.getByText('Billy Johnson');
  await userEvent.click(updatedContact);

  const deleteButton = screen.getByText('Löschen');
  await userEvent.click(deleteButton);

  await waitFor(() => {
    expect(screen.queryByText('Billy Johnson')).not.toBeInTheDocument();
    const contacts = screen.getAllByRole('listitem');
    expect(contacts).toHaveLength(1);
  });
});
