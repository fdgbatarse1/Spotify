import { render, screen } from '@testing-library/react';

import HorizontalList from '@/components/HorizontalList';
import Card from '@/components/Card';

describe('horizontal list', () => {
  it('render content', () => {
    const data = [
      {
        image:
          'https://seed-mix-image.spotifycdn.com/v6/img/artist/4q3ewBCX7sLwd24euuV69X/en/default',
        title: 'Bad Bunny Mix',
        content: 'Rauw Alejandro, Sech, J Balvin',
      },
      {
        image:
          'https://seed-mix-image.spotifycdn.com/v6/img/artist/4VMYDCV2IEDYJArk749S6m/en/default',
        title: 'Daddy Yankee Mix',
        content: 'Arcangel, Lenny Tavárez, Ozuna',
      },
      {
        image:
          'https://seed-mix-image.spotifycdn.com/v6/img/artist/33ScadVnbm2X8kkUqOkC6Z/en/default',
        title: 'Don Omar Mix',
        content: 'Daddy Yankee, Nicky Jam, Zion & lennox',
      },
    ];

    render(
      <HorizontalList title={'Test horizontal list'} href={'/test-horizontal-list'}>
        {data.map((item) => (
          <Card
            key={item.title}
            image={item.image}
            title={item.title}
            content={item.content}
            href={'/'}
            minWidth={false}
          />
        ))}
      </HorizontalList>,
    );

    const image1 = screen.getByRole('img', { name: data[0].title });
    const title1 = screen.getByRole('heading', { name: data[0].title });
    const content1 = screen.getByText(data[0].content);

    const image2 = screen.getByRole('img', { name: data[1].title });
    const title2 = screen.getByRole('heading', { name: data[1].title });
    const content2 = screen.getByText(data[1].content);

    const image3 = screen.getByRole('img', { name: data[2].title });
    const title3 = screen.getByRole('heading', { name: data[2].title });
    const content3 = screen.getByText(data[2].content);

    expect(image1).toBeInTheDocument();
    expect(image2).toBeInTheDocument();
    expect(image3).toBeInTheDocument();
    expect(title1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
    expect(title3).toBeInTheDocument();
    expect(content1).toBeInTheDocument();
    expect(content2).toBeInTheDocument();
    expect(content3).toBeInTheDocument();
  });
});
