import React, { useState, useContext, useEffect } from 'react';
//mui theme
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
//components
import ListPatientsRegister from './ListPatientsRegister';
import BookMedical from './BookMedical';

function MainMedicalRegister() {
  const [openModalInfoPantients, setOpenModalInfoPantients] = useState(false);

  const [openModalHealthRecords, setOpenModalHealthRecords] = useState(false);

  const [openModalOldDisease, setOpenModalOldDisease] = useState(false);

  const handleCloseModalInfoPantients = () => {
    if(openModalInfoPantients){
      setOpenModalInfoPantients(false);
    }
  }

  const handleBookMedical = () => {
    if(openModalHealthRecords){
      setOpenModalHealthRecords(false);
    }
    else{
      setOpenModalHealthRecords(true);
    }
  }

  const handleResetField = () => {
    alert('ban da nhan f4');
  }

  const handleOpenOldDiseaseModal = () => {
    if(openModalOldDisease){
      setOpenModalOldDisease(false);
    }
    else{
      setOpenModalOldDisease(true);
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if(event.keyCode === 27){
        //esc open modal info pantients
        openModalInfoPantients === true ? handleCloseModalInfoPantients() : event.preventDefault();
      }
      else if(event.keyCode === 113){
        //f2 open modal book medical
        openModalOldDisease === true || openModalInfoPantients === true ? event.preventDefault() : handleBookMedical();
      }
      else if(event.keyCode === 115){
        //f4 reset fields
        openModalInfoPantients === true || openModalHealthRecords === true || openModalOldDisease === true ? event.preventDefault() : handleResetField();
      }
      else if(event.keyCode === 119){
        //f8 open modal old disease
        openModalInfoPantients === true || openModalHealthRecords === true ? event.preventDefault() : handleOpenOldDiseaseModal();
      }
      else{

      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openModalInfoPantients, openModalHealthRecords, openModalOldDisease]);

  return (
    <>
         <Container maxWidth="xl" sx={{mt: 11}}>
            <Box sx={{ bgcolor: '#fff', height: 'auto'}} >
                <Grid container spacing={2} sx={{p: 0}}>
                    <Grid item xs={5}>
                      <ListPatientsRegister openModalInfoPantients={openModalInfoPantients} setOpenModalInfoPantients={setOpenModalInfoPantients}/>
                    </Grid>
            
                    <Grid item xs={7}>
                      <BookMedical 
                        openModalHealthRecords={openModalHealthRecords} setOpenModalHealthRecords={setOpenModalHealthRecords} 
                        openModalOldDisease={openModalOldDisease} setOpenModalOldDisease={setOpenModalOldDisease} 
                      />
                    </Grid>
                </Grid>
            </Box>
         </Container>
    </>
  )
}

export default MainMedicalRegister