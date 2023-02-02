import {METHODS} from "../common/globals";
import {addMessage} from "../common/helper";

export const Stat = 'Stat'


export const statColumnDefs = [
    {headerName: 'Player Name', field: 'playerName', width: 150,},
    {headerName: 'Fixture Date', field: 'fixtureDate', width: 100,},
    {headerName: 'Stat Name', field: 'statName', width: 80,},
    {headerName: 'Success', field: 'success', width: 150,},
    {headerName: 'Half', field: 'half', width: 60,},
    {headerName: 'Pitch location', field: 'pitchgrid', width: 150,},
    {headerName: 'Time Occurred', field: 'timeOccurred', width: 80,},
];

export const statInitialValue = {
    playerName  : "",
    fixtureDate : "",
    statName    : "",
    success     : "",
    half        : "",
    pitchGrid   : "",
    timeOccurred: ""
};
// stats
const STAT_ADD      = "/stat/add";
const STAT_DELETE   = "/stat/delete/";
const STAT_FINDBYID = "/stat/findById/";
const STAT_LIST     = "/stat/list";
const STAT_UPDATE   = "/stat/update";

const STAT_URLS = {
    add     : STAT_ADD,
    delete  : STAT_DELETE,
    findById: STAT_FINDBYID,
    list    : STAT_LIST,
    update  : STAT_UPDATE,
}
const apiRequests = {
    list    : {method: METHODS.GET   , url: STAT_URLS.list},
    findById: {method: METHODS.GET   , url: STAT_URLS.findById},
    update  : {method: METHODS.POST  , url: STAT_URLS.update},
    add     : {method: METHODS.PUT   , url: STAT_URLS.add},
    delete  : {method: METHODS.DELETE, url: STAT_URLS.delete}
}

const gridLoader = (data) => {
    let newData = [];
    data.forEach(row => {

        let pgrid = row.location ? row.location.name + " (" + row.location.id + ")" : ""

        const newRow = {
            playerName  : row.player.firstname + " " + row.player.lastname,
            fixtureDate : row.fixture.fixtureDate,
            statName    : row.statName.name,
            success     : row.success,
            half        : row.half,
            pitchgrid   : pgrid,
            timeOccurred: row.id.timeOccurred
        }
        newData.push(newRow)
    })
    return newData;
}


export const statData = {
    messages: addMessage(Stat),
    type: Stat,
    initialValue: statInitialValue,
    columnDefs: statColumnDefs,
    formColDefs: statColumnDefs, // form column definitions
    gridColDefs: statColumnDefs, // Grid column definitions
    methods: apiRequests,
    gridLoader: gridLoader
};



