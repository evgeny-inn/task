import React from 'react';
import { Input } from '../src/ui-kit';
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Input label="Label" />).toJSON();
  expect(tree).toMatchSnapshot();
});
