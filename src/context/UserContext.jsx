import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//modal
import AlertProcessingBackdrop from '../components/ManageAlertProcessingBackdrop/AlertProcessingBackdrop';

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {

    const history = useHistory();

    const userDefault = {
        isAuthenticated: false,
        isLogin: false,
        token: "",
    };

    const [user, setUser] = useState(userDefault);

    const [loading, setLoading] = useState(true);

    const [alertVisible, setAlertVisible] = useState(false);
    const [isLogOutClick, setIsLogOutClick] = useState(false);
    const [onConfirm, setOnConfirm] = useState(null);

    const [openAlertProcessingBackdrop, setOpenAlertProcessingBackdrop] = useState(false);

    const [isDialogChangePasswordOpen, setIsDialogChangePasswordOpen] = useState(false);

    const [isOldDiseaseWithNullCodeWard, setIsOldDiseaseWithNullCodeWard] = useState(false);

    const loginContext = (userContextLogin) => {
        setUser({ ...userContextLogin });
        setLoading(false);
    };

    const triggerAlert = (confirmCallback) => {
        setAlertVisible(true);
        setIsLogOutClick(true);
        setOnConfirm(() => confirmCallback);
    };

    const confirmAlert = () => {
        if (onConfirm) onConfirm();
        setIsLogOutClick(false);
        resetAlert();
    };

    const resetAlert = () => {
        setAlertVisible(false);
        setIsLogOutClick(false);
        setOnConfirm(null);
    };

    const logoutContext = () => {
        setUser({ ...userDefault });
    }

    const loadingContext = (loading) => {
        setLoading(...loading);
    }

    // const fetchUser = async () => {
    //     setOpenAlertProcessingBackdrop(true);
    //     const response = await getUserLogin();
    //     setUser({
    //             isAuthenticated: true, 
    //             isLogin: true,
    //             userId: response.userId,
    //             userFullName: response.userFullName,
    //             positionName: response.positionName
    //         }) 
    //     setLoading(false);
    //     setOpenAlertProcessingBackdrop(false);
    // }

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
            let currentDate = new Date();
            if(decodeJWT.exp * 1000 < currentDate.getTime()) {
                //console.log('Token đã hết hạn hoặc không tồn tại')
                localStorage.removeItem('jwt'); //xóa localStorage
                localStorage.removeItem('userLogin');
                sessionStorage.clear();
                return result 
            }
            else{
                //console.log('token còn hạn');
                result = true;
                return result
            }
        }
        else{
            localStorage.removeItem('userLogin');
            return result
        }
    }

    useEffect(() => {
        setLoading(true);
        const getUserLogin = JSON.parse(localStorage.getItem('userLogin'));
        const getToken = localStorage.getItem('jwt')
        if(getUserLogin && getToken){
            const result = checkJWTExpire();
            if(result){
                setUser(getUserLogin);
            }
            else if(result === false){
                setUser(userDefault);
            }
        }else{
            localStorage.removeItem('jwt'); //xóa localStorage
            localStorage.removeItem('userLogin');
            setUser(userDefault);
        }
        setLoading(false);
    }, [])

    return (
        <>
            <UserContext.Provider 
                value={{ user, loading, loadingContext, loginContext, 
                    logoutContext, alertVisible, triggerAlert, confirmAlert, resetAlert, isLogOutClick,
                    isDialogChangePasswordOpen, setIsDialogChangePasswordOpen,
                    isOldDiseaseWithNullCodeWard, setIsOldDiseaseWithNullCodeWard
                }}>
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
