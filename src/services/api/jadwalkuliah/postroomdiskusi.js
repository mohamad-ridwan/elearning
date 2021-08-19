import axios from "axios"
import endpoint from "../endpoint"

const PostRoomDiskusi = (path, data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${endpoint}/${path}`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

export default PostRoomDiskusi;