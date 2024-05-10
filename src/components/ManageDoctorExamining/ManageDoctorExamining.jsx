import React, { useState, useContext, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';

//mui icon
import SendIcon from '@mui/icons-material/Send';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Divider } from '@mui/material';

function ManageDoctorExamining(props) {

    const [openCollapse, setOpenCollapse] = useState([]);

    const handleClick = (index) => {
        setOpenCollapse((prevOpen) => {
            const newOpen = [...prevOpen];
            newOpen[index] = !newOpen[index];
            return newOpen;
        });
    };

    const initialData = {
            category: [
                {
                    categoryName: 'Nhóm máu mẹ / con', 
                    categoryContent: [
                        {
                            categoryContentTitle: '',
                            categoryContentQuestion: [
                                {categoryContentQuestion: 'Nhóm máu mẹ', categoryContentQuestionType: 'string', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Nhóm máu con', categoryContentQuestionType: 'string', categoryContentAnswer: '', categoryContentNote: ''}
                            ]
                        }
                    ]
                },

                {
                    categoryName: 'Tiền sử bệnh lý của mẹ', 
                    categoryContent: [
                        {
                            categoryContentTitle: 'Bệnh lý trước mang thai', 
                            categoryContentQuestion: [
                                {categoryContentQuestion: 'Hen suyễn', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Tiểu đường', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Béo phì', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Bệnh lý tuyến giáp', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Bệnh tim', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Bệnh thận mạn', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Sức khỏe răng miệng kém', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Khác', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            ]
                        },

                        {
                            categoryContentTitle: 'Biến chứng thai kỳ',
                            categoryContentQuestion: [
                                {categoryContentQuestion: 'Tiểu đường thai kỳ', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Tăng huyết áp thai kỳ', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Tiền sản giật', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Sản giật', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Khác', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            ]
                        },

                        {
                            categoryContentTitle: 'Bệnh lý nhiễm trùng',
                            categoryContentQuestion: [
                                {categoryContentQuestion: 'Nhiễm Streptococcus nhóm B', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: 'Điều trị: '},
                                {categoryContentQuestion: 'Viêm màng ối', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Nhiễm trùng tiết niệu', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'HIV', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Viêm gan B', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Giang mai', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Nhiễm Toxoplasma', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Nhiễm CMV', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Khác', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            ]
                        },

                        {
                            categoryContentTitle: 'Thuốc / độc chất',
                            categoryContentQuestion: [
                                {categoryContentQuestion: 'Thuốc lá', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Rượu', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Thuốc đang sử dụng', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Thuốc đã sử dụng', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Khác', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            ]
                        }
                    ],
                },

                {
                    categoryName: 'Tiền căn sản khoa', 
                    categoryContent: [
                        {
                            categoryContentTitle: '',
                            categoryContentQuestion: [
                                {categoryContentQuestion: 'Tuổi thai tuần', categoryContentQuestionType: 'string', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Cân nặng (kg)', categoryContentQuestionType: 'string', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Chiều dài (cm)', categoryContentQuestionType: 'string', categoryContentAnswer: '', categoryContentNote: ''},
                                {categoryContentQuestion: 'Vòng đầu (cm)', categoryContentQuestionType: 'string', categoryContentAnswer: '', categoryContentNote: ''},
                            ]
                        }
                    ]
                },

                {
                    categoryName: 'Sổ sức khỏe',
                    categoryContent: [
                        // {
                        //     categoryContentTitle: 'Khám và theo dõi sức khỏe định kỳ',
                        //     listHealthRecords: [
                        //         {periodExams: 'Khám 21 tháng', status: 0, dateExams: '20/04/2024', doctorExams: '', conclude: ''},
                        //         {periodExams: 'Khám 20 tháng', status: 2, dateExams: '10/03/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 2'},
                        //         {periodExams: 'Khám 18 tháng', status: 2, dateExams: '01/01/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 1'},
                        //         {periodExams: 'Khám 20 tháng', status: 2, dateExams: '10/03/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 2'},
                        //         {periodExams: 'Khám 18 tháng', status: 2, dateExams: '01/01/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 1'},
                        //         {periodExams: 'Khám 20 tháng', status: 2, dateExams: '10/03/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 2'},
                        //         {periodExams: 'Khám 18 tháng', status: 2, dateExams: '01/01/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 1'}
                        //       ]
                        // }
                    ]
                },

                {
                    categoryName: 'Đánh giá dinh dưỡng',
                    categoryContent: []
                },

                {
                    categoryName: 'Sổ tiêm ngừa',
                    categoryContent: []
                }
            ]
        }
    
    const [data, setData] = useState(initialData);

    const handleCloseModalDoctorExamnining = (event, reason) => {
        if(reason && reason === "backdropClick"){
            return;
          }
          else{
            props.setOpenDoctorExamining(false);
          }
    }

    const handleAnswerCheckQuestion = (categoryIndex, contentIndex, questionIndex) => {
        const newData = { ...data };
        newData.category[categoryIndex].categoryContent[contentIndex].categoryContentQuestion[questionIndex].categoryContentAnswer = true;
        setData(newData);

        console.log(newData);
    }

    const handleNoteCheckQuestion = (value, categoryIndex, contentIndex, questionIndex) => {
        const newData = { ...data };
        newData.category[categoryIndex].categoryContent[contentIndex].categoryContentQuestion[questionIndex].categoryContentNote = value;
        setData(newData);

        console.log(newData);
    }

    return (
        <>
            <Dialog fullWidth={true} maxWidth={'md'} open={props.openDoctorExamining} onClose={(event, reason) => handleCloseModalDoctorExamnining(event, reason)} disableEscapeKeyDown={true}>
                <DialogContent sx={{p: '12px'}}>
                    <Box sx={{ml: '10px', mr: '10px', mb: '3px'}}>
                        <Typography variant='h6' sx={{fontWeight: 'bolder', fontSize: '1.35rem'}}>Tạ Thị Phương Thảo</Typography>
                    </Box>

                    <Divider />

                    <Box component='div' sx={{ml: '4px', mr: '4px'}}>
                        <List sx={{pt: '4px', pb: '4px'}}>
                            {
                                data.category.map((categoryItem, categoryIndex) => (
                                    <>
                                        <ListItemButton onClick={() => handleClick(categoryIndex)} key={`category ${categoryIndex}`} sx={{pt: '4px', pb: '4px'}}>
                                            <ListItemIcon sx={{minWidth: '30px', '& .MuiSvgIcon-fontSizeMedium': {fontSize: '1rem', color: '#2962ff'}}}><SendIcon /></ListItemIcon>
                                            <ListItemText primary={categoryItem.categoryName} sx={{'& .MuiListItemText-primary': {fontSize: '1.4rem', fontWeight: 'bolder', color: 'deeppink'}}}/>
                                        </ListItemButton>

                                        <Collapse in={openCollapse[categoryIndex]} timeout="auto" unmountOnExit sx={{ml: '45px', mr: '45px'}}>
                                                    {categoryItem.categoryContent.map((contentItem, contentIndex) => (
                                                        <Box sx={{pt: 0, pl: 0.2, pr: 0.2}} key={`categoryContent ${contentIndex}`}>
                                                            <Typography variant='h6' sx={{fontWeight: 'bolder', mt: 0.5, mb: 0.3}}>{contentItem.categoryContentTitle}</Typography>

                                                            {contentItem.categoryContentQuestion.map((questionItem, questionIndex) => (
                                                                <Box key={`categoryContentQuestion ${questionIndex}`}>
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
                                                                        
                                                                        <Grid item xs={4} sx={{border: '2px solid rgb(218,220,224)', borderTop: '0px', borderRight: '0px', p: 0.7, display: 'flex', alignItems: 'center'}}>
                                                                            <Typography variant='subtitle1' sx={{fontSize: '1.1rem'}}>{questionItem.categoryContentQuestion}</Typography>
                                                                        </Grid>

                                                                        {
                                                                            questionItem.categoryContentQuestionType === 'check' ? 
                                                                                <>
                                                                                    <Grid item xs={1} sx={{border: '2px solid rgb(218,220,224)', borderTop: '0px', borderRight: '0px', p: 0.7, display: 'flex', justifyContent: 'center'}}>
                                                                                        <Checkbox color='error' sx={{'& .MuiSvgIcon-fontSizeMedium': {fontSize: '1.35rem'}}} onClick={(e) => handleAnswerCheckQuestion(categoryIndex, contentIndex, questionIndex)}></Checkbox>
                                                                                    </Grid>

                                                                                    <Grid item xs={7} >
                                                                                        <div contentEditable style={{border: '2px solid rgb(218,220,224)', borderTop: '0px', p: 0.7, height: '100%', width: '100%'}}>

                                                                                        </div>
                                                                                    </Grid>
                                                                                </>
                                                                                
                                                                            :
                                                                                <>
                                                                                    <Grid item xs={8}>
                                                                                        <input type='text' style={{border: '2px solid rgb(218,220,224)', borderTop: '0px', p: 0.7, height: '100%', width: '100%'}}></input>
                                                                                    </Grid>
                                                                                </>
                                                                        }
                                                                    </Grid>
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                    ))}

                                                    {/* {categoryItem.categoryContent.map()} */}
                                                
                                        </Collapse>
                                    </>
                                ))
                            }
                        </List>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ManageDoctorExamining