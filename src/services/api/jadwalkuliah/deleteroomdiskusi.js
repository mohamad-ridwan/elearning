import endpoint from "../endpoint"

const DeleteRoomDiskusi = (path) => {
    return new Promise((resolve, reject) => {
        fetch(`${endpoint}/${path}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

export default DeleteRoomDiskusi