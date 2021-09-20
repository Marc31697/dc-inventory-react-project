import React, { useState } from 'react';
import {DataGrid, GridColDef, GridSelectionModel } from '@material-ui/data-grid';
import { server_calls } from '../../api/server';
import { useGetData } from '../../custom-hooks';
import { Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
  } from '@material-ui/core'
import { CharacterForm } from '../../components';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'hero_name',
      headerName: 'Hero',
      width: 150,
      editable: true,
    },
    {
      field: 'real_name',
      headerName: 'Real Name',
      width: 150,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 110,
      editable: true,
    },
    {
      field: 'comics_appeared_in',
      headerName: 'Comics Appeared In',
      width: 110,
      editable: true,
    },
    {
      field: 'super_power',
      headerName: 'Superpower',
      width: 110,
      editable: true,
    },
  ];

export const DataTable = () => {
  let {characterData, getData} = useGetData();
  let [open, setOpen] = useState(false)
  let [gridData, setData] = useState<GridSelectionModel>([])

  let handleOpen = () => {
    setOpen(true)
  }
  let handleClose = () => {
    setOpen(false)
  }

  let deleteData = () => {
    server_calls.delete(`${gridData[0]}`)
    getData()
  }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <h2>Characters in Inventory</h2>
            <DataGrid rows ={characterData} columns={columns} pageSize={5} checkboxSelection onSelectionModelChange={(newSelectionModel) => {
            setData(newSelectionModel);
            }}
            selectionModel={gridData}
            {...characterData}/>
            <Button onClick={handleOpen}>Update</Button>
            <Button variant="contained" color='secondary' onClick={deleteData}>Delete</Button>

            {/* Dialog Pop up starts here */}
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
              <DialogTitle id='form-dialog-title'>Update Character {gridData[0]}</DialogTitle>
              <DialogContent>
                <DialogContentText>Character: {gridData[0]}</DialogContentText>
                <CharacterForm id={`${gridData[0]}`} />
              </DialogContent>
                <Button onClick = {handleClose} color='primary'>Cancel</Button>
            </Dialog>
        </div>
    )
}