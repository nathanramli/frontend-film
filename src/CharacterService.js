import axios from 'axios';
// Additional
import {API_URL} from './constants';

export default class CharacterService{
    getChara(id_film) {
        const url = `${API_URL}/api/chara/${id_film}`;
        return axios.get(url).then(response => response.data);
    }

    deleteChara(pk) {
        const url = `${API_URL}/api/chara_detail/${pk}`;
        return axios.delete(url);
    }
}