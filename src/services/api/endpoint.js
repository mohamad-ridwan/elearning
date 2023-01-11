const endpoint = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_LOCAL : process.env.REACT_APP_API_PUBLIC

export default endpoint;