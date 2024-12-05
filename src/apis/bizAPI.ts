import axios from "axios";
import {IBizChk} from "../types/applier/biz.ts";

const host = "https://api.odcloud.kr/api/nts-businessman/v1"
const serviceKey = import.meta.env.VITE_BIZ_SERVICE_KEY;

export const bizValidateChk = async (req: IBizChk) => {

    // API 호출 형태에 맞게 변환
    const request = {
        businesses: [
            {
                b_no: req.b_no,
                p_nm: req.p_nm,
                start_dt: req.start_dt.replace(/-/g, ''), // 정규식사용 날짜 하이픈 제거
            }
        ]}

    const res = await axios.post(`${host}/validate?serviceKey=${serviceKey}`, request)

    return res.data
}