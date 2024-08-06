import React, { useState, useContext, useEffect, useRef } from 'react';
//mui theme
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
//mui icon
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
//modal
// import AlertConfirmModal from '../ManageAlertConfirm/AlertConfirm';
import AlertProcessing from '../ManageAlertProcessing/AlertProcessing';
//toast
import {toast} from 'react-toastify';
//api
import { createMedicalRegister, createMedicalBackRegister, getListMedicalExaminationsGiveRegister } from '../../Service/MedicalService';

function ExaminingSession(props) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [openAlertProcessing, setOpenAlertProcessing] = useState(false);

    const [listExaminingSession, setListExaminingSession] = useState(null);

    const onChangeRadioSelect = (value) => {
        props.dataPatientsRegister.examinationId = value;
        // if(props.isContinueSelectedExaminingSession === false){
        //     props.setIsContinueSelectedExaminingSession(true);
        // }
    }

    const handleListMedicalExaminationsGiveRegister = async () =>  {
        setOpenAlertProcessing(true);
        const response = await getListMedicalExaminationsGiveRegister(props.dataPatientsRegister.patient.dayOfBirth);
        setOpenAlertProcessing(false);
        setListExaminingSession(response);
    }

    const handleMedicalRegister = async () => {
        //bệnh cũ
        if(props.dataPatientsRegister.oldDisease === true){
            //là bênh mới đã đăng ký nhưng chưa từng khám bao giờ
            if(listExaminingSession.isAppointment === false){
                setIsConfirmOpen(false);
                setOpenAlertProcessing(true);
                const response = await createMedicalRegister(props.dataPatientsRegister);
                setOpenAlertProcessing(false);
                if(response.status === 200){
                    toast.success(response.data);
                    props.setIsContinueSelectedExaminingSession(false);
                    props.setCompleteMedicalRegister(true);
                    props.setOpenModalExaminingSession(false);
                    props.handleResetField();
                }
                else{
                    toast.error(response.data, {toastId: 'error1'});
                }
            }
            //có hẹn khám nhưng không nhắc khám hoặc đến trễ ngày hẹn khám
            else{
                setIsConfirmOpen(false);
                setOpenAlertProcessing(true);
                const response = await createMedicalBackRegister(props.dataPatientsRegister);
                setOpenAlertProcessing(false);
                if(response.status === 200){
                    toast.success(response.data);
                    props.setIsContinueSelectedExaminingSession(false);
                    props.setCompleteMedicalRegister(true);
                    props.setOpenModalExaminingSession(false);
                    props.handleResetField();
                }
                else{
                    toast.error(response.data, {toastId: 'error1'});
                }
            }
        }
        //bệnh mới
        else{
            setIsConfirmOpen(false);
            setOpenAlertProcessing(true);
            const response = await createMedicalRegister(props.dataPatientsRegister);
            setOpenAlertProcessing(false);

            if(response.status === 200){
                toast.success(response.data);
                props.handleResetField();
                props.setIsContinueSelectedExaminingSession(false);
                props.setCompleteMedicalRegister(true);
                props.setOpenModalExaminingSession(false);
            }
            else{
                toast.error(response.data, {toastId: 'error1'});
            }
        }
    }

    const handleCloseConfirm = () => {
        setIsConfirmOpen(false);
      };

    const handleOpenConfirm = () => {
        if(props.dataPatientsRegister.examinationId === ''){
            // setIsConfirmOpen(false);
            toast.error('Bạn chưa chọn kỳ khám', {toastId: 'error1'});
        }
        else{
            //setIsConfirmOpen(true);
            handleMedicalRegister();
        }
    };

    useEffect(() => {
        if(props.dataPatientsRegister.patient.dayOfBirth !== '' && props.openModalExaminingSession === true){
            handleListMedicalExaminationsGiveRegister();
        }
    }, [props.openModalExaminingSession])

    useEffect(() => {
        if(props.isContinueSelectedExaminingSession === true){
            //nhấn F2 để hoàn tất đăng ký khám
            handleOpenConfirm();
            props.setIsContinueSelectedExaminingSession(false);
        }
    }, [props.isContinueSelectedExaminingSession])

    return (
        <>
            {listExaminingSession ? 
                <>
                    <Dialog fullWidth={true} maxWidth={'sm'} open={props.openModalExaminingSession} disableEscapeKeyDown={true}>
                        <DialogTitle 
                            sx={{ fontWeight: 'bolder', fontSize: '20px', textAlign: 'center', color: 'green', textTransform: 'uppercase' }}>
                            {`${props.dataPatientsRegister.patient.fullName}, 
                            ${props.dataPatientsRegister.patient.gender === true ? 'Nam' : 'Nữ'}, 
                            ${listExaminingSession.monthsOfAge}`}
                        </DialogTitle>

                        <IconButton onClick={() => [props.setOpenModalExaminingSession(false), props.dataPatientsRegister.examinationId = '']} 
                            sx={{position: 'absolute', right: 5, top: 7}}>
                                <CloseIcon fontSize='medium'/>
                        </IconButton>

                        <DialogContent dividers sx={{pl: '0px', pr: '0px'}}>
                            <Grid container rowSpacing={0}>
                                <Grid item xs={0.5}/>

                                <Grid item xs={5.5}>
                                    <Box sx={{border: '2px solid black', p: 1, height: '50vh', overflow: 'auto'}}>
                                        <Typography variant='h6' sx={{fontWeight: 'bolder'}}>Lịch sử khám</Typography>
                                        {listExaminingSession.oldExams ?
                                            listExaminingSession.oldExams.map((oldExamItem, oldExamIndex) => (
                                                <Typography key={oldExamIndex} variant='subtitle1'>{oldExamItem.name}</Typography>
                                            ))
                                        :
                                            null
                                        }
                                    </Box>  
                                </Grid>

                                <Grid item xs={5.5}>
                                    <Box sx={{border: '2px solid red', p: 1, height: '50vh'}}>
                                        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                                            <Typography variant='h6' sx={{fontWeight: 'bolder', color: 'red'}}>Chọn kỳ khám</Typography>
                                            {listExaminingSession.exams && listExaminingSession.isAppointment === false ? 
                                                <RadioGroup onChange={(e) => onChangeRadioSelect(e.target.value)}>
                                                    {listExaminingSession.exams.map((examItem, examIndex) => (
                                                        <FormControlLabel key={examIndex} value={examItem.id} control={<Radio />} label={examItem.name} />
                                                    ))}
                                                </RadioGroup>
                                            :
                                                <RadioGroup onChange={(e) => onChangeRadioSelect(e.target.value)}>
                                                    {listExaminingSession.oldExams.map((examItem, examIndex) => (
                                                        <FormControlLabel key={examIndex} value={examItem.id} control={<Radio />} label={examItem.name} disabled={examIndex === 0 ? true : false}/>
                                                    ))}
                                                </RadioGroup>
                                            }
                                            <Button variant='contained' sx={{mt: 0.5}} onClick={() => handleOpenConfirm()}>Tiếp tục (F2)</Button> 
                                        </div>
                                    </Box>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                </>
            :
                null
            }

            {/* <AlertConfirmModal 
                openAlertConfirmModal={isConfirmOpen} onCloseAlertConfirmModal={handleCloseConfirm} 
                onConfirmAlertConfirmModal={handleMedicalRegister} 
                titleConfirm="Đăng ký khám cho bệnh nhân?"
            /> */}

            <AlertProcessing
                openAlertProcessing={openAlertProcessing} setOpenAlertProcessing={setOpenAlertProcessing}
            />
        </>
    )
}

export default ExaminingSession