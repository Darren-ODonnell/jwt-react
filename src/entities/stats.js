import {METHODS} from "../common/globals";
import {addMessage} from "../common/helper";

export const Stat = 'Stat'


export const statColumnDefs = [
    {headerName: 'Player Name'   , field: 'playerName'  , width: 150, },
    {headerName: 'Fixture Date'  , field: 'fixtureDate' , width: 120, },
    {headerName: 'Stat Name'     , field: 'statName'    , width: 120 , },
    {headerName: 'Success'       , field: 'success'     , width: 150, },
    {headerName: 'Half'          , field: 'half'        , width: 100 , },
    {headerName: 'Pitch location', field: 'pitchgrid'   , width: 150, },
    {headerName: 'Time Occurred' , field: 'timeOccurred', width: 120 , },
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
            id: row.id,
            playerName: row.player.lastname + ", " + row.player.firstname,
            fixtureDate: row.fixture.fixtureDate,
            statName: row.statName.name,
            success: row.success,
            half: row.half,
            pitchgrid: pgrid,
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
    methods: apiRequests,
    gridLoader: gridLoader
};



