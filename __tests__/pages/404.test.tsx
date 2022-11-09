import { render, screen } from '@testing-library/react';

import NotFound from '@/pages/404';

describe('404', () => {
  it('render content', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading', {
      name: /page not found/i,
    });
    const paragraph = screen.getByText(/We can\'t seem to find the page you are looking for/i);
    const button = screen.getByRole('button', { name: /home/i });

    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
