test("Esta pruba no debe de fallar", () => {
  const message = "Hola Mundo  ";

  const message2 = message.trim();

  expect(message).toBe(message2);
});
