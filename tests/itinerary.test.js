import { it, describe } from "vitest";
import request from "supertest";
import { app } from "../app";

// je décris sur quel endpoint je tape
describe("GET /products/c59dbeb2-21da-44ac-9ff4-4b003992c39f", () => {
  // on décrit ensuite ce qu'on teste
  it("responds with the correct JSON data", () => {
    return request(app)
      .get("/v1/itinerary/c59dbeb2-21da-44ac-9ff4-4b003992c39f")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200, {
        id: "c59dbeb2-21da-44ac-9ff4-4b003992c39f",
        prompt: "voyage entre Tokyo et Osaka",
        iaResponse: [
          {
            name: "Tokyo",
            location: {
              latitude: 35.6895,
              longitude: 139.6917,
            },
            description:
              "Capitale du Japon, Tokyo est une métropole animée connue pour ses gratte-ciels, ses temples et ses sanctuaires. Explorez les quartiers branchés comme Shibuya et Harajuku, le marché aux poissons de Tsukiji et le quartier historique d'Asakusa.",
          },
          {
            name: "Hakone",
            location: {
              latitude: 35.1999,
              longitude: 139.1114,
            },
            description:
              "Hakone est une station thermale située dans les montagnes près du mont Fuji. Il est célèbre pour ses sources chaudes, ses vues panoramiques et son musée en plein air Hakone Open-Air Museum.",
          },
          {
            name: "Nagoya",
            location: {
              latitude: 35.1808,
              longitude: 136.9064,
            },
            description:
              "Nagoya est la quatrième plus grande ville du Japon. Elle est connue pour son château, le Nagoya Castle, et son centre commercial, le Nagoya Station Building.",
          },
          {
            name: "Kyoto",
            location: {
              latitude: 35.0112,
              longitude: 135.7683,
            },
            description:
              "Kyoto est une ville historique, célèbre pour ses temples bouddhistes, ses sanctuaires shinto et ses jardins. Ne manquez pas le temple Kinkaku-ji, le Pavillon d'Or, et le Fushimi Inari Shrine, célèbre pour ses portes torii rouges.",
          },
          {
            name: "Nara",
            location: {
              latitude: 34.6839,
              longitude: 135.8001,
            },
            description:
              "Nara est une ville historique située près de Kyoto. Elle est connue pour son parc de Nara où vivent en liberté des cerfs, et pour son temple Todai-ji, qui abrite une statue géante de Bouddha.",
          },
          {
            name: "Osaka",
            location: {
              latitude: 34.6937,
              longitude: 135.5022,
            },
            description:
              "Osaka est une ville animée connue pour sa cuisine et son architecture. Découvrez le château d'Osaka, Osaka Aquarium Kaiyukan, et le quartier commerçant de Dotonbori.",
          },
        ],
        updated_at: "2024-04-19T07:23:50.777Z",
        created_at: "2024-04-19T07:23:50.777Z",
      });
  });
});

describe("GET /itinerary/12345", () => {
  // on décrit ensuite ce qu'on teste
  it("returns a 404 if itinerary does not exist", () => {
    return request(app)
      .get("/v1/itinerary/12345")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(404);
  });
});
