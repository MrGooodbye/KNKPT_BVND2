import React, { useState, useContext, useEffect, useRef } from 'react';
//modal
import AlertProcessing from '../ManageAlertProcessing/AlertProcessing';
//mui theme
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
//moment
import moment from 'moment';
//api
import { getVaccinationByPatientId } from '../../Service/MedicalService';

function OldDiseaseForRegister(props) {

    const [openAlertProcessing, setOpenAlertProcessing] = useState(false);

    const handleCloseOldDiseaseRegister = (event, reason) => {
        if(reason && reason === "backdropClick"){
            return;
        }
        else{
            props.setOpenOldDiseaseRegister(false);
        }
    }

    const handleApplyDataPatientOldDisease = async (foundOldDiseaseItem) => {
        setOpenAlertProcessing(true);
        setOpenAlertProcessing(true);
        const responseVaccinationByPatientId = await getVaccinationByPatientId(foundOldDiseaseItem.patientId);
        const dataPantientOldOldDiseaseRegister = {
            examinationId: '',
            oldDisease: true,
            oldDiseaseWithNullCodeWard: foundOldDiseaseItem.codeWard ? false : true,
            height: '',
            weight: '',
            headCircumference: '',
            reason: '',
            vaccination: responseVaccinationByPatientId.vaccination,
            medicalTypeId: responseVaccinationByPatientId.medicalTypeId,
            userIdDoctor: '',
            patient: {
                patientCode: foundOldDiseaseItem.patientCode,
                identifier: foundOldDiseaseItem.identifier,
                address: foundOldDiseaseItem.address,
                fullName: foundOldDiseaseItem.fullName,
                dayOfBirth: foundOldDiseaseItem.dayOfBirth,
                codeWard: foundOldDiseaseItem.codeWard,
                gender: foundOldDiseaseItem.gender,
                fullNameMother: foundOldDiseaseItem.fullNameMother,
                phoneMother: foundOldDiseaseItem.phoneMother,
                fullNameFather: foundOldDiseaseItem.fullNameFather,
                phoneFather: foundOldDiseaseItem.phoneFather
            }
        }
        props.setDataPatientsRegister(dataPantientOldOldDiseaseRegister);
        setOpenAlertProcessing(false);
        handleCloseOldDiseaseRegister();
    }

    return (
        <>
            <Dialog fullWidth={true} maxWidth={'md'} open={props.openOldDiseaseRegister} onClose={(event, reason) => handleCloseOldDiseaseRegister(event, reason)} disableEscapeKeyDown={true} sx={{'.MuiDialog-paperWidthMd': {maxWidth: '970px'}}}>
                <DialogTitle sx={{padding: '10px 0px 10px 0px', fontWeight: 'bolder', fontSize: '22px', textAlign: 'center' }}>Bệnh nhân đã tham gia khám định kỳ thuộc danh sách dưới đây?</DialogTitle>
                <IconButton onClick={() => handleCloseOldDiseaseRegister()}sx={{position: 'absolute', right: 5, top: 7}}>
                    <CloseIcon fontSize='medium'/>
                </IconButton>
                <DialogContent sx={{padding: '0px 18px 0px 18px', mt: 0, mb: 3}}>
                    {props.listOldDiseaseRegister.length !== 0 ?
                        <>
                            <TableContainer component={Paper} sx={{boxShadow: 4}}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow sx={{"& th": {color: "rgba(96, 96, 96)", backgroundColor: "pink"}}}>
                                            <TableCell align='left' sx={{fontSize: '1rem'}}>Mã BN</TableCell>
                                            <TableCell align="left" sx={{fontSize: '1rem'}}>Họ tên</TableCell>
                                            <TableCell align="left" sx={{fontSize: '1rem'}}>Ngày sinh</TableCell>
                                            <TableCell align="left" sx={{fontSize: '1rem'}}>Giới tính</TableCell>
                                            <TableCell align="left" sx={{fontSize: '1rem'}}>Địa chỉ</TableCell>
                                            <TableCell align="left" sx={{fontSize: '1rem'}}>Cha/Mẹ</TableCell>
                                            <TableCell align="left" sx={{fontSize: '1rem'}}>Điện thoại</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            props.listOldDiseaseRegister.map((foundOldDiseaseItem, foundOldDiseaseIndex) => (
                                                <TableRow hover role="checkbox" key={foundOldDiseaseIndex} sx={{cursor: 'pointer'}} onDoubleClick={() => handleApplyDataPatientOldDisease(foundOldDiseaseItem)}>
                                                    <TableCell align='left' >{foundOldDiseaseItem.patientCode}</TableCell>
                                                    <TableCell align='left' >{foundOldDiseaseItem.fullName}</TableCell>
                                                    <TableCell align='left' >{moment(foundOldDiseaseItem.dayOfBirth).format('DD/MM/YYYY')}</TableCell>
                                                    <TableCell align='left' >{foundOldDiseaseItem.gender === true ? 'Nam' : 'Nữ'}</TableCell>
                                                    <TableCell align='left' >{foundOldDiseaseItem.fullAddress}</TableCell>
                                                    <TableCell align='left' >{foundOldDiseaseItem.fullNameMother || foundOldDiseaseItem.fullNameFather}</TableCell>
                                                    <TableCell align='left' >{foundOldDiseaseItem.phoneMother || foundOldDiseaseItem.phoneFather}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    :
                        null
                    }
                </DialogContent>
            </Dialog>

            <AlertProcessing
                openAlertProcessing={openAlertProcessing} setOpenAlertProcessing={setOpenAlertProcessing}            
            />
        </>
    )
}

export default OldDiseaseForRegister