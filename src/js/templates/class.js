'use strict';
import axios from 'axios';

export class FilmsApi {
        static BASE_URL = 'https://api.themoviedb.org/3/';
        static API_KEY = '56d4ceaf5914372ad31f8531463bd1af';

    constructor() {
        this.page = 1;
        this.query = null;
        this._setupGenresObject();
        this.filmId = null;
        
    }
    _setupGenresObject() {
        this.fetchGenres().then(({ data }) => {
        const genresInfo = data.genres;
        const genresList = data.genres;
        this.genresObject = genresInfo.reduce((acum, { id, name }) => ({ ...acum, [id]: name }), {});            
    })
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

    getInfoByOneFilm() {
        // return fetch(`https://api.themoviedb.org/3/movie/${this.filmId}?api_key=${FilmsApi.API_KEY}`)
        return fetch(`https://api.themoviedb.org/3/movie/343611?api_key=${FilmsApi.API_KEY}`)
            .then(response => {
                // console.log(response.json());
                return response.json();
            })
            .catch(error => {
            console.log(error);
        })
    }
}


