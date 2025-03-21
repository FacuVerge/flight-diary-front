import axios from 'axios';
import { Diary, NewDiary } from './types'

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = async () => {
    const response = await axios.get<Diary[]>(baseUrl);
    return response.data;
}

export const createDiary = (content: NewDiary) => {
    return axios.post<Diary>(baseUrl, content);    
}