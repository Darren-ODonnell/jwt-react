import { METHODS } from '../common/globals'
import { addMessage, copyFormColDefs, copyGridColDefs } from "../common/helper";

export const Club = 'Club'

const table = {name:Club}

export const clubColumnDefs = [
    // { headerName: 'ID',             field: 'id',            type: 'Number', min:3, max:10, required: true   },
    {headerName: 'Club Name', field: 'name', type: 'String', min: 3, max: 45, required: true},
    {headerName: 'Contact Name', field: 'contactName', type: 'String', min: 3, max: 45, required: false},
    {headerName: 'Contact Email', field: 'contactEmail', type: 'Email', min: 5, max: 45, required: false},
    {headerName: 'Contact Phone', field: 'contactPhone', type: 'String', min: 7, max: 15, required: false},
    {headerName: 'Pitches', field: 'pitches', type: 'String', min: 3, max: 45, required: false},
    {headerName: 'Colours', field: 'colours', type: 'String', min: 6, max: 20, required: false},
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

    return data;
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
    formColDefs: copyFormColDefs(clubColumnDefs), // form column definitions
    gridColDefs: copyGridColDefs(clubColumnDefs, table), // Grid column definitions
    columnDefs: clubColumnDefs,
    methods: apiRequests,
    dropDown: clubDropDown,
    homePage : HOME_PAGE,
    gridLoader: gridLoader
};

