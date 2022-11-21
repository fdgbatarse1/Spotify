import avatarHelper from '@/lib/avatarHelper';
import { Session } from 'next-auth';

describe('Testing avatarHelper', () => {

    const session: Session = {
        expires: ''
    }
    
  it('should return valid avatar', () => {
    const expected = {
        name: 'User',
        src: '/images/profile.png',
        alt: 'User avatar',
      };

    const res = avatarHelper({ session: session });
    expect(res).toMatchObject(expected);
  });
});
