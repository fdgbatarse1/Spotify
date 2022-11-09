import { withAuth } from 'next-auth/middleware';

import { Routes } from '@/lib/enums';

export default withAuth({
  pages: {
    signIn: Routes.LOGIN,
  },
});
