import msToMinutesAndSeconds from '@/lib/msToMinutesAndSeconds';

describe('Testing msToMinutesAndSeconds', () => {
  it('should convert 3000 to 0:03', () => {
    const res = msToMinutesAndSeconds(3000);
    expect(res).toBe('0:03');
  });

  it('should convert 30000 to 0:30', () => {
    const res = msToMinutesAndSeconds(30000);
    expect(res).toBe('0:30');
  });

  it('should convert 300000 to 5:00', () => {
    const res = msToMinutesAndSeconds(300000);
    expect(res).toBe('5:00');
  });
});
