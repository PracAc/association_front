
export interface IApplierList {
    ano: number;
    name: string;
    regDate: string;
    regStatus: string;
}

export interface IApplierRead {
    ano: number;

    name: string;
    email: string;

    zipcode: string;
    roadAddr: string;
    lotNumAddr: string;
    detailAddr: string;
    addrEtc: string;
    applierStatus: string;

    attachFileNames: string[];

    regDate: string;
}