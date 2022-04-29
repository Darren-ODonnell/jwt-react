import React, { useState } from 'react'
import { Alert, Button } from "react-bootstrap";
import {BrowserRouter, useHistory, withRouter} from "react-router-dom";


export const ErrorMessage = (props) => {
    const [show, setShow] = useState(true);
    let history = useHistory();

    function onClick(history) {
        setShow(false);
        history.push("/");
    }


    return (
        <BrowserRouter>
            <Alert show={show} variant="success">
                <Alert.Heading>Startup Error!</Alert.Heading>
                {props.message}
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={()=>onClick(history)} variant="outline-success">
                        Click to try again!
                    </Button>
                </div>
            </Alert>
        </BrowserRouter>
    )
}

export default withRouter(ErrorMessage)
