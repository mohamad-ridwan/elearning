import endpoint from "../endpoint";

const PutAuthKomentar = (path, data) => {
    return new Promise((resolve, reject) => {
        fetch(`${endpoint}/${path}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

export default PutAuthKomentar;