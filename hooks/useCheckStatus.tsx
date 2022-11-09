import React from 'react';

import Error from '@/components/Error';
import Loading from '@/components/Loading';

import { Status } from '@/lib/enums';

const useCheckStatus = (status: Status, error: string, children?: React.ReactNode) => {
  const render = {
    [Status.PENDING]: <Loading />,
    [Status.REJECTED]: <Error error={error}>{children}</Error>,
  };

  if (status !== Status.FULFILLED) {
    return render[status];
  }
};

export default useCheckStatus;
