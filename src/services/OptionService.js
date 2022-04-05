import axios from "axios";

const OPTION_REST_API_URL = 'http://localhost:8080/options';

class OptionService {
    getOptions(){
        return axios.get(OPTION_REST_API_URL);
    }
}

export default new OptionService();