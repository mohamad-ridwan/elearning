import endpoint from "../endpoint"

function DeleteManyTokendb(path, data){
    return new Promise((resolve, reject)=>{
        fetch(`${endpoint}/${path}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res=> res.json())
        .then(res=>resolve(res))
        .catch(err=>reject(err))
    })
}

export default DeleteManyTokendb