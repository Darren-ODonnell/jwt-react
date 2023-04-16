import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";
import {useTheme} from "@mui/material/styles";
// dropdown menu to select from fixtures date that have no teamsheets yet.
const FixtureSelect = (props) => {
   if (!props.fixtures) return // no fixtures found with teamsheets

   const handleSelectEvent = (event) => {
      const selectedValue = event.target.value;
      const selectedFixture = props.fixtures.find((fixture) => fixture.fixtureDate === selectedValue);
      props.handleAdd({...props, id: selectedFixture.id, selectedFixture})
   };

   const FixtureDropDown = (props) => {
      // console.log( "Export Page - dropdown" )
      const theme = useTheme()
      return (
         <>
            <FormControl variant="outlined" color="primary">
               <InputLabel className="select-label  "> CREATE TEAMSHEET FOR DATE </InputLabel>

               <Select className="custom-label"  //value={ exportType } defaultValue={exportType}
                       onChange={(event) => handleSelectEvent(event)}
                       defaultValue=""
                       sx={{
                          background: theme.palette.primary.main,
                          height: 40, /* adjust this value to match the label height */
                          width: 270,
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                          '&:hover': {
                             backgroundColor: 'green',
                          },
                       }}
                       MenuProps={{
                          sx: {
                             marginTop: '-10px',
                             '& .MuiMenuItem-root:hover': {
                                backgroundColor: 'green',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                             },
                          },
                       }}
               >{props.fixtures.map((f) => (
                     <MenuItem key={f.fixtureDate} value={f.fixtureDate}>{f.fixtureDate}</MenuItem>
                  )
               )}
               </Select>
            </FormControl>
         </>
      )
   }
   return (
      <div style={{marginBottom: '10px'}}>
         <FixtureDropDown {...props}/>
      </div>
   )
}
export default FixtureSelect;