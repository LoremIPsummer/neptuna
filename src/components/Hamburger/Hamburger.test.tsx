import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Hamburger from './Hamburger';

describe('<Hamburger />', () => {
  test('it should mount', () => {
    render(<Hamburger />);
    
    const hamburger = screen.getByTestId('Hamburger');

    expect(hamburger).toBeInTheDocument();
  });
});