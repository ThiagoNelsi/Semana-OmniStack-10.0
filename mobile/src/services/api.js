import axios from 'axios'

const api = axios.create({
    baseURL: 'https://3333-e257db4e-e29d-4378-ac44-3ee8ba73df14.ws-us02.gitpod.io:443'
})

export default api