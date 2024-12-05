import {useAppDispatch, useAppSelector} from "./rtk.ts";
import {postSigninThunk, signout} from "../slices/signinSlice.ts";
import {Cookies} from "react-cookie";
import {ISigninParam} from "../types/iadminlogin.ts";

const cookies = new Cookies();

const loadCookie = () => {

    const adminloginCookie = cookies.get("adminlogin");

    return adminloginCookie
}


const useSignin = () => {

    const dispatch = useAppDispatch()
    let adminlogin = useAppSelector(state => state.signin)

    if(!adminlogin.adminId){
        adminlogin = loadCookie()
    }

    const doSignin = (param:ISigninParam) => {
        dispatch(postSigninThunk(param))
            .unwrap()
            .then( data => {
                console.log("unwrap")
                console.log(data)
                cookies.set("adminlogin", data, {path:"/"})
            })
    }

    const doSignout = () => {

        dispatch(signout())
        cookies.remove("adminlogin", {path:"/"})
    }

    return {adminlogin, doSignin, doSignout}
}


export default useSignin