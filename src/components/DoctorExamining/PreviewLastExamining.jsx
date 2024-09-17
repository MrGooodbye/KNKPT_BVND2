import React, { useState, useContext, useEffect, useRef } from 'react';
//mui theme
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import TextareaAutosize from 'react-textarea-autosize';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
//mui icon
import SendIcon from '@mui/icons-material/Send';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
//scss
import './SCSS/PreviewLastExamining.scss'; 
//api
import { getMedicalBook } from '../../Service/MedicalService';
//moment
import moment from 'moment';
import 'moment/locale/vi'; 
moment.locale('vi');

function PreviewLastExamining(props) {
    const previewDataExaminingDefault = {
        categoryPres: [],
        healthRecords: { examinationName: '', timeUpdateState: '', conclusion: '', medicakBook: [] },
        nutritionals: [],
        vaccinationBook: [] 
    }

    const [previewDataExamining, setPreviewDataExamining] = useState(previewDataExaminingDefault);
    // const [fullDataPredecessor, setFullDataPredecessor] = useState();
    // const [fullDataHealthRecord, setFullDataHealthRecord] = useState();
    
    const [loadingMedicalBook, setLoadingMedicalBook] = useState(false);

    const [openCollapsePredecessorItem, setOpenCollapsePredecessorItem] = useState([]);
    const [openCollapseMedicakBookItem, setOpenCollapseMedicakBookItem] = useState([]);

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

    const handleOpenPredecessorItem = (predecessorIndex) => {
        setOpenCollapsePredecessorItem((prevOpen) => {
            const newOpen = [...prevOpen];
            newOpen[predecessorIndex] = !newOpen[predecessorIndex];
            return newOpen;
        });
    }

    const handleOpenMedicakBookItem = (medicakBookIndex) => {
        setOpenCollapseMedicakBookItem((prevOpen) => {
            const newOpen = [...prevOpen];
            newOpen[medicakBookIndex] = !newOpen[medicakBookIndex];
            return newOpen;
        });
    }

    // const handeOnChangePagePredecessor = (e, page, indexPredecessor) => {
    //     const _previewDataExamining = {...previewDataExamining}
    //     _previewDataExamining.categoryPres[indexPredecessor].categoryContents = fullDataPredecessor[indexPredecessor].categoryContents[page - 1];
    //     _previewDataExamining.categoryPres[indexPredecessor].currentContent = page
    //     setPreviewDataExamining(_previewDataExamining)
    // }

    // const handeOnChangePageHealthRecords = (e, page, indexMedicakbook) => {
    //     const _previewDataExamining = {...previewDataExamining}
    //     _previewDataExamining.healthRecords.medicakBook[indexMedicakbook].categoryContents = fullDataHealthRecord[indexMedicakbook].categoryContents[page - 1];
    //     _previewDataExamining.healthRecords.medicakBook[indexMedicakbook].currentContent = page
    //     setPreviewDataExamining(_previewDataExamining)
    // }

    const handleEditPrevDataExamining = async () => {
        setLoadingMedicalBook(true);
        const responseMedicalBook = await getMedicalBook(props.prevDataExamining.healthRecords[props.prevDataExamining.healthRecords.some(healthRecordsItem => healthRecordsItem.medicalBookId === null) ? 1 : 0].medicalRegisterId);
        if(props.prevDataExamining.newPredecessor){
            const healthRecordsUpdate = {
                ...props.prevDataExamining.healthRecords[props.prevDataExamining.healthRecords.some(healthRecordsItem => healthRecordsItem.medicalBookId === null) ? 1 : 0],
                newMedicalBook: responseMedicalBook.medicakBook.newMedicalBook,
                appointmentDate: responseMedicalBook.medicakBook.appointmentDate,
                nextExamName: responseMedicalBook.medicakBook.nextExamName,
                medicakBook: responseMedicalBook.medicakBook.categories
            }
             
            setPreviewDataExamining(
                {
                    categoryPres: [],
                    healthRecords: healthRecordsUpdate,
                    medicalBookIdRecently: props.prevDataExamining.medicalBookIdRecently,
                    nutritionals: props.prevDataExamining.nutritionals,
                    vaccinationBook: props.prevDataExamining.vaccinationBook,
                }
            )
        }

        else{
            if(props.prevDataExamining.categoryPres.length > 1){
                props.prevDataExamining.categoryPres = props.prevDataExamining.categoryPres.sort((a, b) => a.categoryOrder - b.categoryOrder);
            }

            const healthRecordsUpdate = {
                ...props.prevDataExamining.healthRecords[props.prevDataExamining.healthRecords.some(healthRecordsItem => healthRecordsItem.medicalBookId === null) ? 1 : 0],
                newMedicalBook: responseMedicalBook.medicakBook.newMedicalBook,
                appointmentDate: responseMedicalBook.medicakBook.appointmentDate,
                nextExamName: responseMedicalBook.medicakBook.nextExamName,
                medicakBook: responseMedicalBook.medicakBook.categories
            }
            
            setPreviewDataExamining(
                {
                    categoryPres: props.prevDataExamining.categoryPres,
                    healthRecords: healthRecordsUpdate,
                    medicalBookIdRecently: props.prevDataExamining.medicalBookIdRecently,
                    nutritionals: props.prevDataExamining.nutritionals,
                    vaccinationBook: props.prevDataExamining.vaccinationBook,
                }
            )
        }
        setLoadingMedicalBook(false);
    }

    useEffect(() => {
        if(props.prevDataExamining){
            handleEditPrevDataExamining();
        }
    }, [props.prevDataExamining])

    return (
        <>
            <Box sx={{height: '100%', position: 'relative'}}>
                {loadingMedicalBook ? 
                    <Box sx={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <CircularProgress />
                        <Typography variant='subtitle1' sx={{mt: 1}}>Đang tải dữ liệu sổ khám bệnh gần nhất, hãy chờ một chút...</Typography>
                    </Box>
                :
                    <>
                        <div className='preview-last-examining-contents' >

                            <Typography variant='h6' sx={{fontWeight: 'bolder', textAlign: 'center', fontSize: '1.2rem'}}>
                                Thông tin tóm tắt <span style={{color: 'red'}}>{previewDataExamining.healthRecords.examinationName}</span>
                            </Typography>

                            <List sx={{p: 0}}>
                                {previewDataExamining.categoryPres.map((predecessorItem, predecessorIndex) => (
                                    <div key={`predecessorItem ${predecessorIndex}`}>
                                        <ListItemButton sx={{pt: '0px', pb: '0px', borderRadius: '8px', ':hover': {backgroundColor: 'rgba(0, 0, 0, 0.1)'}}}
                                            onClick={() => handleOpenPredecessorItem(predecessorIndex)}
                                        >
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <ListItemIcon sx={{minWidth: '30px', '& .MuiSvgIcon-fontSizeMedium': {fontSize: '1rem', color: '#2962ff', transform: openCollapsePredecessorItem[predecessorIndex] === true ? 'rotate(90deg)' : 'rotate(0deg)'}}}><SendIcon /></ListItemIcon>
                                                <ListItemText primary={predecessorItem.categoryName} sx={{'& .MuiListItemText-primary': {fontSize: '1.25rem', fontWeight: 'bolder', color: 'deeppink'}}}/>
                                            </Box>
                                        </ListItemButton>

                                        <Collapse in={openCollapsePredecessorItem[predecessorIndex]} timeout="auto" unmountOnExit>
                                            <div>
                                                {predecessorItem.categoryContents.map((predecessorItemCategoryContentsItem, predecessorItemCategoryContentsIndex) => (
                                                    <div className='container-item-table-preview-examining' style={{ paddingLeft: '18px', paddingRight: '18px', marginBottom: '6px' }} key={`predecessorItemCategoryContentsIndex ${predecessorItemCategoryContentsIndex}`}>
                                                        <Typography variant='subtitle1' sx={{fontWeight: 'bolder', fontSize: '18px', textAlign: 'center', mb: predecessorItemCategoryContentsItem.categoryContentTitle ? 0 : 2 }}>{predecessorItemCategoryContentsItem.categoryContentTitle}</Typography>
                                                    
                                                        <Box sx={{mb: 2}}>
                                                            {predecessorItemCategoryContentsItem.categoryContentQuestions.map((questionItem, questionIndex) => (
                                                                <Box key={`questionItem ${questionIndex}`} >
                                                                    <Grid container rowSpacing={0} >
                                                                        {questionIndex === 0 ?
                                                                            <>
                                                                                <Grid item xs={4} sx={{border: '2px solid rgb(218,220,224)', borderRight: '0px', p: 0.7}}>
                                                                                    <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder'}}>{predecessorItemCategoryContentsItem.categoryContentName}</Typography>
                                                                                </Grid> 

                                                                                {questionItem.categoryContentQuestionType === 'check' ? 
                                                                                    <>
                                                                                        <Grid item xs={1.5} sx={{border: '2px solid rgb(218,220,224)', borderRight: '0px', p: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                                                            <CheckBoxIcon sx={{fontSize: '1.2rem', color: 'gray', mr: 0.4}}/>
                                                                                            <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder', lineHeight: '1.6'}}>{predecessorItemCategoryContentsItem.categoryContentCheck}</Typography>
                                                                                        </Grid>
                                                                                                    
                                                                                        <Grid item xs={6.5} sx={{border: '2px solid rgb(218,220,224)', p: 0.7}}>
                                                                                            <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder', ml: 0.5}}>{predecessorItemCategoryContentsItem.categoryContentText}</Typography>
                                                                                        </Grid>
                                                                                    </>
                                                                                : 
                                                                                    <Grid item xs={8} sx={{border: '2px solid rgb(218,220,224)', p: 0.7}}>
                                                                                        <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder'}}>{predecessorItemCategoryContentsItem.categoryContentText}</Typography>
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
                                                                                    <Grid item xs={1.5} sx={{border: '2px solid rgb(218,220,224)', borderTop: '0px', borderRight: '0px', p: 0.5, display: 'flex', justifyContent: 'center'}}>
                                                                                        <Checkbox disabled checked={questionItem.categoryContentAnswer} classes={{ root: classes.root }} sx={{'& .MuiSvgIcon-fontSizeMedium': {fontSize: '1.2rem'}}} />
                                                                                    </Grid>

                                                                                    <Grid item xs={6.5} >
                                                                                        <div className='note-for-answer'>
                                                                                            <div className='suggest-note'>                                                                          
                                                                                                <TextareaAutosize className='textarea-autosize' rows={1} disabled value={questionItem.categoryContentNote}/>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Grid>
                                                                                </>
                                                                            :   
                                                                                <>
                                                                                    <Grid item xs={8} >
                                                                                        <div className='note-for-answer'>
                                                                                            <div className='suggest-note'>                                                                          
                                                                                                <TextareaAutosize className='textarea-autosize' rows={1} disabled value={questionItem.categoryContentNote}/>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Grid>
                                                                                </>
                                                                            }  
                                                                        </Box>
                                                                    </Grid>
                                                                </Box>
                                                            ))} 
                                                        </Box>
                                                    </div>
                                                ))}
                                            </div>
                                        </Collapse>
                                    </div>
                                ))}

                                {previewDataExamining.healthRecords.medicakBook.map((medicakBookItems, medicakBookIndex) => (
                                    <div key={`medicakBookItems ${medicakBookIndex}`}>
                                        <ListItemButton sx={{pt: '0px', pb: '0px', borderRadius: '8px', ':hover': {backgroundColor: 'rgba(0, 0, 0, 0.1)'}}}
                                            onClick={() => handleOpenMedicakBookItem(medicakBookIndex)}
                                        >
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <ListItemIcon sx={{minWidth: '30px', '& .MuiSvgIcon-fontSizeMedium': {fontSize: '1rem', color: '#2962ff', transform: openCollapseMedicakBookItem[medicakBookIndex] === true ? 'rotate(90deg)' : 'rotate(0deg)'}}}><SendIcon /></ListItemIcon>
                                                <ListItemText primary={medicakBookItems.categoryName} sx={{'& .MuiListItemText-primary': {fontSize: '1.25rem', fontWeight: 'bolder', color: 'deeppink'}}}/>
                                            </Box>
                                        </ListItemButton>

                                        <Collapse in={openCollapseMedicakBookItem[medicakBookIndex]} timeout="auto" unmountOnExit>
                                            <div>
                                                {medicakBookItems.categoryContents.map((medicakBookCategoryContentsItem, medicakBookCategoryContentsIndex) => (
                                                    <div className='container-item-table-preview-examining' style={{ paddingLeft: '18px', paddingRight: '18px', marginBottom: '6px' }} key={`medicakBookCategoryContentsIndex ${medicakBookCategoryContentsIndex}`}>
                                                        <Typography variant='subtitle1' sx={{fontWeight: 'bolder', fontSize: '18px', textAlign: 'center', mb: medicakBookCategoryContentsItem.categoryContentTitle ? 0 : 2 }}>{medicakBookCategoryContentsItem.categoryContentTitle}</Typography>

                                                        <Box sx={{mb: 2}}>
                                                            {medicakBookCategoryContentsItem.categoryContentQuestions.map((questionItem, questionIndex) => (
                                                                <Box key={`questionItem ${questionIndex}`} >
                                                                    <Grid container rowSpacing={0} >
                                                                        {questionIndex === 0 ?
                                                                            <>
                                                                                <Grid item xs={4} sx={{border: '2px solid rgb(218,220,224)', borderRight: '0px', p: 0.7}}>
                                                                                    <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder'}}>{medicakBookCategoryContentsItem.categoryContentName}</Typography>
                                                                                </Grid> 

                                                                                {questionItem.categoryContentQuestionType === 'check' ? 
                                                                                    <>
                                                                                        <Grid item xs={2.5} sx={{border: '2px solid rgb(218,220,224)', borderRight: '0px', p: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                                                            <CheckBoxIcon sx={{fontSize: '1.2rem', color: 'gray', mr: 0.4}}/>
                                                                                            <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder', lineHeight: '1.6'}}>{medicakBookCategoryContentsItem.categoryContentCheck}</Typography>
                                                                                        </Grid>
                                                                                                    
                                                                                        <Grid item xs={5.5} sx={{border: '2px solid rgb(218,220,224)', p: 0.7}}>
                                                                                            <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder', ml: 0.5}}>{medicakBookCategoryContentsItem.categoryContentText}</Typography>
                                                                                        </Grid>
                                                                                    </>
                                                                                : 
                                                                                    <Grid item xs={8} sx={{border: '2px solid rgb(218,220,224)', p: 0.7}}>
                                                                                        <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder'}}>{medicakBookCategoryContentsItem.categoryContentText}</Typography>
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
                                                                                        <Checkbox disabled checked={questionItem.categoryContentAnswer} classes={{ root: classes.root }} sx={{'& .MuiSvgIcon-fontSizeMedium': {fontSize: '1.2rem'}}} />
                                                                                    </Grid>

                                                                                    <Grid item xs={5.5} >
                                                                                        <div className='note-for-answer'>
                                                                                            <div className='suggest-note'>                                                                          
                                                                                                <TextareaAutosize className='textarea-autosize' rows={1} disabled value={questionItem.categoryContentNote}/>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Grid>
                                                                                </>
                                                                            :   
                                                                                <>
                                                                                    <Grid item xs={8} >
                                                                                        <div className='note-for-answer'>
                                                                                            <div className='suggest-note'>                                                                          
                                                                                                <TextareaAutosize className='textarea-autosize' rows={1} disabled value={questionItem.categoryContentNote}/>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Grid>
                                                                                </>
                                                                            }  
                                                                        </Box>
                                                                    </Grid>
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                    </div>
                                                ))}             
                                            </div>
                                        </Collapse>
                                    </div>
                                ))}
                            </List>

                            <div className='conclusion' style={{marginLeft: '16px', marginTop: '4px'}}>
                                <Typography variant='h6' sx={{color: 'blue', fontWeight: 'bolder'}}>{`Kết luận: ${previewDataExamining.healthRecords.conclusion}`}</Typography>
                            </div>
                        </div>
                        
                        <div className='time-examining' style={{marginLeft: '16px', marginTop: '4px', width: '99%'}}>
                            <Typography variant='subtitle1' sx={{color: '#009688', fontWeight: 'bolder', fontSize: '1.08rem'}}>{`${previewDataExamining.healthRecords.doctorFullName}, ${moment(previewDataExamining.healthRecords.timeUpdateState).format('LLLL')}`}</Typography>
                        </div>
                    </>
                }
            </Box>
        </> 
    )
}

export default PreviewLastExamining