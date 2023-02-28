import {METHODS} from '../common/globals'
import {addMessage} from "../common/helper";
import {forEach} from "react-bootstrap/ElementChildren";

export const Competition = 'Competition'
const location = "/competition"

export const competitionColumnDefs = [
    {
        headerName: 'Competition Name', field: 'name', width: 200,
        cellEditorParams: {
            required: true,
            validator: function (value) {
                if (!value) {
                    return {valid: false, msg: 'Competition Grade is required'}
                }
                return true;
            }
        }
    },
    {headerName: 'Competition Irish Name', field: 'irishName', width: 200,},
    {
        headerName: 'Grade', field: 'grade', width: 100,
        cellEditorParams: {
            required: true,
            validator: function (value) {
                if (!value) {
                    return {valid: false, msg: 'Competition Grade is required'}
                }
                return true;
            }
        }
    },
    {
        headerName: 'Season', field: 'season', width: 150,
        cellEditorParams: {
            required: true,
            validator: function (value) {
                if (!value) {
                    return {valid: false, msg: 'Competition Season is required'}
                }
                return true;
            }
        }
    },
];
export const competitionInitialValue = {
    name: "",
    irishName: "",
    grade: "",
    season: ""
};

const COMPETITION_ADD = "/competition/add";
const COMPETITION_DELETE = "/competition/delete";
const COMPETITION_FINDBYID = "/competition/findById/";
const COMPETITION_FINDBYNAME = "/competition/findByName/";
const COMPETITION_LIST = "/competition/list";
const COMPETITION_UPDATE = "/competition/update";


export const COMPETITION_URLS = {
    add: COMPETITION_ADD,
    delete: COMPETITION_DELETE,
    findByName: COMPETITION_FINDBYNAME,
    findById: COMPETITION_FINDBYID,
    list: COMPETITION_LIST,
    update: COMPETITION_UPDATE,
}

const apiRequests = {
    list: {method: METHODS.GET, url: COMPETITION_URLS.list},
    findById: {method: METHODS.GET, url: COMPETITION_URLS.findById},
    findByName: {method: METHODS.GET, url: COMPETITION_URLS.findByName},
    update: {method: METHODS.POST, url: COMPETITION_URLS.update},
    add: {method: METHODS.PUT, url: COMPETITION_URLS.add},
    delete: {method: METHODS.DELETE, url: COMPETITION_URLS.delete}
}
const gridLoader = (data) => {
    let newData = [];
    data.forEach(row => {
        const newRow = {
            id: row.id,
            name: row.name,
            irishName: row.irishName,
            grade: row.grade,
            season: row.season,
        }
        newData.push(newRow)
    })
    return newData
}

const validate = (formValues) => {
    // Competition name must be set
    // season must be set and and >= last year
    // Grade must be set

    return (formValues.name.length > 0 && formValues.grade.length > 0 && formValues.season >= new Date().getFullYear() - 1)
}


export const competitionData = {
    messages: addMessage(Competition),
    type: Competition,
    initialValue: competitionInitialValue,
    columnDefs: competitionColumnDefs,
    methods: apiRequests,
    gridLoader: gridLoader,
    validate: validate,
    location: location,
};







