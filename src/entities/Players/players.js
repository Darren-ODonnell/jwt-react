import { Player, PLAYERS } from '../../common/globals'
import { addPlayer, deletePlayerById, getPlayers, updatePlayer } from "../../services/PlayerService";
import { addMessage } from "../../common/helper";



export const playerColumnDefs = [
    { headerName: 'Firstname'      , field: 'firstname'   , type: 'String' , min: 5   , max: 45  , required: true },
    { headerName: 'Lastname'       , field: 'lastname'    , type: 'String' , min: 5   , max: 45  , required: true },
    { headerName: 'Irish Firstname', field: 'firstnameI'  , type: 'String' , min: 5   , max: 45  , required: true },
    { headerName: 'Irish Lastname' , field: 'lastnameI'   , type: 'String' , min: 5   , max: 45  , required: true },
    { headerName: 'Year of Birth'  , field: 'yob'         , type: 'Integer', min: 2000, max: 2100, required: true },
    { headerName: 'Address'        , field: 'address'     , type: 'String' , min: 5   , max: 125 , required: true },
    { headerName: 'Email'          , field: 'email'       , type: 'Email'  , min: 5   , max: 100 , required: true },
    { headerName: 'Phone'          , field: 'phone'       , type: 'String' , min: 7   , max: 15  , required: true },
    { headerName: 'Phone ICE'      , field: 'phoneIce'    , type: 'String' , min: 7   , max: 15  , required: true },
    { headerName: 'Registered'     , field: 'registered'  , type: 'Boolean', min: 0   , max: 1   , required: true },
    { headerName: 'Grade'          , field: 'grade'       , type: 'String' , min: 5   , max: 15  , required: true },
    { headerName: 'Availability'   , field: 'availability', type: 'Boolean', min: 0   , max: 1   , required: true },
];

export const playerInitialValue = {
    firstname : "", lastname: "", firstnameI  : "", lastnameI: "",
    yob       : "", address : "", email       : "", phone    : "", phoneIce: "",
    registered: "", grade   : "", availability: ""
};

const actions = {
    add       : addPlayer,
    update    : updatePlayer,
    deleteById: deletePlayerById,
    list      : getPlayers
};

export const playerData = {
    messages    : addMessage(Player),
    type        : Player,
    actions     : actions,
    entity      : PLAYERS,
    initialValue: playerInitialValue,
    columnDefs  : playerColumnDefs,

};

// export const PlayerEditForm = (row) => {
//     const { register, handleSubmit, watch, formState: { errors } } = useForm();
//     const onSubmit = data => console.log(data);
//
//     return (
//         <form className="list-wrapper new-club-form new-club-input" onSubmit={handleSubmit(onSubmit)}>
//             {/* register your input into the hook by invoking the "register" function */}
//             <Input disabled defaultValue = {row.id}          placeholder  = 'Firstname Id'   {...register( 'id'  ) }  />
//             <Input defaultValue          = {row.firstname}   placeholder  = 'Firstname'      {...register( 'firstname'          , { required: true } ) }  />
//             <Input defaultValue          = {row.lastname}    placeholder  = 'Lastname'       {...register( 'lastname'           , { required: true } ) }  />
//             <Input defaultValue          = {row.firstnameI}  placeholder  = 'Irish Firstname'{...register( 'firstnameI'         , { required: true } ) }  />
//             <Input defaultValue          = {row.lastnameI}   placeholder  = 'Irish Lastname' {...register( 'lastnameI'          , { required: true } ) }  />
//             <Input defaultValue          = {row.yob}         placeholder  = 'Year of Birth'  {...register( 'yob'                , { required: true } ) }  />
//             <Input defaultValue          = {row.address}     placeholder  = 'Address'        {...register( 'address'            , { required: false } ) }  />
//             <Input defaultValue          = {row.email}       placeholder  = 'Email'          {...register( 'email'              , { required: false } ) }  />
//             <Input defaultValue          = {row.phone}       placeholder  = 'Phone'          {...register( 'phone'              , { required: false } ) }  />
//             <Input defaultValue          = {row.phoneIce}    placeholder  = 'Phone ICE'      {...register( 'phoneIce'           , { required: false } ) }  />
//             <Input defaultValue          = {row.registered}  placeholder  = 'Registered'     {...register( 'registered'         , { required: false } ) }  />
//             <Input defaultValue          = {row.grade}       placeholder  = 'Grade'          {...register( 'grade'              , { required: false } ) }  />
//             <Input defaultValue          = {row.availability} placeholder = 'Availability'   {...register( 'availability'       , { required: false } ) }  />
//
//             {/* errors will return when field validation fails  */}
//             {errors.lastname && <span>Lastname field is required</span>}
//             {errors.lastnameI && <span>Irish Lastname field is required</span>}
//             {errors.firstname && <span>Firstname field is required</span>}
//             {errors.firstnameI && <span>Irish Firstname field is required</span>}
//             {errors.yob && <span>Year of Birth is required</span>}
//
//
//             <Input type="submit"/>
//         </form>
//     )
// }
//
// export const PlayerAddForm = () => {
//     const { register, handleSubmit, watch, formState: { errors } } = useForm();
//     const onSubmit = data => console.log(data);
//
//     return (
//         <form className="list-wrapper new-club-form new-club-input" onSubmit={handleSubmit(onSubmit)}>
//             {/* register your input into the hook by invoking the "register" function */}
//
//             <Input defaultValue = ""       placeholder = 'Firstname'      {...register( 'firstname'   , { required: true } ) }  />
//             <Input defaultValue = ""       placeholder = 'Lastname'       {...register( 'lastname'    , { required: true } ) }  />
//             <Input defaultValue = ""       placeholder = 'Irish Firstname'{...register( 'firstnameI'  , { required: true } ) }  />
//             <Input defaultValue = ""       placeholder = 'Irish Lastname' {...register( 'lastnameI'   , { required: true } ) }  />
//             <Input defaultValue = ""       placeholder = 'Year of Birth'  {...register( 'yob'         , { required: true } ) }  />
//             <Input defaultValue = ""       placeholder = 'Address'        {...register( 'address'     , { required: false } ) }  />
//             <Input defaultValue = ""       placeholder = 'Email'          {...register( 'email'       , { required: false } ) }  />
//             <Input defaultValue = ""       placeholder = 'Phone'          {...register( 'phone'       , { required: false } ) }  />
//             <Input defaultValue = ""       placeholder = 'Phone ICE'      {...register( 'phoneIce'    , { required: false } ) }  />
//             <Input defaultValue = {true}   placeholder = 'Registered'     {...register( 'registered'  , { required: false } ) }  />
//             <Input defaultValue = ""       placeholder = 'Grade'          {...register( 'grade'       , { required: false } ) }  />
//             <Input defaultValue = ""       placeholder = 'Availability'   {...register( 'availability', { required: false } ) }  />
//
//             {/* errors will return when field validation fails  */}
//             {errors.lastname && <span>Lastname field is required</span>}
//             {errors.lastnameI && <span>Irish Lastname field is required</span>}
//             {errors.firstname && <span>Firstname field is required</span>}
//             {errors.firstnameI && <span>Irish Firstname field is required</span>}
//             {errors.yob && <span>Year of Birth is required</span>}
//
//             <Input type="submit"/>
//         </form>
//     )
// }