import axios from 'axios';
// Additional
import {API_URL} from './constants';

export default class FilmsService{

    // constructor(){}
    getFilmByJudul(judul){
        const url = `${API_URL}/api/film_by_judul/${judul}`;
        return axios.get(url).then(response => response.data);
    }
    getFilmByKode(kode){
        const url = `${API_URL}/api/film_by_kode/${kode}`;
        return axios.get(url).then(response => response.data);
    }
    getFilms() {
        const url = `${API_URL}/api/film/`;
        return axios.get(url).then(response => response.data);
    }
    getFilmsLimitEnam() {
        const url = `${API_URL}/api/film_limit_enam/`;
        return axios.get(url).then(response => response.data);
    }
    getFilmsByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getFilm(pk) {
        const url = `${API_URL}/api/film/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteFilm(film){
        const url = `${API_URL}/api/film/${film.pk}`;
        return axios.delete(url);
    }
    createFilm(film){
        const url = `${API_URL}/api/film/`;
        return axios.post(url,film);
    }
    updateFilm(film){
        const url = `${API_URL}/api/film/${film.pk}`;
        return axios.put(url,film);
    }
}