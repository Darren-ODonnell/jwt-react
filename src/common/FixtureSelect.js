import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";

const FixtureSelect = ( props ) => {
   const renderCount = useRef( 0 );

   useEffect( () => {
      renderCount.current++;
      console.log( 'Render count - FixtureSelect:', renderCount.current );
   } );

   if ( !props.fixtures ) return // no fixtures found with teamsheets

   const handleSelectEvent = ( event ) => {
      const selectedValue = event.target.value;
      const selectedFixture = props.fixtures.find( ( fixture ) => fixture.fixtureDate === selectedValue );
      props.setFixture( selectedFixture );

      // The last teamsheet will will have a reference to the that fixture
      // fixture of last teamsheets changed to current fixture
      const updatedTeamsheets = props.lastTeamsheets.map( ( teamSheet ) => {
         return { ...teamSheet, fixture: selectedFixture };
      } );

      // update state
      props.setPreviousTeamsheets( updatedTeamsheets )
      console.log( "Selected Fixture Date: ", selectedFixture )
      props.setTeamsheetPrepared( false )
      props.handleAdd( props )
   };

   const FixtureDropDown = ( props ) => {
      console.log( "Export Page - dropdown" )
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
      <div style={ { marginBottom: '10px' } }>
         <FixtureDropDown { ...props }/>
      </div>
   )
}
export default FixtureSelect;