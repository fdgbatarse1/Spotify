import { render, screen } from '@testing-library/react';

import LoadingSection from '@/components/LoadingSection';

describe('loading', () => {
  it('render content', () => {
    render(<LoadingSection />);

    const loading = screen.getByText(/loading/i); 
    expect(loading).toBeInTheDocument();
  });
});
