import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import FormDialog from "../grid/FormDialog";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/FormDialog">
                <FormDialog/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;