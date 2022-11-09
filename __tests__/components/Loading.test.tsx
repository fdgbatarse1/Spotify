import { render, screen } from '@testing-library/react';

import Loading from '@/components/Loading';

describe('loading', () => {
  it('render content', () => {
    render(<Loading />);

    const loading = screen.getByText(/loading/i);

    expect(loading).toBeInTheDocument();
  });
});
