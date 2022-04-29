import React from "react";
import { Button, Dialog, TextField } from "@mui/material";
import {  DialogActions, DialogContent, DialogTitle } from "@mui/material";

export const FormEditDialog = ({open, handleClose, data, onChange, handleFormSubmit, colDefs, messages}) => {

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" >
                <DialogTitle id="alert-dialog-title"> { data.id ? messages.update : messages.create } </DialogTitle>
                <DialogContent >
                    { colDefs.map( ( prop, index ) => {
                        return <TextField
                             key={ index }
                             id={ prop.field }
                             value={ data.field }
                             onChange={ e => onChange(e) }
                             placeholder={ "Enter " + prop.headerName }
                             label={ prop.headerName }
                             variant="outlined"
                             margin="dense"
                             fullWidth  />
                                })
                      }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="outlined"> Cancel </Button>
                    <Button  color="primary" onClick={()=>handleFormSubmit()} variant="contained"> { data.id?"Update":"Submit"} </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
