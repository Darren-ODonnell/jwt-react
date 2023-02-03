import {METHODS} from '../common/globals'
import {addMessage} from "../common/helper";

export const Club = 'Club'

export const clubColumnDefs = [
    {headerName: 'Club Name', field: 'name', width: 150,},
    {headerName: 'Contact Name', field: 'contactName', width: 150,},
    {headerName: 'Contact Email', field: 'contactEmail', width: 150,},
    {headerName: 'Contact Phone', field: 'contactPhone', width: 150,},
    {headerName: 'Pitches', field: 'pitches', width: 150,},
    {headerName: 'Colours', field: 'colours', width: 150,},
];

const clubDropDown = false;

export const clubInitialValue = {
    name: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    pitches: "",
    colours: ""
}

const gridLoader = (data) => {
    let newData = [];
    data.forEach(row => {
        const newRow = {
            id : row.id,
            name : row.name,
            contactName: row.contactName,
            contactEmail: row.contactEmail,
            contactPhone: row.contactPhone,
            pitches: row.pitches,
            colours: row.colours,
        }
        newData.push(newRow)
    })
    return newData
}

// clubs
const CLUB_ADD        = "/club/add";
const CLUB_DELETE     = "/club/delete/";
const CLUB_FINDBYID   = "/club/findById/";
const CLUB_FINDBYNAME = "/club/findByName/";
const CLUB_LIST       = "/club/list";
const CLUB_UPDATE     = "/club/update";

export const HOME_PAGE = CLUB_LIST;

export const CLUB_URLS = {
    add: CLUB_ADD,
    delete: CLUB_DELETE,
    findById: CLUB_FINDBYID,
    findByName: CLUB_FINDBYNAME,
    list: CLUB_LIST,
    update: CLUB_UPDATE
}
const apiRequests = {
    list      : { method: METHODS.GET   , url: CLUB_URLS.list},
    findById  : { method: METHODS.GET   , url: CLUB_URLS.findById},
    findByName: { method: METHODS.GET   , url: CLUB_URLS.findByName},
    update    : { method: METHODS.POST  , url: CLUB_URLS.update},
    add       : { method: METHODS.PUT   , url: CLUB_URLS.add},
    delete    : {method : METHODS.DELETE, url: CLUB_URLS.delete}
}

export const clubData = {
    messages: addMessage(Club),
    type: Club,
    initialValue: clubInitialValue,
    // formColDefs: copyFormColDefs(clubColumnDefs), // form column definitions
    formColDefs: clubColumnDefs, // form column definitions

    // gridColDefs: copyGridColDefs(clubColumnDefs, table), // Grid column definitions
    gridColDefs: clubColumnDefs, // Grid column definitions
    columnDefs: clubColumnDefs,
    methods: apiRequests,
    dropDown: clubDropDown,
    homePage: HOME_PAGE,
    gridLoader: gridLoader
};

