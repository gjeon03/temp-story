import { faker } from "@faker-js/faker";

export const generateParagraph = () => {
  return `${faker.lorem.sentences(5)}\n\n${faker.lorem.sentences(4)}\n\n${faker.lorem.sentences(6)}`;
};
