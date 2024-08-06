import React, { useState, useContext, useEffect } from 'react';
//lodash
import _ from 'lodash';
//mui theme
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import CircularProgress from '@mui/material/CircularProgress';
//toast
import { toast } from 'react-toastify';
//api
import { getGetListDoctor } from '../../Service/UserService';
import { createCurrentDoctorExamining } from '../../Service/MedicalService';
import { Box } from '@mui/material';

function SelectedDoctorExamining(props) {
    const [loading, setLoading] = useState(false);
    const [listDoctor, setListDoctor] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const CustomPopper = (props) => {
        return <Popper {...props} style={{ width: props.anchorEl ? props.anchorEl.clientWidth : undefined }} placement="bottom-start" />;
      };

    const onSelectDoctor = (e, value) => {
        setSelectedDoctor( { userFullName: value.userFullName, userIdDoctor: value.userId } );
    }

    const handleCloseSelectedDoctorExaminingModal = (event, reason) => {
        if(reason && reason === "backdropClick"){
            return;
        }
        else{
            props.setOpenSelectedDoctorExaminingModal(false);
            setSelectedDoctor(null)
        }
    }

    const handleCreateCurrentDoctorExamining = async () => {
        if(selectedDoctor === null){
            toast.error('Bạn chưa chọn bác sĩ khám!', {toastId: 'error1'})
        }
        else{
            if(_.isEqual(props.currentDoctorExamining, selectedDoctor)){
                toast.warning('Hiện không có gì để lưu', {toastId: 'warning1'})
            }
            else{
                const response = await createCurrentDoctorExamining(selectedDoctor.userIdDoctor);
                toast.success(response.data, {toastId: 'success1'});
                props.setCurrentDoctorExamining(selectedDoctor);
                props.setOpenSelectedDoctorExaminingModal(false);
            }
        }
    }

    const handleGetGetListDoctor = async () => {
        const response = await getGetListDoctor();
        setListDoctor(response);
        if(props.currentDoctorExamining.userIdDoctor !== ''){
            const indexResponseListDoctor = response.findIndex(listDoctor => listDoctor.userId === props.currentDoctorExamining.userIdDoctor);
            setSelectedDoctor(response[indexResponseListDoctor]);
        }
    }

    useEffect(() => {
        setLoading(true);
        if(props.openSelectedDoctorExaminingModal){
            if(listDoctor.length === 0){
                handleGetGetListDoctor();
            }
            else{
                const indexResponseListDoctor = listDoctor.findIndex(listDoctor => listDoctor.userId === props.currentDoctorExamining.userIdDoctor);
                setSelectedDoctor(listDoctor[indexResponseListDoctor]);
            }
        }
        setLoading(false);
    }, [props.currentDoctorExamining, props.openSelectedDoctorExaminingModal])

    return (
        <>
            <Dialog fullWidth={true} maxWidth='xs' open={props.openSelectedDoctorExaminingModal} onClose={(event, reason) => handleCloseSelectedDoctorExaminingModal(event, reason)} disableEscapeKeyDown={true} >
                <DialogTitle sx={{ m: 0, p: 1.4, fontWeight: 'bolder', fontSize: '22px' }}>{props.currentDoctorExamining ? 'Thay đổi bác sĩ khám' : 'Chọn bác sĩ khám'}</DialogTitle>
                <IconButton onClick={() => props.setOpenSelectedDoctorExaminingModal(false)}sx={{position: 'absolute', right: 5, top: 7}}>
                    <CloseIcon fontSize='medium'/>
                </IconButton>
                <DialogContent dividers >
                    {loading ? 
                        <CircularProgress/>
                    :
                        <>
                            <Box sx={{height: 'auto'}}>
                                <Autocomplete 
                                    value={selectedDoctor}
                                    sx={{marginBottom: '10px'}}
                                    options={listDoctor}
                                    PopperComponent={CustomPopper}
                                    getOptionLabel={(option) => option.userFullName}
                                    renderOption={(props, option) => (
                                        <li {...props}>
                                            {option.userFullName}
                                        </li>
                                    )}
                                    onChange={(e, value) => onSelectDoctor(e, value)}
                                    renderInput={(params) => (
                                        <TextField {...params} 
                                            label={'Chọn một bác sĩ'} 
                                        />
                                    )}
                                    disableClearable // Bỏ icon xóa
                                    popupIcon={null} // Bỏ icon dropdown
                                />

                                <Stack spacing={2} direction="column">
                                    <Button sx={{ width: '12ch' }} variant="contained" color="success" style={{ margin: 'auto' }} 
                                        onClick={() => handleCreateCurrentDoctorExamining()}>Lưu
                                    </Button>
                                </Stack>
                            </Box>
                        </>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}

export default SelectedDoctorExamining