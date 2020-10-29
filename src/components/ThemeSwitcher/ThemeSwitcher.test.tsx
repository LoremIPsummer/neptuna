import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ThemeSwitcher from './ThemeSwitcher';

describe('<ThemeSwitcher />', () => {
  test('it should mount', () => {
    render(<ThemeSwitcher />);
    
    const themeSwitcher = screen.getByTestId('ThemeSwitcher');

    expect(themeSwitcher).toBeInTheDocument();
  });
});