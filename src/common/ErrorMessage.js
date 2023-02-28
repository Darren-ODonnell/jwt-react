import React, { useState } from 'react'
import { Alert, Button } from "react-bootstrap";
import {useLocation, useNavigate, useParams,  BrowserRouter } from "react-router-dom";


export const ErrorMessage = (props) => {
    const [show, setShow] = useState(true);


    function onClick() {
        setShow(false);
        window.location = props.location ? props.location : "/"
    }

    return (
        <BrowserRouter>
            <Alert show={show} variant="success">
                <Alert.Heading>Startup Error!</Alert.Heading>
                {props.message}
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={onClick} variant="outline-success">
                        Click to try again!
                    </Button>
                </div>
            </Alert>
        </BrowserRouter>
    )
}
function withRouter(Component) {
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


export default withRouter(ErrorMessage)
