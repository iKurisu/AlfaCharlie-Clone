import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const component: renderer.ReactTestRenderer = renderer.create(<App />)
  expect(component).toMatchSnapshot();
})