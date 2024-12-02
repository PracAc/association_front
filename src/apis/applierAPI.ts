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