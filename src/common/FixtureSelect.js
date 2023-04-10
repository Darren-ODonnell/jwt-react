import {FormControl, MenuItem, Select} from "@mui/material";
import React, {useEffect} from "react";
import {useTheme} from "@mui/material/styles";

const FixtureSelect = (props) => {

    useEffect(() => {
        console.log("Fixture: ", props.fixture)
    }, [props.fixture])

    if (!props.fixtures) return // no fixtures found with no teamsheets

    const handleSelectEvent = (event) => {
        const selectedValue = event.target.value;
        const selectedFixture = props.fixtures.find((fixture) => fixture.fixtureDate === selectedValue);
        props.setFixture(selectedFixture);

        const updatedTeamsheets = props.lastTeamsheets.map((teamSheet) => {
            return {
                ...teamSheet,
                fixture: selectedFixture,
            };
        });

        props.setLastTeamsheets(updatedTeamsheets)
        console.log("Selected Fixture Date: ", selectedFixture)
    };

    const FixtureDropDown = (props) => {
        // console.log("Export Page - dropdown")
        const theme = useTheme()

        return (
            <>
                <FormControl variant="outlined" color="primary">
                    <Select  //value={ exportType } defaultValue={exportType}
                        onChange={(event) => handleSelectEvent(event)}
                        defaultValue=""
                        sx={{
                            background: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            height: 38
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