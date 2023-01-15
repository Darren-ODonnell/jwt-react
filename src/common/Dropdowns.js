import {Form} from 'react-bootstrap'
import {useState} from "react";
import {Select, menuItem, FormControl, InputLabel} from '@material-ui/core'

// general dropdown used by the entity dropdowns below

// sample data f
// ]=-[por each dropdown
export const dates = []
export const times = []
export const players = [
    "Aherne, Kate",
    "Barrett, Sophie ",
    "Barron, Emma",
    "Begley, Hannah",
    "Birmingham, Caoimhe",
    "Browne, Emily",
    "Clohessy, Ciara",
    "Connolly, Róisín",
    "Corcoran, Laura",
    "Dalton, Sarah",
    "Darcy, Aisling",
    "Dawson, Caragh",
    "Devlin, Cáitríona",
    "Doherty, Niamh",
    "Douglas, Jane",
    "Dunne, Orla",
    "Fallon, Julie",
    "Fallon, Lisa",
    "Foley, Grainne",
    "Gannon, Aisling",
    "Gannon, Claire",
    "Gannon, Niamh",
    "Gough, Caroline",
    "Hegarty, Hannah",
    "Hoare, Ellie",
    "Joyce, Sarah",
    "Kavanagh, Holly",
    "Kearney, Lauren",
    "Keegan, Eve",
    "Kennedy, Leisha",
    "Kilbane, Clodagh",
    "Lewis, Ava",
    "Mccarthy, Faye",
    "McGinnell, Susan",
    "Molloy, Aisling",
    "Molloy, Aoife",
    "Morris, Ciara",
    "Nearney, Una",
    "Nicoletti, Clíodhna ",
    "Nolan, Aoife",
    "Nolan, Sinéad",
    "Noone, Maria",
    "Nugent, Abi",
    "Nugent, Holly",
    "O’Malley, Helen",
    "O’Riordan, Ciara",
    "O’Riordan, Eimear",
    "Quinn, Sorcha",
    "Russell, Niamh",
    "Thomas, Sarah",
    "Walsh, Aoife",
    "Warren, Emily",
    "Woods, Róisín",
    "Young, Ellie",


]
export const statNames = [
    "Block",
    "CatchFail",
    "CatchSuccess",
    "Free Pass",
    "Free Score",
    "Hook",
    "Handpass ",
    "Handpass Fail",
    "Opp Puck Out Long",
    "Opp Puck Out Short",
    "Pass Blocked",
    "Pass Long",
    "Puck Out Long",
    "Puck Out Short",
    "Pass Short",
    "Ruck",
    "Save Body",
    "Save Catch",
    "Score Goal",
    "Score Point",
    "Score Side Line",
    "Solo Fail",
    "Save Hurl",
    "Score Miss",
    "Solo Pass",
    "Solo Score",
    "Stand up",
    "Substitute Off",
    "Substitute On",

]
export const teams = [
    "Castleknock",
    "Ballinteer St Johns",
    "Ballyboden St Endas",
    "Na Fianna",
    "Naomh Mearnóg",
    "Lucan Sarsfields",
    "Naomh Jude",
    "Naomh Uinsionn",
    "Kilmacud Crokes",
    "Good Counsel Liffey Gaels",
    "Faughs Celtic",
    "Cuala",
    "Skerries Harps",
    "Erins Isle",
    "St Oliver Plunkett/Eoghan Ruadh",
]
export const positions = [
    "Goal Keeper",
    "Left Full Back",
    "Full Back",
    "Right Full Back",
    "Left Half Back",
    "Centre Back",
    "Right Half Back",
    "Left Midfield",
    "Right Midfield",
    "Left Half Forward",
    "Centre Forward",
    "Right Half Forward",
    "Left Full Forward",
    "Full Forward",
    "Right Full Forward",

]
export const pitchgrids = [
    "A1",
    "A2",
    "A3",
    "B1",
    "B2",
    "B3",
    "C1",
    "C2",
    "C3",
    "D1",
    "D2",
    "D3",
    "E1",
    "E2",
    "E3",
]
export const competitions = [
    "League Cup",
    "Summer Cup",
    "Championship",

]


// used by the dropdown functions following
export const formSelect = (array, current, setVal, val) => {
    return (
        <Form.Select value={val} onChange={(e) => setVal(e.target.value)}>
            {array.map((o) => {
                const { name, id } = o;
                return <option value={id}>{name}</option>;
            })}
        </Form.Select>
    );
}

// dropdowns for each field
export const EventNameDropDown = (eventNames, current) => {
    const [val, setVal] = useState();
    console.log(val);

    formSelect({
        data   : [...eventNames],
        current: current,
        setCell: setVal,
        cell   : val
    })


}
export const PlayerDropdown = (players, current) => {
    const [val, setVal] = useState();
    console.log(val);
// get Players
    formSelect({
        data   : [...players],
        current: current,
        setCell: setVal,
        cell   : val
    })

}
export const PitchgridDropdown = (pitchgrids, current) => {
    const [val, setVal] = useState();
    console.log(val);
// get PitchGrids
    formSelect({
        data   : [...pitchgrids],
        current: current,
        setCell: setVal,
        cell   : val
    })
}
export const PositionDropdown = (positions, current) => {
    const [val, setVal] = useState();
    console.log(val);
// get Positions
    formSelect({
        data   : [...positions],
        current: current,
        setCell: setVal,
        cell   : val
    })
}
export const HomeTeamDropdown = (teams, current, homeTeam = {}, awayTeam = {}) => {
    const [val, setVal] = useState();
    console.log(val);
// get Teams
    formSelect({
        data   : [...teams],
        current: current,
        setCell: setVal,
        cell   : val
    })
}
export const AwayTeamDropdown = (teams, current, homeTeam = {}, awayTeam = {})  => {
    const [val, setVal] = useState();
    console.log(val);
// get Teams
    formSelect({
        data   : [...teams],
        current: current,
        setCell: setVal,
        cell   : val
    })
}
export const CompetitionDropdown = (competitions, current) => {
    const [val, setVal] = useState();
    console.log(val);
// get Competitions
    formSelect({
        data   : [...competitions],
        current: current,
        setCell: setVal,
        cell   : val
    })
}
export const YearDropdown = (years, current) => {
    const [val, setVal] = useState();
    console.log(val);
// get Years
    formSelect({
        data   : [...years],
        current: current,
        setCell: setVal,
        cell   : val
    })
}
export const DateDropdown = (dates, current) => {
    const [val, setVal] = useState();
    console.log(val);
// get Dates
    formSelect({
        data   : [...dates],
        current: current,
        setCell: setVal,
        cell   : val
    })
}
export const TimeDropdown = (times, current) => {
    const [val, setVal] = useState();
    console.log(val);
// Get Times
    formSelect({
        data   : [...times],
        current: current,
        setCell: setVal,
        cell   : val
    })
}

// array filtering methods
export const FixtureDropdown = (fixtures, current) => {
    const [val, setVal] = useState();
    console.log(val);
// Get Fixtures
    formSelect({
        data   : [...fixtures],
        current: current,
        setCell: setVal,
        cell   : val
    })

}
export const filterNotEqualTo = (array, current) => {
    const filtered = array.filter(function (value, index, arr) {
        return value != current;
    })
    return filtered
}
export const filterLessThan = (array, current) => {
    const filtered = array.filter(function (value, index, arr) {
        return value < current;
    })
    return filtered
}
export const filterGreaterThan = (array, current) => {
    const filtered = array.filter(function (value, index, arr) {
        return value > current;
    })
    return filtered
}



