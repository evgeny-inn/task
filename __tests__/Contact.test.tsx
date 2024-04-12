import React from 'react';
import { Contact } from '../src/ui-kit';
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Contact title="Title" text="Description" />).toJSON();
  expect(tree).toMatchSnapshot();
});
