import React, { useState, useContext, useEffect, useRef } from 'react';
import _ from 'lodash'
//modal
import AlertProcessing from '../ManageAlertProcessing/AlertProcessing';
//mui theme
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { DialogActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
//mui icon
import CheckBoxIcon from '@mui/icons-material/CheckBox';
//mui datepicker
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//moment
import moment from 'moment';
//other
import TextareaAutosize from 'react-textarea-autosize';
//css
import './SCSS/CompleteExamining.scss';
//api
import { createAddPredecessor, createAddMedicalBook, getAppointmentDate } from '../../Service/MedicalRegisterService';
import { toast } from 'react-toastify';

function CompleteExamining(props) {
    const [mainDataExaminingForConclusion, setMainDataExaminingForConclusion] = useState();
    const [openAlertProcessing, setOpenAlertProcessing] = useState(false);


    const typingRef = useRef(null);
    const textareaRef = useRef(null);
    const dateFieldRef = useRef(null);


    const useStyles = makeStyles({
        root: {
          '&.Mui-disabled': {
            color: '#d32f2f', // Màu sắc khi checkbox bị vô hiệu hóa
          },
          '&.Mui-checked.Mui-disabled': {
            color: '#d32f2f', // Màu sắc khi checkbox bị vô hiệu hóa và đã được chọn
          },
        },
      });

    const classes = useStyles();

    const handleCloseModalCompleteExamining = (event, reason) => {
        if(reason && reason === "backdropClick"){
          return;
        }
        else{
            props.setOpenModalCompleteExamining(false);
        }
      }

    const onChangeExaminingConclusion = (value) => {
        typingRef.current = setTimeout(() => {
            setMainDataExaminingForConclusion(prevMainDataExaminingForConclusion => {
                prevMainDataExaminingForConclusion.conclusion = value;
                return {...prevMainDataExaminingForConclusion}
            })
        }, 300)
    }

    const onChangeAppointmentDate = (value) => {
        if(value){
            if(typingRef.current){
                clearInterval(typingRef.current);
            }
            typingRef.current = setTimeout(() => {
                const takenValue = value._d;
                const formattedDate = moment(takenValue).format('YYYY-MM-DD');
                if(formattedDate !== 'Invalid date'){
                    setMainDataExaminingForConclusion(prevMainDataExaminingForConclusion => {
                        prevMainDataExaminingForConclusion.appointmentDate = formattedDate;
                        return {...prevMainDataExaminingForConclusion}
                    })
                }
            }, 200)   
        }
    }

    const handleSetDataCompleteExamining = async () => {
        const editDataExaminingForConclusion = _.clone(props.dataExaminingForConclusion);

        editDataExaminingForConclusion.categories = editDataExaminingForConclusion.categories.map(categoriesItem => ({
            ...categoriesItem,
            // Lọc các categoryContents để giữ lại những phần tử có categoryContentQuestions không rỗng
            categoryContents: categoriesItem.categoryContents.filter(categoryContentsItem => categoryContentsItem.categoryContentQuestions.length > 0)

            // Loại bỏ các categories nếu tất cả categoryContents của nó đều bị loại bỏ
        })).filter(categoriesItem => categoriesItem.categoryContents.length > 0);

        if(editDataExaminingForConclusion.categories.length !== 0){
            setOpenAlertProcessing(true);
            const responseAppointmentDate = await getAppointmentDate(props.dataExaminingForConclusion.medicalRegisterId);

            if(responseAppointmentDate.status === 200){
                editDataExaminingForConclusion.appointmentDate = responseAppointmentDate.data.appointmentDate
                editDataExaminingForConclusion.nextExamId = responseAppointmentDate.data.nextExamId
                editDataExaminingForConclusion.nextExamName = responseAppointmentDate.data.nextExamName
            }else{
                toast.error(responseAppointmentDate.data, {toastId: 'error1'});
            }

            setMainDataExaminingForConclusion(editDataExaminingForConclusion);
            setOpenAlertProcessing(false);
            textareaRef.current.focus();
        }
    }

    const handleAddMedicalBook = async () => {
        if(checkValidate()){
            setOpenAlertProcessing(true);
            if(mainDataExaminingForConclusion.categories.some(categoriesItem => categoriesItem.isPredecessor === true)){
                const categoryPres = mainDataExaminingForConclusion.categories.filter(categoriesItem => categoriesItem.isPredecessor === true)
                const dataPredecessor = { patientId: mainDataExaminingForConclusion.patientId, categoryPres: categoryPres }
                await createAddPredecessor(dataPredecessor);
            }
            const categoriesHealthRecordExamining = mainDataExaminingForConclusion.categories.filter(categoriesItem => categoriesItem.isHealthRecord === true)
            mainDataExaminingForConclusion.categories = categoriesHealthRecordExamining
            const responseAddMedicalBook = await createAddMedicalBook(mainDataExaminingForConclusion);
            if(responseAddMedicalBook.status === 200){
                toast.success(responseAddMedicalBook.data, {toastId: 'success3'});
                props.handleCompleteExaminingForPantient();
                setMainDataExaminingForConclusion();
                props.setOpenModalCompleteExamining(false);
            }
            else{
                toast.error(responseAddMedicalBook.data, {toastId: 'error1'});
            }
            setOpenAlertProcessing(false);
        }
    }

    
    const checkValidate = () => {
        let isValid = true;
        if(mainDataExaminingForConclusion.conclusion === null){
            textareaRef.current.focus();
            toast.error('Bạn chưa nhập kết luận khám', {toastId: 'error1'})
            isValid = false;
        }

        if(mainDataExaminingForConclusion.appointmentDate === 'Invalid date'){
            dateFieldRef.current.focus();
            toast.error('Ngày tái khám không hợp lệ', {toastId: 'error1'})
            isValid = false;
        }

        if(mainDataExaminingForConclusion.appointmentDate === ''){
            dateFieldRef.current.focus();
            toast.error('Bạn chưa chọn ngày tái khám', {toastId: 'error1'})
            isValid = false;
        }
        return isValid
    }

    useEffect(() => {
        if(props.openModalCompleteExamining){
            handleSetDataCompleteExamining();
        }
    }, [props.openModalCompleteExamining])

    return (
        <>
            <Dialog fullWidth={true} maxWidth={'md'} open={props.openModalCompleteExamining} onClose={(event, reason) => handleCloseModalCompleteExamining(event, reason)}>
                <DialogTitle sx={{ fontWeight: 'bolder', fontSize: '20px', textAlign: 'center', color: 'red', textTransform: 'uppercase' }}>Tóm tắt quá trình khám</DialogTitle>
                <DialogContent dividers sx={{pl: '15px', pr: '15px'}}>
                    <Box sx={{pl: 6, pr: 6}}>
                        <List sx={{p: 0}}>
                            <Box>
                                {mainDataExaminingForConclusion ? 
                                    mainDataExaminingForConclusion.categories.length !== 0 ? 
                                        <div className='category-complete-examining'>
                                            {mainDataExaminingForConclusion.categories.map((categoriesItem, categoriesIndex) => (
                                                <div key={`categoriesItem ${categoriesIndex}`}>
                                                    <Typography sx={{fontSize: '1.25rem', fontWeight: 'bolder', color: 'deeppink'}}>{categoriesItem.categoryName}</Typography>
                                                        {categoriesItem.categoryContents.map((categoryContentsItem, categoryContentsIndex) => (
                                                            <div className='table-category-complete-examining' style={{marginBottom: '10px'}} key={`categoryContents ${categoryContentsIndex}`}>
                                                                <Typography variant='subtitle1' sx={{fontWeight: 'bolder', fontSize: '20px', textAlign: 'center'}}>{categoryContentsItem.categoryContentTitle}</Typography>
                                                
                                                                {categoryContentsItem.categoryContentQuestions.map((questionItem, questionIndex) => (
                                                                    <div key={`questionItem ${questionIndex}`}>
                                                                        <Grid container rowSpacing={0}>
                                                                            {questionIndex === 0 ?
                                                                                <>
                                                                                    <Grid item xs={4} sx={{border: '2px solid rgb(218,220,224)', borderRight: '0px', p: 0.7}}>
                                                                                        <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder'}}>{categoryContentsItem.categoryContentName}</Typography>
                                                                                    </Grid> 

                                                                                    {questionItem.categoryContentQuestionType === 'check' ? 
                                                                                        <>
                                                                                            <Grid item xs={2.5} sx={{border: '2px solid rgb(218,220,224)', borderRight: '0px', p: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                                                                <CheckBoxIcon sx={{fontSize: '1.2rem', color: 'gray', mr: 0.4}}/>
                                                                                                <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder', lineHeight: '1.6'}}>{categoryContentsItem.categoryContentCheck}</Typography>
                                                                                            </Grid>
                                                                        
                                                                                            <Grid item xs={5.5} sx={{border: '2px solid rgb(218,220,224)', p: 0.7}}>
                                                                                                <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder', ml: 0.5}}>{categoryContentsItem.categoryContentText}</Typography>
                                                                                            </Grid>
                                                                                        </>
                                                                                    : 
                                                                                        <Grid item xs={8} sx={{border: '2px solid rgb(218,220,224)', p: 0.7}}>
                                                                                            <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder'}}>{categoryContentsItem.categoryContentText}</Typography>
                                                                                        </Grid>
                                                                                    }   
                                                                                </>
                                                                            :
                                                                                null
                                                                            }

                                                                            <Box key={`questionItem ${questionIndex}`} style={{display: 'flex', width: '100%'}}>
                                                                                <Grid item xs={4} sx={{border: '2px solid rgb(218,220,224)', borderTop: '0px', borderRight: '0px', p: 0.5, display: 'flex', alignItems: 'center'}}>
                                                                                    <Typography variant='subtitle1' sx={{fontSize: '1rem'}}>{questionItem.categoryContentQuestionName}</Typography>
                                                                                </Grid>
                                                                
                                                                                {questionItem.categoryContentQuestionType === 'check' ? 
                                                                                    <>
                                                                                        <Grid item xs={2.5} sx={{border: '2px solid rgb(218,220,224)', borderTop: '0px', borderRight: '0px', p: 0.5, display: 'flex', justifyContent: 'center'}}>
                                                                                            <Checkbox disabled checked={questionItem.categoryContentAnswer}
                                                                                                classes={{ root: classes.root }}
                                                                                                sx={{'& .MuiSvgIcon-fontSizeMedium': {fontSize: '1.2rem'}}} color='error'
                                                                                            />
                                                                                        </Grid>

                                                                                        <Grid item xs={5.5} >
                                                                                            <div className='note-for-answer'>
                                                                                                <div className='suggest-note'>                                                                          
                                                                                                    <TextareaAutosize className='textarea-autosize' rows={1} disabled defaultValue={questionItem.categoryContentNote}/>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Grid>
                                                                                    </>
                                                                                :   
                                                                                    <>
                                                                                        <Grid item xs={8} >
                                                                                            <div className='note-for-answer'>
                                                                                                <div className='suggest-note'>                                                                          
                                                                                                    <TextareaAutosize className='textarea-autosize' rows={1} disabled defaultValue={questionItem.categoryContentNote}/>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Grid>
                                                                                    </>
                                                                                }                                                                                                                                                                          
                                                                            </Box>
                                                                        </Grid>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ))}
                                                </div>
                                            ))}
                                        </div>
                                    :
                                        <Typography variant='h6' sx={{color: 'blue', fontWeight: 'bolder', textAlign: 'center'}}>Không có nội dung nào được khám.</Typography>
                                :
                                    <Typography variant='h6' sx={{color: 'blue', fontWeight: 'bolder', textAlign: 'center'}}>Không có nội dung nào được khám.</Typography>
                                }
                            </Box>
                        </List>
                    </Box>
                </DialogContent>

                <DialogActions>
                    {mainDataExaminingForConclusion ? 
                        mainDataExaminingForConclusion.categories.length !== 0 ?
                            <div style={{width: '100%', padding: '8px 50px 8px 50px'}}>
                                <TextareaAutosize placeholder='Kết luận của bác sĩ' style={{width: '100%', padding: '15px', fontSize: '17px'}} onChange={(e) => onChangeExaminingConclusion(e.target.value)} ref={textareaRef} />
                            
                                    {mainDataExaminingForConclusion.appointmentDate ? 
                                    <>
                                        <Box sx={{display: 'flex', justifyContent: 'center', mb: 2}}>
                                            <Typography variant='h6' sx={{mt: 'auto', mb: 'auto', mr: 2}}>Kỳ khám tiếp theo: <span style={{fontWeight: 'bolder', color: '#ff1744'}}>{mainDataExaminingForConclusion.nextExamName}</span></Typography>
                                            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
                                                <DemoContainer components={['DatePicker']}>  
                                                    <DatePicker label="Ngày khám dự kiến" 
                                                        format='DD/MM/YYYY' defaultValue={moment(mainDataExaminingForConclusion.appointmentDate)}
                                                        onChange={(value) => onChangeAppointmentDate(value)}
                                                        slotProps={{ 
                                                            textField: { inputRef: dateFieldRef, }
                                                        }}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </Box>
                                    </>
                                    :
                                        null
                                    }
                        
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <Stack spacing={1} direction="row">
                                        <Button sx={{fontSize: '15px', textTransform: 'none'}} variant='contained' onClick={() => handleAddMedicalBook()}
                                            >Lưu (F4)</Button>
                                        <Button sx={{fontSize: '15px', textTransform: 'none'}} variant='contained' color={'error'}
                                            onClick={() => handleCloseModalCompleteExamining()}>Đóng (ESC)</Button>
                                    </Stack>
                                </div>
                            </div>   
                        :
                            null
                    :
                        null                
                    }             
                </DialogActions>
            </Dialog>

            <AlertProcessing
                openAlertProcessing={openAlertProcessing} setOpenAlertProcessing={setOpenAlertProcessing}            
            />
        </>
    )
}

export default CompleteExamining