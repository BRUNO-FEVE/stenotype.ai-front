import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://upload-ai-back.vercel.app/'
})

