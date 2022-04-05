import axios from "axios";

const TARIFF_REST_API_URL = 'http://localhost:8080/tariffs';

class TariffService {
    getTariffs(){
        return axios.get(TARIFF_REST_API_URL);
    }
}

export default new TariffService();