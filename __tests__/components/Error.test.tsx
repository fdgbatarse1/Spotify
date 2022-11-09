import { render, screen } from '@testing-library/react';

import Error from '@/components/Error';

describe('error', () => {
  it('render content', () => {
    render(<Error error={''}>error</Error>);

    const error = screen.getByText(/error/i);

    expect(error).toBeInTheDocument();
  });
});
