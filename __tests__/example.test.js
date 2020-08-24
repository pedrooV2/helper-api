function sum(a, b) {
  return a + b;
}

test('if i call sum function with 2 and 3 it should return 5', () => {
  expect(sum(2, 3)).toBe(5);
});
