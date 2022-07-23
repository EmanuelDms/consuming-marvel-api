import axios from "axios";
import { Comic, MarvelAPIResponse } from "@comics/types";

const marvelApi = axios.create({
  baseURL: "https://gateway.marvel.com",
});

const publicKey = "18c3565c7bd9c5135a40a7f4783e1119";
const hash = "08bf0626948e98ddab889dbfc4640230";
const ts = 1;

const marvelAuth = {
  queryString: `ts=${ts}&hash=${hash}&apikey=${publicKey}`,
};

const marvelRoutes = {
  comics: {
    findAll: `/v1/public/comics?${marvelAuth.queryString}`,
    findOne: (comicId: number) =>
      `/v1/public/comics/${comicId}?${marvelAuth.queryString}`,
    findComicCharacters: (comicId: number) =>
      `/v1/public/comics/${comicId}/characters?${marvelAuth.queryString}`,
  },
};

const marvel = {
  api: marvelApi,
  authStrings: marvelAuth,
  routes: marvelRoutes,
  async findAllComics() {
    return await this.api.get<MarvelAPIResponse<Comic>>(
      this.routes.comics.findAll
    );
  },
  async findOneComic(comicId: number) {
    return await this.api.get(this.routes.comics.findOne(comicId));
  },
  async findComicCharacters(comicId: number) {
    return await this.api.get(this.routes.comics.findComicCharacters(comicId));
  },
};

export { marvel };
