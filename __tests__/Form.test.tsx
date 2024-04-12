import React from 'react';
import { Form } from '../src/components';
import renderer from "react-test-renderer";

it("renders update form correctly", () => {
  const tree = renderer.create(<Form type="update" contactId={1} closeModal={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders add form correctly", () => {
  const tree = renderer.create(<Form type="add" contactId={1} closeModal={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
