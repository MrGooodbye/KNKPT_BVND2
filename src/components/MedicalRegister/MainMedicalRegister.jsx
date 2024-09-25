import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//context
import { UserContext } from '../../context/UserContext';
//mui theme
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
//modal
import SelectedDoctorExamining from '../ManageSelectedDoctorExamining/SelectedDoctorExamining';
//components
import ListPatientsRegister from './ListPatientsRegister';
import BookMedical from './BookMedical';
//api
import { getCurrentDoctorExamining } from '../../Service/MedicalService';

function MainMedicalRegister() {

  const { user, loading } = useContext(UserContext);

  const history = useHistory();

  const [component1Loading, setComponent1Loading] = useState(true);

  const [completeMedicalRegister, setCompleteMedicalRegister] = useState(false);
  const [dataPantientAppointmentsToday, setDataPantientAppointmentsToday] = useState();

  const [handleResetField, setHandleResetField] = useState(false); //F2
  const [handleOpenModalExaminingSession, setHandleOpenModalExaminingSession] = useState(false); //F4
  const [handleOpenModalOldDisease, setHandleOpenModalOldDisease] = useState(false); //F8

  const handleF2Press = () => {
    setHandleOpenModalExaminingSession(true);
  }

  const handleF4Press = () => {
    setHandleResetField(true);
  }

  const handleF8Press = () => {
    setHandleOpenModalOldDisease(true);
  }

  useEffect(() => {
    if(loading === false && user.isLogin){
      if(user.positionName !== 'Nursing'){
        history.push('/404');
      }
    }
  }, [loading, user])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if(event.keyCode === 113){
        event.preventDefault()
        //nhấn F2 để đăng ký khám
        handleF2Press();
      }
      else if(event.keyCode === 115){
        event.preventDefault()
        //nhấn F4 để reset các input field 
        handleF4Press();
      }
      else if(event.keyCode === 119){
        event.preventDefault()
        //nhấn F8 để tìm bệnh cũ
        handleF8Press();
      }
      else{

      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
         <Container maxWidth="xl" sx={{mt: 2.5}}>
            <Box sx={{ bgcolor: '#fff', height: 'auto'}} >
              <Grid container spacing={0} sx={{marginLeft: 0}}>
                <Grid item xs={5}>  
                  <ListPatientsRegister 
                    completeMedicalRegister={completeMedicalRegister} setCompleteMedicalRegister={setCompleteMedicalRegister}
                    component1Loading={component1Loading} setComponent1Loading={setComponent1Loading}
                    dataPantientAppointmentsToday={dataPantientAppointmentsToday} setDataPantientAppointmentsToday={setDataPantientAppointmentsToday}
                  />
                </Grid>
            
                <Grid item xs={7} >
                  {component1Loading ?
                    <div style={{marginLeft: '18px'}}>
                      <Skeleton variant='rectangular' width="100%" height={590} />
                    </div>
                  :
                    <BookMedical 
                      onF2Press={handleOpenModalExaminingSession} setOnF2Press={setHandleOpenModalExaminingSession}
                      onF4Press={handleResetField} setOnF4Press={setHandleResetField}
                      onF8Press={handleOpenModalOldDisease} setOnF8Press={setHandleOpenModalOldDisease}
                      completeMedicalRegister={completeMedicalRegister} setCompleteMedicalRegister={setCompleteMedicalRegister}
                      dataPantientAppointmentsToday={dataPantientAppointmentsToday} setDataPantientAppointmentsToday={setDataPantientAppointmentsToday}
                    />
                  }
                </Grid>
              </Grid>
            </Box>
         </Container>

         {/* <SelectedDoctorExamining 
          openSelectedDoctorExaminingModal={openSelectedDoctorExaminingModal} setOpenSelectedDoctorExaminingModal={setOpenSelectedDoctorExaminingModal}
          currentDoctorExamining={currentDoctorExamining} setCurrentDoctorExamining={setCurrentDoctorExamining}
         /> */}
    </>
  )
}

export default MainMedicalRegister