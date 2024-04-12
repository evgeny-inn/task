import React from 'react';
import { Button } from '../src/ui-kit';
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Button variant="primary">Click</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});
