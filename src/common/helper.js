import React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import moment from "moment/moment";
import {Button} from "@mui/material";

// a unique is required when iterating javascript lists, this is used where the data does not have a suitable key.
let id = 0;
export function getUniqueId(): string {
    return id++ + '';
}

// ignore when users click away from modal
export const handleClickAway = () => {

}

export function getSeasons() { return [new Date().getFullYear()-1, new Date().getFullYear(), new Date().getFullYear()+1] }

export const addMessage = (  entityName ) => {
    return {
        add: "Add " + entityName,
        update: "Edit " + entityName,
        create: "Create New " + entityName,
    };
}

// date/time
export function getMinTime() {    return moment("09:00","HH:mm")}
export function getMaxTime() {
    return moment("20:00", "HH:mm")
}

export function getMinDate() {
    return moment("01/01/" + new Date().getFullYear() - 1, "DD/MM/YYYY");
}

export function getMaxDate() {
    return moment("31/12/" + new Date().getFullYear() + 1, "DD/MM/YYYY");
}

export const defaultColDef = {
    sortable: true,
    editable: false,
    filter: true,
    floatingFilter: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
};

export function isEmptyObject(obj){
    const array = JSON.stringify(obj);
    return  (array === '{}') || (array === "null");

}

export const refreshPage = () => {
    window.location.reload();
}

export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
    return ComponentWithRouterProp;
}

export const handleBooleanValues = (testValue) => {
    let value
    switch (testValue) {
        case "True" :
            value = true
            break
        case "False" :
            value = false
            break
        default :
            value = testValue ? testValue : ""
    }
    return value
}


export const printPopup = () => {
    window.print()
}
export const showPopup = () => {
    // Generate the output of the component
    let componentOutput = "<h1>Component Output</h1><p>This is some data from the component.</p>";

    // Get the popup element
    let popup = document.getElementById("popup");

    // Check if the popup element exists
    if (popup !== null) {
        // Insert the output into the popup modal
        popup.innerHTML = componentOutput;

        // Show the popup modal
        popup.style.display = "block";
    }

    return (
        <Button onClick={printPopup}>Print Data</Button>
    );
}

