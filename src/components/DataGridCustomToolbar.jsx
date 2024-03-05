import React, { useState } from 'react'

import { GridToolbarDensitySelector, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarColumnsButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import FlexBetween from './FlexBetween';

import { IconButton, TextField, InputAdornment, Tooltip, useTheme, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Stack, FormControlLabel  } from '@mui/material';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';


const DataGridCustomToolbar = ({selectionModel}) => {


    const handleDelete = () => {
        console.log(selectionModel)
      }
  

  return (
    <>
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />

            <GridToolbarFilterButton />
        </FlexBetween>

  
        

        {/* <TextField 
        label="Search..."
        sx={{mb: "0.5rem", width:"15rem"}}
        // onChange={(e) => setSearchInput(e.target.value)}
        // value={searchInput}
        InputProps={{
            endAdornment: (
                <InputAdornment position='end'  >
                    <IconButton onClick={() => {}}>
                     <Search />
                    </IconButton>
                </InputAdornment>
            )
        }}
        /> */}
                    <GridToolbarQuickFilter
                    
  quickFilterParser={(searchInput) =>
    searchInput.split(',').map((value) => value.trim())
  }
  quickFilterFormatter={(quickFilterValues) => quickFilterValues.join(', ')}
  debounceMs={200} // time before applying the new quick filter value
/>

{
      selectionModel.length > 0 ? 
     <Tooltip title="Delete Selected Data" placement="top-end" arrow enterDelay={500} leaveDelay={200}>
        <IconButton onClick={handleDelete} sx={{cursor: "pointer", color: `red !important}`}} >
        <DeleteForeverTwoToneIcon />
        </IconButton>
        </Tooltip> : null
     }


     {/* <FlexBetween>
     <Tooltip title="Add Data" placement="top-end" arrow enterDelay={500} leaveDelay={200}>
        <IconButton onClick={handleOpenform}  sx={{cursor: "pointer", color: `${theme.palette.secondary[200]} !important}`}} >
        <AddCircleIcon  sx={{cursor: "pointer"}}  />
        </IconButton>
        </Tooltip>

  


        </FlexBetween> */}
        
        </FlexBetween>  
    </GridToolbarContainer>

    {/* <Dialog open={open} onClose={handleCloseform} fullWidth>
      <DialogTitle>User Screen</DialogTitle>
      <DialogContent>
        <DialogContentText>This Screen About HealthCare Details</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleCloseform} variant="contained">Close</Button>
      </DialogActions>
    </Dialog> */}


    {/* <Dialog open={open} onClose={handleCloseform} fullWidth>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>Do You Want To Delete This Item</DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button color="success" variant="contained">Yes</Button>
        <Button color="error" onClick={handleCloseform} variant="contained">Close</Button>
      </DialogActions>
    </Dialog> */}




    {/* <HealthCareModal open={openModal} setOpenModal={setOpenModal} sleekOpen={sleekOpen} setSleekOpen={setSleekOpen} /> */}

    </>
  )
}

export default DataGridCustomToolbar
