import { LASTNAMES, Lastname } from '../../common/globals'
import { addLastname, deleteLastnameById, getLastnames, updateLastname } from "../../services/LastnameService";
import { addMessage } from "../../common/helper";
import { useForm } from "react-hook-form";
import Input from "@material-ui/core/Input";
import React from "react";

export const lastnameColumnDefs = [
    { headerName: 'Lastname'      , field: 'lastname'     , type: 'String', min: 3, max: 45, required: true  },
    { headerName: 'Irish Lastname', field: 'lastnameIrish', type: 'String', min: 3, max: 45, required: true  },
];

export const lastnameInitialValue = {
    lastname     : "",
    lastnameIrish: ""
};

const actions = {
    add       : addLastname,
    update    : updateLastname,
    deleteById: deleteLastnameById,
    list      : getLastnames
};

export const lastnameData = {
    messages    : addMessage(Lastname),
    type        : Lastname,
    actions     : actions,
    entity      : LASTNAMES,
    initialValue: lastnameInitialValue,
    columnDefs  : lastnameColumnDefs
};

export const LastnameEditForm = (row) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form className="list-wrapper new-club-form new-club-input" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}

            <Input  disabled defaultValue = { row.id } placeholder            = "Lastname Id"        {...register("id" )} />
            <Input  defaultValue          = { row.lastname } placeholder      = "Lastname"           {...register("lastname"     , { required: true })} />
            <Input  defaultValue          = { row.lastnameIrish } placeholder = "Lastname Irish"     {...register("lastnameIrish", { required: true })} />

            {/* errors will return when field validation fails  */}
            {errors.name && <span>Lastname field is required</span>}
            {errors.name && <span>Irish Lastname field is required</span>}

            <Input type="submit"/>
        </form>
    )
}