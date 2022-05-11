import {  FIXTURES, Fixture } from '../../common/globals'
import {addFixture, deleteFixtureById, getFixtures, updateFixture} from "../../services/FixtureService";
import { addMessage, datePicker, selectRound, selectSeason, timePicker } from "../../common/helper";
import { useForm } from "react-hook-form";
import Input from "@material-ui/core/Input";
import React, { useState } from "react";
import { getCompetitions } from "../../services/CompetitionService";
import { getClubs } from "../../services/ClubService";


export const fixtureColumnDefs = [
    { headerName: 'Competition Name', field: 'competitionName',type: 'String' , min: 8 , max: 60, required: true },
    { headerName: 'Home Team Name'  , field: 'homeTeamName'   ,type: 'String' , min: 8 , max: 60, required: true  },
    { headerName: 'Away Team Name'  , field: 'awayTeamName'   ,type: 'String' , min: 8 , max: 60, required: true  },
    { headerName: 'Fixture Date'    , field: 'fixtureDate'    ,type: 'Date'   , min: -1, max: 1 , required: true  },
    { headerName: 'Fixture Time'    , field: 'fixtureTime'    ,type: 'Time'   , min: 0 , max: 24, required: true  },
    { headerName: 'Season'          , field: 'season'         ,type: 'Integer', min: 4 , max: 4 , required: true  },
    { headerName: 'Round'           , field: 'round'          ,type: 'Integer', min: 1 , max: 20, required: true  },
];

export const fixtureInitialValue = {
    competitionName: "",
    homeTeamName   : "",
    awayTeamName   : "",
    fixtureDate    : "",
    fixtureTime    : "",
    season         : "",
    round          : ""
};

const actions = {
    add       : addFixture,
    update    : updateFixture,
    deleteById: deleteFixtureById,
    list      : getFixtures,
};




export const FixtureEditForm = (row) => {
    const { register , handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    // gather data to make form easier to read
    const competitions    = "CompetitionTest Name"  //getCompetitions();
    const clubs           = "Test Club"             //getClubs();
    const competitionName = "Competition Name Test" //getCompetitions(row.competitionId).name
    const homeTeamName    = "home team club name"   //getClubs(row.homeTeamId).name
    const awayTeamName    = "away team club name"   // getClubs(row.awayTeamId).name

    const thisYear        = Date.year;
    const seasons         = [thisYear ,thisYear+1, thisYear+2];
    const rounds          = [1 ,2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return (
        <form className="list-wrapper new-club-form new-club-input" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}

            <Input disabled defaultValue = { row.id }           placeholder             = 'Fixture ID'      {...register( 'id'  ) }  />
            <Input defaultValue          = { competitionName }  placeholder             = 'competition'     {...register( 'lastname'   , { required: true} ) }   />
            <Input defaultValue          = { homeTeamName }     placeholder             = 'Home Team'       {...register( 'homeTeamId' , { required: true } ) }  />
            <Input defaultValue          = { awayTeamName }     placeholder             = 'Away Team'       {...register( 'awayTeamId' , { required: true } ) }  />
            <Input defaultValue          = { datePicker(row.fixtureDate) }  placeholder = 'Fixture Date'    {...register( 'fixtureDate', { required: true  } ) } />
            <Input defaultValue          = { timePicker(row.fixtureTime) }  placeholder = 'Fixture Time'    {...register( 'fixtureTime', { required: false } ) } />
            <Input defaultValue          = { row.season }       placeholder             = 'Season'          {...register( 'season'     , { required: true } ) } />
            <Input defaultValue          = { row.round }        placeholder             = 'Round'           {...register( 'round'      , { required: false } ) } />

            {/* errors will return when field validation fails  */}
            {errors.competitionId && <span>Competition field is required</span>}
            {errors.homeTeamId && <span>Home Team field is required</span>}
            {errors.awayTeamId && <span>Away Team field is required</span>}
            {errors.fixtureDate && <span>Fixture Date field is required</span>}
            {errors.season && <span>Season Date field is required</span>}

            <Input type="submit"/>
        </form>
    )
}

export const FixtureAddForm = () => {
    const { register  , handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit  = data => console.log(data);

    // gather data to make form easier to read
    const competitions    = "CompetitionTest Name"  //getCompetitions();
    const clubs           = "Test Club"             //getClubs();
    const competitionName = "Competition Name Test" //getCompetitions(row.competitionId).name
    const homeTeamName    = "home team club name"   //getClubs(row.homeTeamId).name
    const awayTeamName    = "away team club name"   // getClubs(row.awayTeamId).name

    const thisYear        = Date.year;
    const seasons         = [thisYear ,thisYear+1, thisYear+2];
    const rounds          = [1 ,2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return (
        <form className="list-wrapper new-club-form new-club-input" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}

            <Input defaultValue = ""                placeholder = 'competition'     {...register( 'lastname'   , { required: true} ) }   />
            <Input defaultValue = ""                placeholder = 'Home Team'       {...register( 'homeTeamId' , { required: true } ) }  />
            <Input defaultValue = ""                placeholder = 'Away Team'       {...register( 'awayTeamId' , { required: true } ) }  />
            <Input defaultValue = { datePicker }    placeholder = 'Fixture Date'    {...register( 'fixtureDate', { required: true  } ) } />
            <Input defaultValue = { timePicker }    placeholder = 'Fixture Time'    {...register( 'fixtureTime', { required: false } ) } />
            <Input defaultValue = { selectSeason}   placeholder = 'Season'          {...register( 'season'     , { required: true } ) } />
            <Input defaultValue = { selectRound }   placeholder = 'Round'           {...register( 'round'      , { required: false } ) } />

            {/* errors will return when field validation fails  */}
            {errors.competitionId   && <span> Competition field is required  </span>}
            {errors.homeTeamId      && <span> Home Team field is required    </span>}
            {errors.awayTeamId      && <span> Away Team field is required    </span>}
            {errors.fixtureDate     && <span> Fixture Date field is required </span>}
            {errors.season          && <span> Season Date field is required  </span>}

            <Input type="submit"/>
        </form>
    )
}


export const fixtureData = {
    messages    : addMessage(Fixture),
    type        : Fixture,
    actions     : actions,
    entity      : FIXTURES,
    initialValue: fixtureInitialValue,
    columnDefs  : fixtureColumnDefs,
    editForm    : FixtureEditForm,
    addForm     : FixtureAddForm
};