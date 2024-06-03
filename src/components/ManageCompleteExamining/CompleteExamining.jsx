import React, { useState, useContext, useEffect, useRef } from 'react';
//mui theme
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
//mui icon
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
//other
import TextareaAutosize from 'react-textarea-autosize';
import { DialogActions } from '@mui/material';
//css
import './SCSS/CompleteExamining.scss';

function CompleteExamining(props) {

    const [dataExaminingSelected, setDataExaminingSelected] = useState([]);
    const [mainDataExaminingForConclusion, setMainDataExaminingForConclusion] = useState([]);

    const [openCollapse, setOpenCollapse] = useState([]);

    //state vị trí nội dung hiện tại
    const [currentContentExamining, setCurrentContentExamining] = useState([1]);

    const handleSetDataCompleteExamining = () => {
        const editMainDataExamining = props.mainDataExamining.filter((data) => data.categoryName !== 'Sổ sức khỏe' && data.categoryName !== 'Đánh giá dinh dưỡng' && data.categoryName !== 'Sổ tiêm ngừa');
        setDataExaminingSelected(editMainDataExamining);

        const processedData = editMainDataExamining.map(category => {
            const firstContent = category.categoryContents[0];
            return {
              ...category,
              categoryContents: [firstContent],
              contentQuantity: category.categoryContents.length
            };
          });

        setMainDataExaminingForConclusion(processedData);

        console.log(editMainDataExamining);
    }

    const handleOpenCollapseByCategory = (categoryIndex) => {
        setOpenCollapse((prevOpen) => {
            const newOpen = [...prevOpen];
            newOpen[categoryIndex] = !newOpen[categoryIndex];
            return newOpen;
        });
    };

    const handleAnswerCheckQuestion = () => {
        console.log(dataExaminingSelected);
    }

    const handleOnChangePage = (categoryIndex, page) => {
        //set lại số trang hiện tại
        setCurrentContentExamining((prevCurrentContentExamining) => {
            const newContentExamining = [...prevCurrentContentExamining];
            newContentExamining[categoryIndex] = newContentExamining[categoryIndex + 1];
            return newContentExamining;
        })

        //
        // console.log('index category: ', categoryIndex, 'trang tiep theo: ', page);
        //console.log(dataExaminingSelected[categoryIndex].categoryContents[page - 1]);

        const a = [...mainDataExaminingForConclusion];
        const b = dataExaminingSelected[categoryIndex].categoryContents[page - 1];

        a[categoryIndex].categoryContents = [b];

        setMainDataExaminingForConclusion(a);

        // console.log(a);
        // console.log(mainDataExaminingForConclusion);
        // console.log([b]);

        //console.log(mainDataExaminingForConclusion[categoryIndex].categoryContents);

        
    }

    useEffect(() => {
        if(props.openModalCompleteExamining){
            handleSetDataCompleteExamining(props.mainDataExamining);
        }
    }, [props.openModalCompleteExamining])

    return (
        <>
            <Dialog fullWidth={true} maxWidth={'md'} open={props.openModalCompleteExamining} disableEscapeKeyDown={true}>
            <DialogTitle sx={{ fontWeight: 'bolder', fontSize: '20px', textAlign: 'center', color: 'red', textTransform: 'uppercase' }}>Tóm tắt quá trình khám</DialogTitle>
            <DialogContent dividers sx={{pl: '15px', pr: '15px'}}>
                <Box sx={{pl: 6, pr: 6}}>
                    <List sx={{p: 0}}>
                        {mainDataExaminingForConclusion.map((categoryItem, categoryIndex) => (
                            <Box key={`category ${categoryIndex}`}>
                                {/* cây thư mục khám */}
                                <ListItemButton sx={{pt: '4px', pb: '4px', borderRadius: '8px', ':hover': {backgroundColor: 'rgba(0, 0, 0, 0.1)'}, backgroundColor: ''}} onClick={() => handleOpenCollapseByCategory(categoryIndex)}>
                                    <ListItemIcon sx={{minWidth: '30px', '& .MuiSvgIcon-fontSizeMedium': {fontSize: '1rem', color: '#2962ff'}}}><SendIcon /></ListItemIcon>
                                    <ListItemText primary={categoryItem.categoryName} sx={{'& .MuiListItemText-primary': {fontSize: '1.25rem', fontWeight: 'bolder', color: 'deeppink'}}}/>
                                </ListItemButton>

                                <Collapse in={openCollapse[categoryIndex]} timeout="auto" unmountOnExit>
                                    {categoryItem.categoryContents.map((contentItem, contentIndex) => (
                                        <div key={`category ${categoryIndex} content ${contentIndex}`} className='header-content-category'>
                                            <div className='content-examining'>
                                                <div className='title-examining'>
                                                    <Typography variant='h6' sx={{fontWeight: 'bolder', textAlign: 'center', fontSize: '1.2rem', mt: 0, mb: 0.2}}>{contentItem.categoryContentTitle}</Typography>
                                                </div>       


                                                <div className='question-examining' style={contentItem.categoryContentTitle === null ? {marginTop: '25px'} : {marginTop: '2px'}}>
                                                    {contentItem.categoryContentQuestions.map((questionItem, questionIndex) => (
                                                        <Box key={`category ${categoryIndex} content ${contentIndex} question ${questionIndex}`}>
                                                            <Grid container rowSpacing={0}>
                                                                {questionIndex === 0 ? 
                                                                    <>
                                                                        <Grid item xs={4} sx={{border: '2px solid rgb(218,220,224)', borderRight: '0px', p: 0.7}}>
                                                                            <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder'}}>Tình trạng</Typography>
                                                                        </Grid>

                                                                        {questionItem.categoryContentQuestionType === 'check' ? 
                                                                            <>
                                                                                <Grid item xs={1} sx={{border: '2px solid rgb(218,220,224)', borderRight: '0px', p: 0.7, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                                                        <CheckBoxIcon sx={{fontSize: '1.22rem', color: 'gray'}}/><Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder', margin: 'auto', lineHeight: '1.6'}}>Có</Typography>
                                                                                </Grid>
                                                                                <Grid item xs={7} sx={{border: '2px solid rgb(218,220,224)', p: 0.7}}>
                                                                                    <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder', ml: 0.5}}>Ghi chú</Typography>
                                                                                </Grid>
                                                                            </>
                                                                            : 
                                                                                <Grid item xs={8} sx={{border: '2px solid rgb(218,220,224)', p: 0.7}}>
                                                                                    <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder'}}>Giá trị</Typography>
                                                                                </Grid>
                                                                        }                                                                                
                                                                    </>
                                                                    : 
                                                                        null
                                                                }

                                                                <Grid item xs={4} sx={{border: '2px solid rgb(218,220,224)', borderTop: '0px', borderRight: '0px', p: 0.5, display: 'flex', alignItems: 'center'}}>
                                                                    <Typography variant='subtitle1' sx={{fontSize: '1rem'}}>{questionItem.categoryContentQuestionName}</Typography>
                                                                </Grid>
                                                                
                                                                {questionItem.categoryContentQuestionType === 'check' ? 
                                                                    <>
                                                                        <Grid item xs={1} sx={{border: '2px solid rgb(218,220,224)', borderTop: '0px', borderRight: '0px', p: 0.5, display: 'flex', justifyContent: 'center'}}>
                                                                            <Checkbox checked={questionItem.categoryContentAnswer === true ? true : false } color='error' sx={{'& .MuiSvgIcon-fontSizeMedium': {fontSize: '1.2rem'}}} onClick={() => handleAnswerCheckQuestion(categoryIndex)}></Checkbox>
                                                                        </Grid>

                                                                        <Grid item xs={7} >
                                                                            <div className='note-for-answer'>
                                                                                <div className='suggest-note' key={`category ${categoryIndex} content ${contentIndex} question ${questionIndex} current ${currentContentExamining[categoryIndex]}`}>                                                                          
                                                                                    <TextareaAutosize className='test' rows={1} style={{width: '100%', color: 'red', border: 'none', outline: 'none'}} 
                                                                                        
                                                                                        //value={questionItem.categoryContentNote}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </Grid>
                                                                    </>   
                                                                    :
                                                                    <>
                                                                        <Grid item xs={8}>
                                                                            <input type='text' className='value-for-answer' defaultValue={questionItem.categoryContentAnswer} />
                                                                        </Grid>
                                                                    </>
                                                                }
                                                            </Grid>
                                                        </Box>
                                                    ))}
                                                </div>                                             
                                            </div>

                                            <div className='footer-content-category'>
                                                <Pagination count={categoryItem.contentQuantity} page={currentContentExamining[categoryIndex]} color="success" sx={{m: 'auto'}} onChange={(e, page) => handleOnChangePage(categoryIndex, page)}/>
                                            </div>
                                        </div>
                                    ))}
                                </Collapse>
                            </Box>
                        ))}
                    </List>
                    <TextareaAutosize placeholder='Kết luận của bác sĩ' style={{width: '100%', height: '10vh', padding: '10px', fontSize: '18px', marginTop: '5px'}}/>
                </Box>
            </DialogContent>
            <DialogActions sx={{m: 'auto'}}>
                    <Button sx={{fontWeight: 'bolder', fontSize: '17px', ':hover': {backgroundColor: 'rgba(25, 118, 210, 0.2)'}}} 
                    >Lưu</Button>
                    <Button sx={{fontWeight: 'bolder', fontSize: '17px', color: 'red', ':hover': {backgroundColor: 'rgb(210, 25, 25, 0.2)'}}} 
                    onClick={() => props.setOpenModalCompleteExamining(false)}>Đóng</Button>
            </DialogActions>
            </Dialog>
        </>
    )
}

export default CompleteExamining