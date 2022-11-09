import { ISODateString } from 'next-auth';

interface IChildren {
  children: React.ReactNode;
}

interface IHref {
  href: string;
}

interface ICustomSession {
  data: {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
      accessTokenExpires?: number;
      refreshToken?: string;
      username?: string;
    };
    expires: ISODateString;
    error?: string | null;
  } | null;
}

export type { IChildren, IHref, ICustomSession };
