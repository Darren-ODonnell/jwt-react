import { FIRSTNAMES, Firstname } from '../../common/globals'
import { addFirstname, deleteFirstnameById, getFirstnames, updateFirstname } from "../../services/FirstnameService";
import { addMessage } from "../../common/helper";

export const firstnameColumnDefs = [
    { headerName: 'Firstname'      , field: 'firstname'     , type: 'String', min: 3, max: 45, required: true  },
    { headerName: 'Irish Firstname', field: 'firstnameIrish', type: 'String', min: 3, max: 45, required: true  },
];

export const firstnameInitialValue = {
    firstname     : "",
    firstnameIrish: ""
};

const actions = {
    add       : addFirstname,
    update    : updateFirstname,
    deleteById: deleteFirstnameById,
    list      : getFirstnames
};

export const firstnameData = {
    messages    : addMessage(Firstname),
    type        : Firstname,
    actions     : actions,
    entity      : FIRSTNAMES,
    initialValue: firstnameInitialValue,
    columnDefs  : firstnameColumnDefs
};
// export const FirstnameEditForm = (row) => {
//     const { register, handleSubmit, watch, formState: { errors } } = useForm();
//     const onSubmit = data => console.log(data);
//
//     return (
//         <form className="list-wrapper new-club-form new-club-input" onSubmit={handleSubmit(onSubmit)}>
//             {/* register your input into the hook by invoking the "register" function */}
//
//             <Input  disabled defaultValue = { row.id }              placeholder = "Firstname ID"        {...register("id")} />
//             <Input  defaultValue          = { row.firstname }       placeholder = "Firstname"           {...register("firstname"     , { required: true })} />
//             <Input  defaultValue          = { row.firstnameIrish }  placeholder = "Firstname Irish"     {...register("firstnameIrish", { required: true })} />
//
//             {/* errors will return when field validation fails  */}
//             {errors.name && <span>Firstname field is required</span>}
//             {errors.name && <span>Irish Firstname field is required</span>}
//
//             <Input type="submit"/>
//         </form>
//     )
// }
