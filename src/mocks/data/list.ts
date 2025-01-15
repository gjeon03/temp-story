import { faker } from "@faker-js/faker";

// Generate random coordinates near Yaletown, Vancouver
const generateRandomCoordinates = () => {
  const baseLat = 49.2768; // Approximate latitude for Yaletown
  const baseLng = -123.121; // Approximate longitude for Yaletown

  return {
    lat: parseFloat((baseLat + (Math.random() - 0.5) * 0.1).toFixed(6)),
    lng: parseFloat((baseLng + (Math.random() - 0.5) * 0.1).toFixed(6)),
  };
};

// Generate a single mock blog post
const generateMockPost = (
  index: number,
  coordinates: {
    lat: number;
    lng: number;
  },
) => {
  return {
    postId: index,
    title: `${faker.lorem.sentence(3)}`,
    ogText: `**${faker.lorem.sentence()}**\n\n${faker.lorem.paragraph(2)}`,
    aiGenText: `**${faker.lorem.sentence()}**\n\n${faker.lorem.paragraph(2)}`,
    password: "123",
    rgstDtm: faker.date.past().toISOString().replace("T", " ").split(".")[0],
    chngDtm: null,
    thumbHash: {
      thumbGeoLong: coordinates.lng.toString(),
      thumbImgPath: "/image" + Math.floor(Math.random() * 5 + 1) + ".jpeg",
      thumbImgId: index.toString(),
      thumbGeoLat: coordinates.lat.toString(),
    },
  };
};

// Generate 100 mock posts
export const generateMockData = () => {
  const mockData = [];

  for (let i = 1; i <= 100; i++) {
    const coordinates = generateRandomCoordinates();
    mockData.push(generateMockPost(i, coordinates));
  }

  return mockData;
};
