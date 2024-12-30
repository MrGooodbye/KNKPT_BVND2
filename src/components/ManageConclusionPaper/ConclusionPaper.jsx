import React, { forwardRef, useImperativeHandle, useState, useContext, useEffect, useRef  } from 'react';
//context
import { UserContext } from '../../context/UserContext';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Grid from '@mui/material/Grid';
import TextareaAutosize from 'react-textarea-autosize';
import { makeStyles } from '@mui/styles';
import { useReactToPrint } from "react-to-print";
//moment
import moment from 'moment';
//lodash
import _, { cloneDeep, constant } from "lodash";

let resolvePromise; // Biến toàn cục lưu hàm `resolve`

export const waitForPrintComplete = () => {
  // Hàm trả về một Promise
  return new Promise((resolve) => {
    resolvePromise = resolve; // Gán hàm resolve để có thể gọi sau khi in xong
  });
};

function ConclusionPaper(props) {
    const { user } = useContext(UserContext);

    const contentRef = useRef(null);

    const [dataPantientInfo, setDataPantientInfo] = useState();
    const [dataConclusionPaper, setDataConclusionPaper] = useState();

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

    const reactToPrintFn = useReactToPrint({ 
        contentRef: contentRef,
        onAfterPrint: () => {
            console.log("Hoàn tất in");
            if (resolvePromise) {
                resolvePromise(true); // Đánh dấu Promise đã hoàn thành
            }
        },
    });

    const handleEditDataConclusionToPrint = (data) => {
        const updatedCategoryPres = data.categoryPres.map(category => {
            const updatedCategoryContents = category.categoryContents.map(content => {
                // Lọc các câu hỏi có `hasEdit: true`
                const updatedQuestions = content.categoryContentQuestions.filter(question => question.hasEdit === true);
                // Trả về object mới nếu có ít nhất 1 câu hỏi được giữ lại
                return updatedQuestions.length > 0 ? { ...content, categoryContentQuestions: updatedQuestions } : null;
            }).filter(content => content !== null); // Loại bỏ các object null

            // Trả về object lớn nếu có ít nhất 1 `categoryContent` được giữ lại
            return updatedCategoryContents.length > 0 ? { ...category, categoryContents: updatedCategoryContents } : null;
        }).filter(category => category !== null); // Loại bỏ các object null

        return { ...data, categoryPres: updatedCategoryPres };
    }

    useEffect(() => {
        if(props.openConclusionPaper && props.dataConclusionPaper && props.dataPantientInfo){
            if(props.predecessorToPrint){
                const predecessorToPrint = _.cloneDeep(props.predecessorToPrint);
                const updatePredecessorToPrint = handleEditDataConclusionToPrint(predecessorToPrint);

                const newDataConclusionPaper = _.cloneDeep(props.dataConclusionPaper);
                const newDataConclusionPaperCategories = updatePredecessorToPrint.categoryPres.concat(props.dataConclusionPaper.categories);

                newDataConclusionPaper.categories = newDataConclusionPaperCategories;
                setDataConclusionPaper(newDataConclusionPaper)
            }
            else{
                setDataConclusionPaper(props.dataConclusionPaper);
            }
            
            setDataPantientInfo(props.dataPantientInfo);
            setTimeout(() => {
                props.setOpenConclusionPaper(false);
                reactToPrintFn();
                setDataConclusionPaper();
            }, 300)
        }
    }, [props.openConclusionPaper, props.dataConclusionPaper, props.dataPantientInfo, props.onComplete])

    return (
        <Dialog style={{display: 'none'}} fullWidth={true} maxWidth={'md'} open={props.openConclusionPaper} sx={{'.MuiDialog-paperWidthMd': {maxWidth: '970px'}}}>
            {/* <DialogTitle sx={{padding: '10px 0px 10px 0px', fontWeight: 'bolder', fontSize: '22px', textAlign: 'center' }}>Template In</DialogTitle> */}
            {/* <IconButton onClick={() => handleCloseModalConclusionPaper()}sx={{position: 'absolute', right: 5, top: 7}}>
                <CloseIcon fontSize='medium'/>
            </IconButton> */}
            <DialogContent sx={{padding: '0px 18px 0px 18px', mt: 4, mb: 2}} ref={contentRef}>
                <Box>
                    {dataConclusionPaper && dataPantientInfo ? 
                        <>
                            <Typography variant='h6' sx={{fontWeight: 'bolder', textAlign: 'center', textTransform: 'uppercase'}}>Giấy kết luận</Typography>
                            <div className='pantient-info' style={{marginTop: '20px', marginBottom: '100px'}}>
                                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4}} sx={{display: 'flex'}}>
                                    <Grid item xs={12}><Typography variant='subtitle2' sx={{ml: 1}}>Mã BN: <span style={{margin: 0, padding: 0, fontWeight: 'bolder'}}>{dataPantientInfo.patientCode}</span></Typography></Grid>

                                    <Grid item xs={7}><Typography variant='subtitle2' sx={{ml: 1}}>Họ tên: <span style={{margin: 0, padding: 0, fontWeight: 'bolder'}}>{dataPantientInfo.patientsName}</span></Typography></Grid>
                                    <Grid item xs={5}><Typography variant='subtitle2' sx={{ml: 1}}>Giới tính: <span style={{margin: 0, padding: 0}}>{dataPantientInfo.patientsGender === true ? 'Nam' : 'Nữ'}</span></Typography></Grid>

                                    <Grid item xs={7}><Typography variant='subtitle2' sx={{ml: 1}}>Ngày sinh: <span style={{margin: 0, padding: 0, fontWeight: 'bolder'}}>{moment(dataPantientInfo.patientsDOB).format("DD/MM/YYYY")}</span></Typography></Grid>
                                    <Grid item xs={5}><Typography variant='subtitle2' sx={{ml: 1}}>Tuổi: <span style={{margin: 0, padding: 0, fontWeight: 'bolder'}}>{dataPantientInfo.patientsMonthsOld}</span></Typography></Grid>
                                    
                                    <Grid item xs={12}><Typography variant='subtitle2' sx={{ml: 1}}>Địa chỉ: <span style={{margin: 0, padding: 0}}>{dataPantientInfo.patientsAddress}</span></Typography></Grid>

                                    <Grid item xs={7}><Typography variant='subtitle2' sx={{ml: 1}}>Cha mẹ/người giám hộ: <span style={{margin: 0, padding: 0, fontWeight: 'bolder'}}>{dataPantientInfo.parentName}</span></Typography></Grid>
                                    <Grid item xs={5}><Typography variant='subtitle2' sx={{ml: 1}}>SĐT: <span style={{margin: 0, padding: 0}}>{dataPantientInfo.patientsPhone}</span></Typography></Grid>

                                    <Grid item xs={4}><Typography variant='subtitle2' sx={{ml: 1}}>Chiều cao: <span style={{margin: 0, padding: 0}}>{dataPantientInfo.patientsHeight + ' cm'}</span></Typography></Grid>
                                    <Grid item xs={4}><Typography variant='subtitle2' sx={{ml: 1}}>Cân nặng: <span style={{margin: 0, padding: 0}}>{dataPantientInfo.patientsWeight + ' kg'}</span></Typography></Grid>
                                    <Grid item xs={4}><Typography variant='subtitle2' sx={{ml: 1}}>Vòng đầu <span style={{margin: 0, padding: 0}}>{dataPantientInfo.patientsHeadCircumference + ' cm'}</span></Typography></Grid>

                                    <Grid item xs={12} style={{height: '70px'}}><Typography variant='subtitle2' sx={{ml: 1}}>Kết luận: <span style={{margin: 0, padding: 0, fontWeight: 'bolder'}}>{dataConclusionPaper.conclusion}</span></Typography></Grid>
                                </Grid>
                            </div>
                       
                            {/* <div className='category-examining' style={{marginBottom: '50px'}}>
                                {dataConclusionPaper.categories.length !== 0 ?
                                    dataConclusionPaper.categories.map((categoriesItem, categoriesIndex) => (
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
                                    ))
                                :
                                    <Typography variant='h6' sx={{color: 'blue', fontWeight: 'bolder', textAlign: 'center'}}>Không phát hiện gì bất thường khi khám.</Typography>                               
                                }
                            </div> */}

                            <Typography variant='subtitle2' sx={{fontWeight: 'bolder', ml: 1, mt: 2}}>Ghi chú:</Typography>
                            <div className='note' style={{display: 'flex', justifyContent: 'space-between', marginLeft: '8px'}}>
                                <div className='appointment-date' style={{width: '270px'}}>
                                    <Typography variant='subtitle2' sx={{textTransform: 'uppercase', fontWeight: 'bolder'}}>Tái khám: {moment(dataConclusionPaper.appointmentDate).format("DD/MM/YYYY")}</Typography>

                                    {dataConclusionPaper.isVaccination && (
                                        
                                        <div className='vaccination' style={{display: 'block'}}>
                                            <Typography variant='subtitle2' sx={{textTransform: 'uppercase', fontWeight: 'bolder'}}>Tiêm ngừa: </Typography>
                                            <Typography variant='subtitle2'>{dataConclusionPaper.vaccination}</Typography>
                                            <Typography variant='subtitle2'>{dataConclusionPaper.nextVaccination}</Typography>
                                        </div>
                                            
                                    )
                                    }
                                </div>
                                <div className='exam-info'>
                                    <Typography variant='subtitle2'>{`${moment().format('LT')}, Ngày ${moment().format('LL')}`}</Typography>
                                    <Typography variant='subtitle2' sx={{textTransform: 'uppercase', textAlign: 'center'}}>Bác sĩ khám bệnh</Typography>
                                    <div className='doctor-signature' style={{padding: '50px'}}></div>
                                    <Typography variant='subtitle1' sx ={{fontWeight: 'bolder', textAlign: 'center'}}>{user.userFullName}</Typography>
                                </div>
                            </div>
                        </>
                    :
                        null
                    }
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default ConclusionPaper