import Home from '@/app/(main)/page';
import { render, screen } from '@testing-library/react';

describe('Home page - Rendering', () => {
  it('Should render the Home Page', () => {
    render(<Home />);
    screen.getByText('Home Page');
  });
});