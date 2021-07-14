import axios from "axios"
import endpoint from "../endpoint"

const PutEmailOnly = (path, data) => {
    return new Promise((resolve, reject) => {
        axios.put(`${endpoint}/${path}`, data)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
};

export default PutEmailOnly;