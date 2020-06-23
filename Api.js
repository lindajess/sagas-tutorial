import axios from 'axios'

const Api = {
    get: (url, config = {}) => {
        return axios.get(url, config)
    }
}

export default Api