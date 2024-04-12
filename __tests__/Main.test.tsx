import React from 'react';
import { Main } from '../src/components';
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Main>Content</Main>).toJSON();
  expect(tree).toMatchSnapshot();
});
