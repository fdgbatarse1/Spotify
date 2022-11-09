import { useCallback } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { Status } from '@/lib/enums';

import useAsync from '@/hooks/useAsync';

describe('Testing useAsync', () => {
  it('should be defined', () => {
    expect(useAsync).toBeDefined();
  });

  describe('a success', () => {
    let callCount = 0;

    const resolver = async () => {
      callCount++;
      return;
    };

    it('should start loading', async () => {
      callCount = 0;
      const hook = renderHook(() => useAsync(resolver));
      expect(hook.result.current.status).toEqual(Status.PENDING);
      await hook.waitForNextUpdate();
    });

    it('resolves', async () => {
      callCount = 0;
      const hook = renderHook(() => useAsync(resolver));
      await hook.waitForNextUpdate();

      expect(callCount).toEqual(1);
      expect(hook.result.current.status).toEqual(Status.FULFILLED);
    });
  });

  describe('an error instance of Error', () => {
    let callCount = 0;

    const rejected = async () => {
      callCount++;
      throw new Error('testing error instance of Error');
      return;
    };

    it('should start loading', async () => {
      callCount = 0;
      const hook = renderHook(() => useAsync(rejected));
      expect(hook.result.current.status).toEqual(Status.PENDING);
      await hook.waitForNextUpdate();
    });

    it('rejected with instance of Error', async () => {
      callCount = 0;
      const hook = renderHook(() => useAsync(rejected));
      await hook.waitForNextUpdate();

      expect(callCount).toEqual(1);
      expect(hook.result.current.status).toEqual(Status.REJECTED);
      expect(hook.result.current.error).toEqual('testing error instance of Error');
    });
  });

  describe('an error type string', () => {
    let callCount = 0;

    const rejected = async () => {
      callCount++;
      throw 'testing error of type string';
      return;
    };

    it('should start loading', async () => {
      callCount = 0;
      const hook = renderHook(() => useAsync(rejected));
      expect(hook.result.current.status).toEqual(Status.PENDING);
      await hook.waitForNextUpdate();
    });

    it('rejected with instance of Error', async () => {
      callCount = 0;
      const hook = renderHook(() => useAsync(rejected));
      await hook.waitForNextUpdate();

      expect(callCount).toEqual(1);
      expect(hook.result.current.status).toEqual(Status.REJECTED);
      expect(hook.result.current.error).toEqual('testing error of type string');
    });
  });
});
