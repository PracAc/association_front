export interface IAdminlogin {
    adminId: string;
    pw: string;
    accessToken: string;
    refreshToken: string;
    adminName: string;
}

export interface ISigninParam {
    adminId: string;
    pw: string;
}

export interface IErrorResponse {
    status: number;
    message: string;
}