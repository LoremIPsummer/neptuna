import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProfilePage from './ProfilePage';

describe('<ProfilePage />', () => {
  test('it should mount', () => {
    render(<ProfilePage />);
    
    const profilePage = screen.getByTestId('ProfilePage');

    expect(profilePage).toBeInTheDocument();
  });
});