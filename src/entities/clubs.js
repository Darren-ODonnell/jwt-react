import { Club, METHODS, CLUB_URLS } from '../common/globals'
import { addMessage, copyFormColDefs, copyGridColDefs } from "../common/helper";

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

const apiRequests = {
    list      : { method: METHODS.GET   , url: CLUB_URLS.list},
    findById  : { method: METHODS.GET   , url: CLUB_URLS.findById},
    findByName: { method: METHODS.GET   , url: CLUB_URLS.findByName},
    update    : { method: METHODS.POST  , url: CLUB_URLS.update},
    add       : { method: METHODS.PUT   , url: CLUB_URLS.add},
    delete: {method: METHODS.DELETE, url: CLUB_URLS.delete}
}

const gridLoader = (data) => {

    return data;
}

export const clubData = {
    messages: addMessage(Club),
    type: Club,
    initialValue: clubInitialValue,
    formColDefs: copyFormColDefs(clubColumnDefs), // form column definitions
    gridColDefs: copyGridColDefs(clubColumnDefs), // Grid column definitions
    columnDefs: clubColumnDefs,
    methods: apiRequests,
    dropDown: clubDropDown,
    gridLoader: gridLoader
};

