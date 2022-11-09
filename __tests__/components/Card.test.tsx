import { render, screen } from '@testing-library/react';

import Card from '@/components/Card';

describe('card', () => {
  it('render content', () => {
    render(
      <Card
        image='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCyxbZF7_PK4nLiexj0kkCNg&psig=AOvVaw1Sh_srzrj_hjmYZSN1XX4e&ust=1650529611387000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCOCf9pacovcCFQAAAAAdAAAAABAD'
        title='Bachatéame'
        content='¡Esto sí es Bachata! Portada: Romeo Santos'
        href={'/'}
        minWidth={false}
      />,
    );

    const title = screen.getByRole('heading', {
      name: /bachatéame/i,
    });
    const content = screen.getByText(/Romeo Santos/i);

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
