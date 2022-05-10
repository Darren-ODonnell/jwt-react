import React from 'react'
import { COMPETITIONS, Competition } from '../../common/globals'
import { addCompetition, deleteCompetitionById, getCompetitions, updateCompetition } from "../../services/CompetitionService";
import { addMessage } from "../../common/helper";
import { useForm } from "react-hook-form";
import {Input} from "@material-ui/core";

export const competitionColumnDefs = [
    { headerName: 'Competition Name', field: 'name'  , type: 'String' , min: 5, max: 45, required: true},
    { headerName: 'Season'          , field: 'season', type: 'Integer', min: 4, max: 4 , required: true},
];

export const competitionInitialValue = {
    name  : "",
    season: ""
};

const actions = {
    add       : addCompetition,
    update    : updateCompetition,
    deleteById: deleteCompetitionById,
    list      : getCompetitions
};

export const competitionData = {
    messages    : addMessage(Competition),
    type        : Competition,
    actions     : actions,
    entity      : COMPETITIONS,
    initialValue: competitionInitialValue,
    columnDefs  : competitionColumnDefs
};

export const CompetitionEditForm = (row) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form className="list-wrapper new-club-form new-club-input" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}

            <Input  disabled defaultValue = { row.id } placeholder = "Competition ID"     {...register("id") } />
            <Input  defaultValue = { row.name } placeholder = "Competition Name"     {...register("name", { required: true })} />

            {/* errors will return when field validation fails  */}
            {errors.name && <span>Competition Name field is required</span>}

            <Input type="submit"/>
        </form>
    )
}