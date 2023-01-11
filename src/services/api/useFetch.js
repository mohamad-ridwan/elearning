import endpoint from "./endpoint"

async function useGetFetch(path, method, token, data){
    return await new Promise((resolve, reject)=>{
        fetch(`${endpoint}/${path}`, {
            method: method,
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "accessToken": token
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(res=>resolve(res))
        .catch(err=>reject(err))
    })
}

export default useGetFetch