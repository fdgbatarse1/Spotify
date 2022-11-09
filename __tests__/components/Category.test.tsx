import { render, screen } from '@testing-library/react';

import Category from '@/components/Category';

describe('category', () => {
  it('render content', () => {
    render(
      <Category icon='https://t.scdn.co/images/8ae48f1246e14df78876c9b367724017' name='House' minWidth={false} />,
    );

    const icon = screen.getByRole('img', { name: /House/i });
    const name = screen.getByText(/House/i);

    expect(icon).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });
});
