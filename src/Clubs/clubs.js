import { CLUBS, Club } from '../globals'
import { addClub, deleteClubById, getClubs, updateClub } from "../services/ClubService";
import { addMessage } from "../generic/helper";

export const clubColumnDefs = [
    // { headerName: 'ID',             field: 'id',            type: 'Number', min:3, max:10, required: true   },
    { headerName: 'Club Name',      field: 'name',          type: 'String', min:3, max:45, required: true   },
    { headerName: 'Contact Name',   field: 'contactName',   type: 'String', min:3, max:45, required: false  },
    { headerName: 'Contact Email',  field: 'contactEmail',  type: 'Email',  min:5, max:45, required: false  },
    { headerName: 'Contact Phone',  field: 'contactPhone',  type: 'String', min:7, max:15, required: false  },
    { headerName: 'Pitches',        field: 'pitches',       type: 'String', min:3, max:45, required: false  },
    { headerName: 'Colours',        field: 'colours',       type: 'String', min:6, max:20, required: false  },
];

export const clubInitialValue = {
    name: "",
    contactName:"",
    contactEmail: "",
    contactPhone: "",
    pitches: "",
    colours: ""
}

const actions = {
    add: addClub,
    update : updateClub,
    deleteById: deleteClubById,
    list: getClubs
};

export const clubData = {
    messages: addMessage(Club),
    type: Club,
    actions: actions,
    entity: CLUBS,
    initialValue: clubInitialValue,
    columnDefs: clubColumnDefs
};