Ex: indicate problems found.
Cx: New Code additions (new features)
Rx: Refactoring
Ix: Investigations
Ux: Files not currently used - (possible to remove? - left for now)

As elements are finished - move below Completed

# Errors
    E4. Add Entity not working for any entity - add api code to achieve same
    E6: Delete does not work on any entity
    E11: Update does not work for any entity
    E12: 
    E13: 

    
# Refactoring
    R1: change to using useAxios and standardise api code layouts
    R2: simplify Grid/form to extract form
    R5: Dont export getRequests from ApiRequests, use as conmst and refer by ApiRequest.getRequest...  
    R6: Reduce the number of export const objects ... like R5
    R7: 

# Investigations
    I1: Can grid be changed to a hook - useGrid? and similarly useForm?
    I2: How to implement - forgotPassword
    I3: Use of Charts ?
    I4: Check if useToken is necessary / if so, can it be included in AuthService?
    I6: nCheck useForm (from react-hook-form) for form handling ratherv than grid

# New Code Additions
    C1: Add Plug and PLay Teamsheet selection
    C2: Add pictures for players
    C3: Add club logos to tables and teamsheets
    C5: Some sample Event data required to test report displays 
    C6: 
    C7:

# Unused Files
    U1: auth/useUser
    U2: auth/PrivateRoute
    U3: auth/user.service
    U6: StatService
    U7: 
    U8: 


# In Progress
    E5: Tables with foreign key data are not displayed correctly - events
        Need some sample data to test!!!
    E3. Update form not populated with row data
    I6: Check useForm (from react-hook-form) for form handling ratherv than grid
    
    import React from "react";
    import { useForm } from "react-hook-form";
    
    export default function App() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => console.log(data, e);
    const onError = (errors, e) => console.log(errors, e);
    
    return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
    <input {...register("firstName")} />
    <input {...register("lastName")} />
    <button type="submit">Submit</button>
    </form>
    );
    }
    >useForm

    </> register
    </> unregister
    </> formState
    </> watch
    </> handleSubmit
    </> reset
    </> resetField
    </> setError
    </> clearErrors
    </> setValue
    </> setFocus
    </> getValues
    </> getFieldState
    </> trigger
    </> control

    </>useController
    
        </> Controller
    
    </>useFormContext
    </>useWatch
    </>useFormState
    
        </> ErrorMessage
    
    </>useFieldArray

# Completed

    R3: Build up AuthService to include login/logout/register etc
        moved all the auth related functions into AuthService
    E7: Logout not working
        added code to routes, navbar and AuthService 
    C4: Add Reports MenuDropDownItem (PlayerStats and TeamStats dummy placegHolders for now)
        added code to routes and navbar for same
    R4: Move all references to localStorage to AuthService
        localStorage is used to store User and Token - all part of Authorisation
    E1. Login form appears with LoggedOutNavBar - change behaviour - just show logged out navbar - let user pick what action to take
        extra "/" included in route caused this to occur.
    E2. After login the clubs list appears - change behaviour - as above but showing loggedIn navbar
        window.location was set to CLUB_LIST - changed to "/"
    E8: R4 caused errors
        string passed rather than an object
    E9: After login - systens repeatedly attempts to login - spring continuous streams - browser 
        call to getClubs removed from NavBarSelect. (unclear how this caused the fault!)
    I5: getClubs causes FormDialog to be called 4 times - Not a problem
        it re-renders each time state is changed, once data is changed it returns.
    U4: auth/LoginSuccess, auth/LoginFailure 
        - deleted - files were empty anyway

    E10: Foreign key details not display on any entity
        All the data has been captured from the server.
        Redo the columns for these tables
        data2 created - could not change the stgate variable data.


