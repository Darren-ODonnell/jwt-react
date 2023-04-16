import React, { useEffect, useRef, useState } from "react";
import {useLocation} from "react-router-dom";
import {TextField} from "@mui/material";
import axios from "axios";

function FileUpload() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const types = ["text/csv"];
    const location = useLocation();

    const changeHandler = (event) => {
        let selected = event.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError("");
        } else {
            setFile(null);
            setError("Please select a CSV file");
        }
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await axios.post("/server/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            window.location.pathname = "/file-upload-success";
        } catch (err) {

            setError("Error uploading file. Please try again.");
        }
    };

    return (
        <div>
            {location.pathname === "/file-upload-success" && (
                <div>File uploaded successfully!</div>
            )}
            <form>
                <TextField
                    type="file"
                    onChange={changeHandler}
                    InputProps={{
                        style: {display: "none"},
                    }}
                    label="File"
                />
                <div className="output">
                    {error && <div className="error">{error}</div>}
                    {file && <div>{file.name}</div>}
                </div>
                <button type="button" onClick={handleUpload} disabled={!file}>
                    Upload
                </button>
            </form>
        </div>
    );
}

export default FileUpload;
