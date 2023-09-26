import axios from 'axios'

export const api = axios.create({
    // baseURL: 'https://upload-ai-back.vercel.app/'  // --> PROD
    baseURL: "http://localhost:3333"    // --> DEV
})

