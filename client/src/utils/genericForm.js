import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Paper } from '@mui/material';

function GenericForm(props) {
    const [formData, setFormData] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(formData)

    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onSubmit(formData);
    }

    const handleReset = () => {
        setFormData({});
    }


    return (
        <Paper variant="outlined"  >
            {props.fields.map(field => (
                <TextField key={field.name} name={field.name} label={field.name} variant="outlined" onChange={handleChange} />
            ))}
            <Button onClick={handleSubmit}>{props.typeForm}</Button>
        </Paper>
    );
}

export default GenericForm;

