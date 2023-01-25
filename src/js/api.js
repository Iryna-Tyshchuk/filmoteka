'use strict';
import axios from 'axios';

export class FilmsApi {
  static BASE_URL = 'https://api.themoviedb.org/3/';
  static API_KEY = '56d4ceaf5914372ad31f8531463bd1af';
  static IMAGE_PATH = `https://image.tmdb.org/t/p/w500/`;

  constructor() {
    this.page = 1;
    this.query = null;
    this._setupGenresObject();
  }
  _setupGenresObject() {
    this.fetchGenres().then(({ data }) => {
      const genresInfo = data.genres;
      const genresList = data.genres;
      this.genresObject = genresInfo.reduce(
        (acum, { id, name }) => ({ ...acum, [id]: name }),
        {}
      );
    });
  }

  fetchUpcomingFilms() {
    return axios.get(
      `${FilmsApi.BASE_URL}movie/upcoming?api_key=${FilmsApi.API_KEY}`
    );
  }

  fetchTrendingFilms() {
    const searchParams = {
      params: {
        page: this.page,
        api_key: FilmsApi.API_KEY,
      },
    };

    return axios.get(`${FilmsApi.BASE_URL}trending/movie/week`, searchParams);
  }

  fetchFilmsByQuery() {
    const searchParams = {
      params: {
        page: this.page,
        api_key: FilmsApi.API_KEY,
        query: this.query,
      },
    };

    return axios.get(`${FilmsApi.BASE_URL}search/movie`, searchParams);
  }

  fetchGenres() {
    const searchParams = {
      params: {
        page: this.page,
        api_key: FilmsApi.API_KEY,
      },
    };

    return axios.get(`${FilmsApi.BASE_URL}genre/movie/list`, searchParams);
  }

  getInfoByOneFilm(id) {
    // return fetch(`${FilmsApi.BASE_URL}movie/${id}?api_key=${FilmsApi.API_KEY}`)
    //   .then(response => {
    //     // console.log(response.json());
    //     return response.json();
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    return axios.get(
      `${FilmsApi.BASE_URL}movie/${id}?api_key=${FilmsApi.API_KEY}`
    );
  }

  async fetchTrailer(id) {
    // spinner?
    const responce = await fetch(
      `${FilmsApi.BASE_URL}/movie/${id}/videos?api_key=${FilmsApi.API_KEY}`
    );
    const data = await responce.json();
    // spinner?
    return data;
  }
}
