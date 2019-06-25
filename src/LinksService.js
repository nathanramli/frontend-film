import axios from 'axios';
// Additional
import {API_URL} from './constants';

export default class LinksService{
    getLinks(id_film) {
        const url = `${API_URL}/api/link/${id_film}`;
        return axios.get(url).then(response => response.data);
    }
    createLink(link){
        const url = `${API_URL}/api/link/`;
        return axios.post(url,link);
    }    
    deleteLink(pk){
        const url = `${API_URL}/api/link_detail/${pk}`;
        return axios.delete(url);
    }
}