import { CLUBS, Club } from '../../common/globals'
import { addClub, deleteClubById, getClubs, updateClub } from "../../services/ClubService";
import { addMessage } from "../../common/helper";
import { useForm } from "react-hook-form";
import {Input} from "@material-ui/core";

export const clubColumnDefs = [
    // { headerName: 'ID',             field: 'id',            type: 'Number', min:3, max:10, required: true   },
    { headerName: 'Club Name'    , field: 'name'        , type: 'String', min: 3, max: 45, required: true   },
    { headerName: 'Contact Name' , field: 'contactName' , type: 'String', min: 3, max: 45, required: false  },
    { headerName: 'Contact Email', field: 'contactEmail', type: 'Email' , min: 5, max: 45, required: false  },
    { headerName: 'Contact Phone', field: 'contactPhone', type: 'String', min: 7, max: 15, required: false  },
    { headerName: 'Pitches'      , field: 'pitches'     , type: 'String', min: 3, max: 45, required: false  },
    { headerName: 'Colours'      , field: 'colours'     , type: 'String', min: 6, max: 20, required: false  },
];

export const clubInitialValue = {
    name        : "",
    contactName : "",
    contactEmail: "",
    contactPhone: "",
    pitches     : "",
    colours     : ""
}

const actions = {
    add       : addClub,
    update    : updateClub,
    deleteById: deleteClubById,
    list      : getClubs
};

export const clubData = {
    messages    : addMessage(Club),
    type        : Club,
    actions     : actions,
    entity      : CLUBS,
    initialValue: clubInitialValue,
    columnDefs  : clubColumnDefs
};

export const ClubEditForm = (row) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form className="list-wrapper new-club-form new-club-input" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}

            <Input  disabled defaultValue = {row.id} placeholder           = "Club ID"       {...register("id")} />
            <Input  defaultValue          = {row.name} placeholder         = "Club Name"     {...register("name"             , { required: true })} />
            <Input  defaultValue          = {row.contactName} placeholder  = "Contact Name"  {...register("contactName"      , { required: true })} />
            <Input  defaultValue          = {row.contactEmail} placeholder = "Contact Email" {...register("contactEmail")} />
            <Input  defaultValue          = {row.contactPhone} placeholder = "Contact Phone" {...register("contactPhone")} />
            <Input  defaultValue          = {row.pitches} placeholder      = "Pitches"       {...register("pitches")     } />
            <Input  defaultValue          = {row.colours} placeholder      = "Colours"       {...register("colours")     } />

            {/* errors will return when field validation fails  */}
            {errors.name && <span>Club Name field is required</span>}
            {errors.contactName && <span>Club Contact Name field is required</span>}

            <Input type="submit"/>
        </form>
    )
}

export const ClubAddForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form className="list-wrapper new-club-form new-club-input" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}

            <Input  defaultValue="" placeholder="Club Name"     {...register("name",        { required: true })} />
            <Input  defaultValue="" placeholder="Contact Name"  {...register("contactName", { required: true })} />
            <Input  defaultValue="" placeholder="Contact Email" {...register("contactEmail")} />
            <Input  defaultValue="" placeholder="Contact Phone" {...register("contactPhone")} />
            <Input  defaultValue="" placeholder="Pitches"       {...register("pitches")     } />
            <Input  defaultValue="" placeholder="Colours"       {...register("colours")     } />

            {/* errors will return when field validation fails  */}
            {errors.name && <span>Club Name field is required</span>}
            {errors.contactName && <span>Club Contact Name field is required</span>}

            <Input type="submit"/>
        </form>
    )
}