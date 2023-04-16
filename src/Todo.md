Ex: indicate problems found.
Cx: New Code additions (new features)
Rx: Refactoring
Ix: Investigations
Ux: Files currently UnUsed -
Ig: Ignored for now

As elements are finished - move below Completed

Current Tasks - with comments on progress
=========================================

todo:

+ Get login/logout functionality working correctly
+ Admin and Coach should be able to login to desktop app.
+ Verify app works in Work,

# Errors

    E41: App does not logout after token has timed out.
         after timeout - delete old token - logout user - switch to loggedOutrNavbar
    E44: Should not be able to login as a User - only Admin allowed.
    E57: Fix app login to check that the token is good first.

    E65: 
    E66:
    E67:
    E68: 


# Refactoring
    R13: 
    R14: 
    R15: 

# Investigations
    I7: 
    I8: 

# New Code Additions
    C16: 
    C17: 

# Unused Files

    U17:
    U18:
    U19:

# Ignore for now
    IG01: 
    IG02: 
    IG03: 

# In Progress

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
    E9: After login - system repeatedly attempts to login - spring continuous streams - browser 
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
    R7: Removed all compile warnings
        Either commented out (in Helper) or deleted.
    U7: entities/Players/ClubListItem, NewClubForm, js/css
        Files deleted
    U8: entities/Players/CompetitionListItem, NewCompetitionForm
        Files deleted
    U9: entities/Players/FirstnameListItem, NewFirstnameForm
        Files deleted
    Ù10: entities/Players/LastnameListItem, NewLastnameForm
        Files deleted
    Ù11: entities/Players/FixtureListItem, NewFixtureForm
        Files deleted
    Ù12: entities/Players/PlayerListItem, NewPlayerForm
        Files deleted
    Ù14: NavBar/menuItems
        File deleted
    U15: useAxios
        File deleted
    E20: Foreign key data broken after axios call changes Teamsheets
        function called gridLoader added to teamsheets.js
        additional variable called gridloader addered to teamsheetData object
        buiddata removed from teamsheetservice. (no longer required) 
    E21: 'No rows to show' appears instead on Loading - when calling for rows from server
        Used thre loading state variable to controll what is rendered. loading ? <rendered stuff> : <loading message>;
    E20: Foreign key data broken after axios call changes Events
        created new method inside each of the entriry data files ( gridLoader() )
    E5: Tables with foreign key data are not displayed correctly 
        - Teamsheets -Done
        - Fixtures - Done 
    U16: All <Entity>List.js/css components removed...
        ClubList.js/css
        CompetitionList.js/css
        FixtureList.js/css
        FirstnameList.js/css
        LastnameList.js/css
        PlayersList.js/css
        - folders tidied up
    E23: aria-query used by ag-grid using a tag which the linter/react does not know about 
        Warning: Invalid aria prop `aria-description` on <div> tag. For details, see https://reactjs.org/link/invalid-aria-props
        at div
            This is caused by aria-query version being ahead of ag-grid - the linter does not know about 'aria-description'
            fix All ag-grid imports set to exact version rather than at least (^) and not the latest which is 27.3.0
        package.json before changes
        "@ag-grid-community/client-side-row-model": "^27.2.1",
        "@ag-grid-community/csv-export": "^27.2.1",
        "@ag-grid-community/react": "^27.2.1",
        "ag-grid-community": "^27.2.1",
        "ag-grid-react": "^27.2.0",
        after changes (npm i run after) 
        "@ag-grid-community/client-side-row-model": "27.2.1",
        "@ag-grid-community/csv-export": "27.2.1",
        "@ag-grid-community/react": "27.2.1",
        "ag-grid-community": "27.2.1",
        "ag-grid-react": "27.2.1",
    E24: Add is not working
        Postman form-data works
        Postman json does not
        trying to convert javascript to same form-data format that postman uses.
        use of FormData does not appear to work, and changes to data are not reflected in object!
        Fix: Changed spring controller to accept and Object, I was able to see what was coming in. An object within and object was 
        received. In React I changed the (in useAxios in ApiService) ...requestConfig to ...requestConfig.data, this fixed the mapping of the json data to the java object.
        Need tp go back now and fix the form-data and verify it will work.
        Record is added
    E18: Access to XMLHttpRequest at 'http://147.252.81.86:8080/' from origin 'http://localhost:3000' has been blocked by CORS
        policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is
        present on the requested resource.
        No longer an issues after change to useAxios code (E24 Fix)
    E15: Error saving new record
        Uncaught TypeError: Cannot read properties of undefined (reading 'then')
        at handleFormSubmit (FormDialog.js:32:1)
        No longer an issues after change to useAxios code (E24 fix)
    E14: Attempting to call update causes a hook call violation (PostRequest())
        Although I cannot see what the issue is with the call. (error below)
        1. Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:1. You might have mismatching versions of React and the renderer (such as React DOM) - NO
        2. You might be breaking the Rules of Hooks - not as far as I know
        3. You might have more than one copy of React in the same app - NO
        delete package.json.lock and node_modules - npm i - did not fix
        No longer an issues after change to useAxios code (E24 fix)
    E19: Refused to set unsafe header "Origin"
        No longer an issues after change to useAxios code (E24 fix)
    E14: Attempting to call update causes a hook call violation (PostRequest())
        No longer an issues after change to useAxios code (E24 fix)
    E15-E16-E17 attempting to fix a number of api errors
    Refactoring axios methods into a hook - Creating a useAxios hook
    changing entityData to include method and url to pass to axios hook.
    entity service may not be required - removed
    changing mydatagrid to use useAxios. - done
    All EntityServices are no loonger required. - removed
    Remove the actions prop from in MyDataGRid for FormDialog - done
    change handleFormSubmit to remove use of props.actions... - done
    - replace with axiosFetch from useAxios - done
    Complete
    R1: change to using useAxios and standardise api code layouts
        only set for list - look at how FormDialog can use this hook!
        Done
    R8: Simplify / re-organise  ---> Column def / EntityDataGrid / MyDataGrid and FormDialog
        EntityDataGrids - refactored out of the project. (Paths now passes the formData object)    
        Done
    R2: simplify Grid/form to extract form
        Done
    E16: Empty teamsheet submitted -
        TeamsheetService.js:18 Uncaught TypeError: Cannot destructure property 'data' of '_
        api_ApiService__WEBPACK_IMPORTED_MODULE_0__.default.PutRequest(...)' as it is undefined.
        at Object.addTeamsheet [as add] (TeamsheetService.js:18:1)
        (E24 Fix)
    E6: Delete does not work on any entity
        Delete from entity works but manual reload of grid is required to see updated data
        window.location.reload() used to refresh screen after update
    E25: Add Entity does not work on any entity
        Although Record is added - grid is not updated, must be manually updated!
        window.location.reload() used to refresh screen after update
    E11: Update does not work for any entity
        Although Record is updated - grid is not updated, must be manually updated!
        window.location.reload() used to refresh screen after update
    E12: Test addition of new Data to all entities (use in conjuntion with delete to remove additional test entries
        (E6, E11 and E25 Fix)
    R9: Change deleteById to simply delete, similarly for DELETEBYID to DELETE
    E27: Cannot delete from Competition
         After R9 complete, changed 'data: data' to 'data: {data}'.
    I1: Can grid be changed to a hook - useGrid? and similarly useForm? - Cancel
    I2: How to implement - forgotPassword - Cancel
    I3: Use of Charts ? - Cancel
    E30: even names is empty - change to statnames 
    I4: Check if useToken is necessary / if so, can it be included in AuthService? - cancel
    E17: after remving warnings - two still exist - not sure how to fix these.
        WARNING in ./node_modules/bootstrap/dist/css/bootstrap.css (./node_modules/css-loader/dist/cjs.js??ruleSet[1].ru
        les[1].oneOf[5].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[5].use[2]!./node_mod
        ules/source-map-loader/dist/cjs.js!./node_modules/bootstrap/dist/css/bootstrap.css)
        Module Warning (from ./node_modules/postcss-loader/dist/cjs.js):
        Warning
        
        (2482:3) autoprefixer: Replace color-adjust to print-color-adjust. The color-adjust shorthand is currently depre
        cated.
        @ ./node_modules/bootstrap/dist/css/bootstrap.css 8:6-245 22:17-24 26:7-21 58:25-39 59:36-47 59:50-64 61:4-74:5
        63:6-73:7 64:54-65 64:68-82 70:42-53 70:56-70 72:21-28 83:0-215 83:0-215 84:22-29 84:33-47 84:50-64
        @ ./src/NavBar/NavBarSelect.js 7:0-42
        @ ./src/App.js 7:0-53 17:38-50
        @ ./src/index.js 4:0-27 25:35-38
        updates to react 18 appear to have resolved this! 
    E31: Abbvev not appearing in grid display
        abbrev is an id field - and this is added separately - removed line from ColumnsGrid

    C8: PitchGrid CRUD operations added
    C9: Positions CRUD operations added
    E37: Add Statname s/n add Position
        positionData updated
    E38: Add Statname s/n add Pitchgrid
        pitchgridData updated
    E35: Position Number is empty - gridloader updated
    E36: Pitchgrid abbrev (key field) is empty - gridloader updated
    E34: Abbrev is empty - gridloader updated
    E32: Position additing/deleting is not valid 

    E32a: Pitchgrid adding/removing is not valid
    E39: statname - abbreviation not shown
       gridloader updated
    C6g: Time/Date pickers
        material UI DatePicker and TimePicker used to provide same.
    E33: Teamsheet id is object not id
        its a composite key of fixture and player and hence an object is displayed.
        not sure what to do with this!
        id column display removed from most grid displays except statname and pitchgrid
    E29: openTo error in Form popup
        does notaccept more than one setting openTo={'hours'}
    E28: Form key for each row - error
        created a getUnique function to alleviate this error.
    C6d3: Fixture -> season 
        dropdown created and db updateable
    C6d4: Fixture -> round
        dropdown created and db updateable
    C13: Add filter by fixture to teamsheet grid display and sort of position number
         Add fixtureDate to teamsheet grid
         fixture date and position id added to tyeamsheet to provide this ability
    R10: extract dropdown, textfield, timepicker and datepicker to separate components and call within formdialog
        new components placed in formcomponents folder
    C13: ADD Stats to grid
        Stats added - hightlighted need for additional drop downs.
    E42: FormDialog - heedername = season on all
         FomrDialog and Textield and XDropDown updated
    E43: FormDialog - Missing headernames for each field
        FomrDialog and Textield and XDropDown updated
    C7: StatName CRUD operations - done
    R11: check the need for copyFormColDefs and CopyGridColDefs - tidyup as necessary
        methods removed from each entity and deleted from helper.js
    E46:Stats screen goes blank and browser freezes
        Database had null values which were not handled
        Player was null for PO and POO - PO -> 1, POO -> 80 better data would be required to fix this properly
        Location was null when statname = Substitute - now properly handled
    R12: Tidyup index.js - remove redux and associated components no longer required
        All redux and store related elements removed from index.js
    C14 Style the register page - its very basic
        TextField components used to style regsitration page
        Error found with naming of values confirmPasword s/b passwordConfirm
    I6: Change Password not working
        Change password added - spring element now required
    E48: Horiz scroll bar not activating 
        And extra Y-scrollbar removed .
    E49: Form can no longer display data - fixed
         Reset the state parameters correctly
    E50: Linked data tables missing values - fixed
         updated grid params to load the data via the gridLoader
    E45: FormDialog - can no longer edit textfield values!
         FormDialogs showing data from grid, but cannot edit any textfield element.
    E48: FormDialog - Uncontrolled v controlled state value assignment
         setSelertedRow removed from handleClose() - not necessary
    E49: FormDialog - Bad setState() assignment 
         formDialog rendered about 42 times, more than half of these was when formValues was empty
         reduce the rendering by checking if it was empty - this also removed the bad State error as 
         it only occurred when formValues was empty!
    E50: After tremoving the text from an textfield an error occurs
         value : value ? value : undefined -> changed to value ? value : ""
    I5: Some dropdowns are too long - investigate other methods - maybe grid display!
    C11a: Add dropdowns for Competition Names   -done
        rest call complete - dropdown to be loaded and tested
    C11d: Add dropdowns for position numbers    -done
        rest call complete - dropdown to be loaded and tested
    C11e: Add dropdowns for pitchegrid values   -done
        rest call complete - dropdown to be loaded and tested
    C11g: Add dropdowns for for seasons         -done
    C11h: Add dropdowns for for rounds          -done
    C11i: Add dropdowns for for availability    -done
    C11j: Add dropdowns for for Grade           -done
    C11k: Add dropdowns for for Registered      -done
    C11c: Add dropdowns for player names  - done
        rest call complete - dropdown to be loaded and tested
    C11f: Add dropdowns for for statnames - done
        rest call complete - dropdown to be loaded and tested
    C6d2: Fixture -  Competition - done
    C6d1: Fixture -> Dropdown for Competition, season, and round - done
    E22: Tables with foreign key data are not displayed correctly
        - Events - incomplete - need data to test.
    xx After testing the above updates, Pin the version of each module to the
    latest in the package.json file - done
    C12: Create Teamsheet for a specific fixture - suitable to be printed out - as per GAA standard Teamsheet form.
        Ammend Navbar to include new entry for printTeamsheet - done
        Update Routes with Endpoint /printTimesheet - done
    C13 Add buttons to Teamsheet view <PrintTeamsheet> <TeamsheetPitchLayout> - done
    E47: Fix teamsheet display
        add code to usePrintPreview from MyDataGrid - fixed
    E40: FormDialog popup shows todays date and time - should show the values from the grid/form - fixed
    E56: Close popup modal does not work - fixed
    E52: PrintPreview does nothing if data not filtered - popup dialog fixed.
    E53: Add Entity not saving - fixed
    E54: Edit Entity not saving - fixed
    E55: Delete Entity not saving - fixed
    E51: Add Entity on wrong side of each grid table - no longer a problem.
    E56: Grid Stats - does not appear - blank screen! - fixed
    C11b: Add dropdowns for fixture Dates - done
          rest call complete - dropdown to be loaded and tested
    C15: Add Export capability - done
    C6a: Club -> validation (club does not already exist) - done
    C6b: Player -> validation (player does not already exist) - done
    C6c: Competition -> validation (DNE) - use a dropdown - done
    C6: FormDialog Add/Edit Changes
    C6e: Teamsheet -> Drop down for 
        Fixture , (what fields necessary to uniquely id fixture 
        Player and Position - done
    C6f: Stats -> dropdown for -> Fixture, Event, player and pitchposition - done
    C1: Add Drag n Drop Teamsheet selection  - done
    E58: Teamsheet - Delete does not work  - fixed
    E60: Teamsheet team section is not sorted - fixed
    E59: Export CSV button is slightly smaller than the other two - fixed
         css files export.css and FixtureSelect.css combined into app.css and then deleted 
    E62: Cancel does not work on dnb - fixed
    E63: Pagination button smaller than the others - fixed
    E64: Pagination and dropdown action text smaller than the others - fixed
    E61: Cannot save teamsheet changes from new GUI - add Teamsheet working
    U1: auth/useUser
    U2: auth/PrivateRoute
    U3: auth/user.service
    Ù13: grid/FormEditDialog
    U16: All <Entity>List.js/css components can be removed
