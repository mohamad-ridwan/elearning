import endpoint from "../endpoint"

const GetVerifikasiToken = async (path, token) => {
    return await new Promise((resolve, reject) => {
        fetch(`${endpoint}/${path}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "accessToken": token
            }
        })
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

export default GetVerifikasiToken;