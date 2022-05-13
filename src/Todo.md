Ex: indicate problems found.
Cx: New Code additions (new features)
Rx: Refactoring
Ix: Investigations
Ux: Files not currently used - (possible to remove? - left for now)

As elements are finished - move below Completed

# Errors
    E11: Update does not work for any entity
    E12: Test additional of new Data to all entities (use in conjuntion with delete to remove additional test entries
    E14: Attempting to call update causes a hook call violation (PostRequest())
    E15: Error saving new record
Uncaught TypeError: Cannot read properties of undefined (reading 'then')
at handleFormSubmit (FormDialog.js:32:1)

    E16: Empty teamsheet submitted - 
TeamsheetService.js:18 Uncaught TypeError: Cannot destructure property 'data' of '_api_ApiService__WEBPACK_IMPORTED_MODULE_0__.default.PutRequest(...)' as it is undefined.
at Object.addTeamsheet [as add] (TeamsheetService.js:18:1)

    E17: 

    
# Refactoring
    R1: change to using useAxios and standardise api code layouts
    R2: simplify Grid/form to extract form
    R7: 
    R8: 
    R9: 


# Investigations
    I1: Can grid be changed to a hook - useGrid? and similarly useForm?
    I2: How to implement - forgotPassword
    I3: Use of Charts ?
    I4: Check if useToken is necessary / if so, can it be included in AuthService?
    I5: 
    I6: 
    I7: 

# New Code Additions
    C1: Add Plug and PLay Teamsheet selection
    C2: Add pictures for players
    C3: Add club logos to tables and teamsheets
    C5: Some sample Event data required to test report displays 
    C6: 
    C7:
    C8:

# Unused Files
    U1: auth/useUser
    U2: auth/PrivateRoute
    U3: auth/user.service
    U7: entities/Players/ClubListItem, NewClubForm, js/css
    U8: entities/Players/CompetitionListItem, NewCompetitionForm
    U9: entities/Players/FirstnameListItem, NewFirstnameForm
    Ù10: entities/Players/LastnameListItem, NewLastnameForm
    Ù11: entities/Players/FixtureListItem, NewFixtureForm
    Ù12: entities/Players/PlayerListItem, NewPlayerForm
    Ù13: grid/FormEditDialog
    Ù14: NavBar/menuItems
    U15:
    U16:
    U17:

# In Progress
    E5: Tables with foreign key data are not displayed correctly 
        - Teamsheets -Done
        - Fixtures - Done 
        - Events - incomplete - need data to test.
     
    E6: Delete does not work on any entity

    E14: Attempting to call update causes a hook call violation (PostRequest())
         Although I cannot see what the issue is with the call. (error below)
Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM) - NO
2. You might be breaking the Rules of Hooks - not as far as I know
3. You might have more than one copy of React in the same app - NO
   
delete package.json.lock and node_modules - npm i - did not fix


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
        data2 created - could not change the state variable data.

    E4. Add Entity not working for any entity - add api code to achieve same
        When adding a colDef, the ettribute field was omitted
    I6: Check useForm (from react-hook-form) for form handling ratherv than grid
        Abandoned - found fault with existing grid/form
    E3. Update form not populated with row data
        used props.data.field to access field name  
        s/b props.data[props.field]
    E13: After fixing E3 - Add New record now shows row data.
    R6: Reduce the number of export const objects ... like R5
        Url constants now grouped by Entity eg CLUB_LIST -> CLUB_URLS.list
        Only one import needed rather than multiple
    R5: Dont export getRequests from ApiRequests, use as const and refer by ApiService.getRequest...
    U6: StatService
        Deleted


===
remove3d from packagejson
,
"peerDependencies": {
"@mui/material": "^5.0.0",
"react": "^17.0.2",
"react-dom": "^17.0.2"
},
  "plugins": [
    "react-hooks"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }