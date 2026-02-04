describe('Email validation', () => {
  const cases = [
    ['a@gmail.com', true],
    ['invalid', false],
    ['test@test.com', true]
  ];

  cases.forEach(([email, expected]) => {
    it(email as string, () => {
      expect((email as string).includes('@')).toBe(expected);
    });
  });
});