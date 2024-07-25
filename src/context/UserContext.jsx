import React, { useState, useEffect } from 'react';
//modal
import AlertProcessingBackdrop from '../components/ManageAlertProcessingBackdrop/AlertProcessingBackdrop';
//api
import { getUserLogin } from '../Service/UserService';

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {

    const userDefault = {
        isAuthenticated: false,
        isLogin: false,
        token: "",
    };

    const [user, setUser] = useState(userDefault);
    const [openAlertProcessingBackdrop, setOpenAlertProcessingBackdrop] = useState(false);

    const loginContext = (userContextLogin) => {
        setUser({ ...userContextLogin });
    };

    const logoutContext = () => {
        setUser({ ...userDefault });
    }

    const fetchUser = async () => {
        setOpenAlertProcessingBackdrop(true);
        const response = await getUserLogin();
        setUser({
            isAuthenticated: true, 
            isLogin: true,
            userId: response.userId,
            userFullName: response.userFullName,
            positionName: response.positionName
        })
        setOpenAlertProcessingBackdrop(false);
    }

    const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
          return null;
        }
    };

    const checkJWTExpire = () => {
        let result = false;
        let getJWT = localStorage.getItem('jwt');
        if(getJWT){
            let decodeJWT = parseJwt(getJWT);
            let currentDate  = new Date();

            if(decodeJWT.exp * 1000 < currentDate.getTime()) {
                //console.log('Token đã hết hạn hoặc không tồn tại')
                localStorage.removeItem('jwt'); //xóa localStorage
                return result 
            }
            else{
                //console.log('token còn hạn');
                result = true;
                return result
            }
        }
        else{
            return result
        }
    }

    useEffect(() => {
        const result = checkJWTExpire();
        if(result){
            fetchUser();
        }else{
            //không có token
            setUser(userDefault);
        }
    }, [])

    return (
        <>
            <UserContext.Provider value={{ user, loginContext, logoutContext }}>
                {children}
            </UserContext.Provider>

            <AlertProcessingBackdrop 
                openAlertProcessingBackdrop={openAlertProcessingBackdrop}
                alertTitle={'Đang tải thông tin người dùng'}
            />
        </>
    )
}

export { UserContext, UserProvider }
