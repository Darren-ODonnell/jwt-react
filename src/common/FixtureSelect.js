import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React, {useEffect, useRef} from "react";
import {useTheme} from "@mui/material/styles";
import './fixture-select.css'

const FixtureSelect = (props) => {
   const renderCount = useRef(0);

   useEffect(() => {
      renderCount.current++;
      console.log('Render count - FixtureSelect:', renderCount.current);
   });

   if (!props.fixtures) return // no fixtures found with teamsheets

   const handleSelectEvent = (event) => {
      const selectedValue = event.target.value;
      const selectedFixture = props.fixtures.find((fixture) => fixture.fixtureDate === selectedValue);
      props.setFixture(selectedFixture);

      // The last teamsheet will ref the last fixture
      // fixture of last teamsheets changed to current fixture
      const updatedTeamsheets = props.lastTeamsheets.map((teamSheet) => {
         return {...teamSheet, fixture: selectedFixture};
      });

      // update state
      props.setLastTeamsheets(updatedTeamsheets)
      console.log("Selected Fixture Date: ", selectedFixture)
      props.setTeamsheetPrepared(false)
      props.handleAdd(props)
   };

   const FixtureDropDown = (props) => {
      console.log("Export Page - dropdown")
      const theme = useTheme()

      return (
         <>
            <FormControl variant="outlined" color="primary">
               <InputLabel id="fixture-date-label" className="select-label">Create Teamsheet for Date</InputLabel>
               <Select  //value={ exportType } defaultValue={exportType}
                  onChange={(event) => handleSelectEvent(event)}
                  defaultValue=""
                  sx={{
                     background: theme.palette.primary.main,
                     color: theme.palette.primary.contrastText,
                     height: 36,
                     width: 250,
                     marginTop: 0,
                     whitespace: 'normal',
                     overflowWrap: 'break-word',
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