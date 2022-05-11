import React from "react";
import { Button, Dialog, TextField } from "@mui/material";
import {  DialogActions, DialogContent, DialogTitle } from "@mui/material";

// close popup window
const handleClose =         (setOpen) => {
    setOpen(false);
    // setFormData(props.initialValue);
};

// , formData, actions, setOpen, formColDefs
const handleFormSubmit = (formData) => {
    let data = {...formData}
    // formData.preventDefault();
    console.log('Event',formData)




    console.log('CompetitionName',data.competitionName)
    console.log('FixtureDate',data.fixtureDate)
    console.log('Season',data.season)
    console.log('Round',data.round)
    console.log('Mui-1',data.mui-1)
    console.log('FormData',formData)

    // if (formData.id) { // updating a user
    //     const confirm = window.confirm("Are you sure, you want to update this row ?")
    //     confirm && actions.update(formData.id)
    //         .then( resp => {
    //             handleClose(setOpen);
    //             actions.update();
    //         } )
    // } else { // adding new user
    //     const valid = checkFormData(formData, formColDefs)
    //
    //     actions.add(formData)
    //         .then(resp => {
    //             handleClose(setOpen);
    //             actions.add();
    //         })
    // }
}



export const FormDialog = ({ open, setOpen, data, onChange, colDefs, messages, addButton}) => {
    // console.log(data)

    return (
        <div>
            { addButton() }
            <Dialog
                open             = { open }
                onClose          = {handleClose}
                aria-labelledby  = "alert-dialog-title"
                aria-describedby = "alert-dialog-description" >
                <DialogTitle id  = "alert-dialog-title"> { data.id ? messages.update: messages.create } </DialogTitle>
                <DialogContent >
                    { colDefs.map( ( prop, index ) => {
                        return <TextField
                             key         = { index }
                             id          = { prop.field }
                             value       = { data.field }
                             onChange    = { ( e ) => onChange(e) }
                             data        = { data }
                             placeholder = { "Enter " + prop.headerName }
                             label       = { prop.headerName }
                             variant     = "outlined"
                             margin      = "dense"
                             fullWidth  />
                             })
                      }
                </DialogContent>
                <DialogActions>
                    <Button onClick={ () => setOpen(false) }
                            color   = "secondary"
                            variant = "outlined"
                    > Cancel </Button>
                    <Button  type="submit"
                             color   = "primary"
                             onClick = { handleFormSubmit }
                             variant = "contained"
                    > {data.id ? "Update" : "Submit" } </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
// { open, setOpen, data, onChange, colDefs, messages, addButton, editForm, addForm}
export const FormDialog2 = (props) => {
    // console.log(data)

    return (
         <div>
            { props.addButton() }
            <Dialog
                open             = { props.open }
                onClose          = { props.handleClose }
                aria-labelledby  = "alert-dialog-title"
                aria-describedby = "alert-dialog-description" >
                <DialogTitle id  = "alert-dialog-title"> { props.data.id ? props.messages.update: props.messages.create } </DialogTitle>
                <DialogContent >
                    { props.colDefs.map( ( prop, index ) => {
                        return <TextField
                            key         = { index }
                            id          = { prop.field }
                            value       = { props.data.field }
                            onChange    = { e => props.onChange(e) }
                            data        = { props.data }
                            placeholder = { "Enter " + prop.headerName }
                            label       = { prop.headerName }
                            variant     = "outlined"
                            margin      = "dense"
                            fullWidth  />
                    })
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={ () => props.setOpen(false) }
                            color   = "secondary"
                            variant = "outlined"
                    > Cancel </Button>

                    <Button type="submit" onClick={() => handleFormSubmit(props.formData)}>Submit</Button>
                    {/*<Button  type="submit"*/}
                    {/*         color   = "primary"*/}
                    {/*         onClick = { handleFormSubmit }*/}
                    {/*         variant = "contained"*/}
                    {/*> {props.data.id ? "Update" : "Submit" } </Button>*/}
                </DialogActions>
            </Dialog>
        </div>

    );
}
