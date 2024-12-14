import axios from "axios";
import jwtAxios from "../util/jwtUtil.ts";

const host = "http://3.36.52.117:8080/api/association/applier"

export const getApplierList = async (page?: number, size?: number, filters?: {
    bizNo: string;
    regStatus: string;
    ano: string;
    name: string;
    regDate: string
}) => {
    const pageValue = page || 1;
    const sizeValue = size || 10;

    // filters가 존재한다면, 이를 쿼리 문자열로 변환
    const queryParams = new URLSearchParams();

    // page와 size 값 추가
    queryParams.append('page', String(pageValue));
    queryParams.append('size', String(sizeValue));

    // filters의 각 항목을 쿼리 파라미터에 추가
    if (filters) {
        for (const [key, value] of Object.entries(filters)) {
            if (value) {
                queryParams.append(key, String(value));  // 필터 값이 존재할 때만 추가
            }
        }
    }
    console.log(queryParams)

    const res = await jwtAxios.get(`${host}/list?${queryParams.toString()}`);
    return res.data;
};

export const getApplier = async (ano:number) => {
    const res = await jwtAxios.get(`${host}/read/${ano}`)

    return res.data
}

export const registryApplier = async (formData: FormData) => {
    const res = await axios.post(`${host}/registry`, formData)

    return res.data
}

export const modifyApplierStatus = async (ano: number, status: number, rejectReason?: string) => {
    const req: { ano: number; status: number; rejectReason?: string } = {
        ano: ano,
        status: status,
    };

    // status가 2일 경우에만 rejectReason을 포함
    if (status === 2 && rejectReason) {
        req.rejectReason = rejectReason;
    }
    const res = await jwtAxios.put(`${host}/modify`, req)

    return res.data
}

export const checkApplierAuth = async (ano: number, email: string, authCode:string) => {
    const req = {
        ano: ano,
        email: email,
        authCode: authCode,
    }
    const res = await jwtAxios.post(`${host}/auth`, req)

    return res.data
}

export const sendEmailAuth = async  (email: string) => {

    const res = await axios.post(`${host}/auth/email`, {email})

    return res.data
}

export const checkEmailAuth = async (email: string, authCode: string) => {
    const res = await axios.post(`${host}/auth/emailchk`, {email, authCode})

    return res.data
}