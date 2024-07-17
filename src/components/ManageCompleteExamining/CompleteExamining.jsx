import React, { useState, useContext, useEffect, useRef } from 'react';
import _ from 'lodash'
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
import Stack from '@mui/material/Stack';
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
    const [mainDataExaminingForConclusion, setMainDataExaminingForConclusion] = useState([]);

    const handleSetDataCompleteExamining = () => {
        const editDataExaminingForConclusion = _.clone(props.dataExaminingForConclusion);

        editDataExaminingForConclusion.categories = editDataExaminingForConclusion.categories.map(categoriesItem => ({
            ...categoriesItem,
            // Lọc các categoryContents để giữ lại những phần tử có categoryContentQuestions không rỗng
            categoryContents: categoriesItem.categoryContents.filter(categoryContentsItem => categoryContentsItem.categoryContentQuestions.length > 0)

            // Loại bỏ các categories nếu tất cả categoryContents của nó đều bị loại bỏ
        })).filter(categoriesItem => categoriesItem.categoryContents.length > 0);

        setMainDataExaminingForConclusion(editDataExaminingForConclusion)
    }

    useEffect(() => {
        if(props.openModalCompleteExamining){
            handleSetDataCompleteExamining();
        }
    }, [props.openModalCompleteExamining])

    return (
        <>
            <Dialog fullWidth={true} maxWidth={'md'} open={props.openModalCompleteExamining} disableEscapeKeyDown={true}>
            <DialogTitle sx={{ fontWeight: 'bolder', fontSize: '20px', textAlign: 'center', color: 'red', textTransform: 'uppercase' }}>Tóm tắt quá trình khám</DialogTitle>
            <DialogContent dividers sx={{pl: '15px', pr: '15px'}}>
                <Box sx={{pl: 6, pr: 6}}>
                    <List sx={{p: 0}}>
                        <Box>
                            {mainDataExaminingForConclusion.length !== 0 ? 
                                <div className='container-complete-examining'>
                                    <div className='category-complete-examining'>
                                        {mainDataExaminingForConclusion.categories.map((categoriesItem, categoriesIndex) => (
                                            <>
                                                <Box>
                                                    <Typography sx={{fontSize: '1.25rem', fontWeight: 'bolder', color: 'deeppink'}}>{categoriesItem.categoryName}</Typography>
                                                    {categoriesItem.categoryContents.map((categoryContentsItem, categoryContentsIndex) => (
                                                        <div className='table-category-complete-examining' style={{marginBottom: '10px'}} key={`categoryContents ${categoryContentsIndex}`}>
                                                            <Typography variant='subtitle1' sx={{fontWeight: 'bolder', fontSize: '20px', textAlign: 'center'}}>{categoryContentsItem.categoryContentTitle}</Typography>
                                                            

                                                            {categoryContentsItem.categoryContentQuestions.map((questionItem, questionIndex) => (
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
                                                                                <Grid item xs={2.5} 
                                                                                    sx={{border: '2px solid rgb(218,220,224)', borderTop: '0px', borderRight: '0px', p: 0.5, display: 'flex', justifyContent: 'center'}}>
                                                                                        <Checkbox disabled checked={questionItem.categoryContentAnswer}
                                                                                        sx={{'& .MuiSvgIcon-fontSizeMedium': {fontSize: '1.2rem'}}} color='error'/>
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
                                                                                            <TextareaAutosize className='textarea-autosize' rows={1} disabled defaultValue={questionItem.categoryContentAnswer}/>
                                                                                        </div>
                                                                                    </div>
                                                                                </Grid>
                                                                            </>
                                                                        }                                                                                                                                                                          
                                                                    </Box>
                                                                </Grid>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </Box>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            :
                                <Typography variant='h6' sx={{color: 'blue', fontWeight: 'bolder'}}>Không có nội dung nào được khám.</Typography>
                            }
                        </Box>
        
                    </List>
                </Box>
            </DialogContent>
            <DialogActions>
                <div style={{width: '100%', padding: '8px 50px 8px 50px'}}>
                    <TextareaAutosize placeholder='Kết luận của bác sĩ' style={{width: '100%', padding: '15px', fontSize: '17px', marginBottom: '4px'}}/>

                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Stack spacing={1} direction="row">
                            <Button sx={{fontSize: '17px', textTransform: 'none'}} variant='contained'
                                >Lưu (F4)</Button>
                            <Button sx={{fontSize: '17px', textTransform: 'none'}} variant='contained' color={'error'}
                                onClick={() => props.setOpenModalCompleteExamining(false)}>Đóng (ESC)</Button>
                        </Stack>
                    </div>
                </div>                
            </DialogActions>
            </Dialog>
        </>
    )
}

export default CompleteExamining