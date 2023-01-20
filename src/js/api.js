'use strict';
import axios from 'axios';

export class FilmsApi {
        static BASE_URL = 'https://api.themoviedb.org/3/';
        static API_KEY = '56d4ceaf5914372ad31f8531463bd1af';

    constructor() {
        this.page = 1;
        this.query = null;
    }

    fetchTrendingFilms() {
    const searchParams = {
    params: {
        _page: this.page,
        api_key: FilmsApi.API_KEY,
    },
    };

    return axios.get(`${FilmsApi.BASE_URL}trending/movie/week`, searchParams);
        
    }

    fetchFilmsByQuery() {
    const searchParams = {
    params: {
        _page: this.page,
        api_key: FilmsApi.API_KEY,
        query: this.query,
    },
    };

    return axios.get(`${FilmsApi.BASE_URL}search/movie`, searchParams);
        
    }

    fetchGenres() {
        const searchParams = {
        params: {
        _page: this.page,
        api_key: FilmsApi.API_KEY,
    },
    };

    return axios.get(`${FilmsApi.BASE_URL}genre/movie/list`, searchParams);
        
    }


}