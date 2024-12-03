
export interface IApplierList {
    ano: number;
    name: string;
    regDate: string;
    regStatus: string;
}

export interface IApplierRead {
    ano: number;

    bizNo:number;
    openDate: string;
    name: string;
    email: string;

    applierStatus: string;

    attachFileNames: string[];

    regDate: string;
}