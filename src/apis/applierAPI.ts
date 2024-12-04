import axios from "axios";


const host = "http://localhost:8080/api/association/applier"

export const getApplierList = async (page?:number, size?:number) => {
    const pageValue = page || 1
    const sizeValue = size || 10

    const res = await axios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`)

    return res.data
}

export const getApplier = async (ano:number) => {
    const res = await axios.get(`${host}/read/${ano}`)

    return res.data
}

export const registryApplier = async (formData: FormData) => {
    const res = await axios.post(`${host}`, formData)

    return res.data
}

export const modifyApplierStatus = async (ano: number, status: number) => {
    const req = {
        ano: ano,
        status: status
    }
    const res = await axios.put(`${host}/modify`, req)

    return res.data
}

export const checkApplierAuth = async (ano: number, email: string, authCode:string) => {
    const req = {
        ano: ano,
        email: email,
        authCode: authCode,
    }
    const res = await axios.post(`${host}/auth`, req)

    return res.data
}