import axios from "axios";


const host = "http://localhost:8080/api/board"

const header = {
    headers: {
        'Content-Type': 'multipart/form-data', // 파일 전송 형식 지정
    }
}

export const postBoardAdd = async (formData: FormData):Promise<number> => {

    const res = await axios.post(`${host}`, formData, header)

    return res.data;
}

export const getBoardList = async (page?:number, size?:number,btype?:number) => {

    const pageValue:number = page || 1
    const sizeValue:number = size || 10
    const btypeValue:number = btype || 1

    const res = await axios.get(`${host}/list?btype=${btypeValue}&page=${pageValue}&size=${sizeValue}`)
    return res.data;
}

export const getBoardRead = async (bno:number) => {
    const res = await axios.get(`${host}/read/${bno}`)
    return res.data;
}

export const putBoardEdit = async (bno:number, formData: FormData):Promise<number> => {
    const res = await axios.put(`${host}/edit/${bno}`, formData, header)

    return res.data;
}

export const deleteBoard = async (bno:number) => {
    const res = await axios.put(`${host}/delete/${bno}`)
    return res.data;
}