
export interface IApplierList {
    ano: number;
    name: string;
    bizNo: string;
    regDate: string;
    regStatus: string;
}

export interface IApplierRead {
    ano: number;

    bizNo:string;
    openDate: string;
    name: string;
    email: string;

    applierStatus: string;

    attachFileNames: string[];

    regDate: string;
}
