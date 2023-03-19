import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Box, styled, FormGroup, FormControlLabel, Checkbox, Typography, FormControl, FormLabel } from '@mui/material';
import { styleTextInput } from './theme';



function GenericForm({ onSubmit, fields, movie, user, typeForm, cancel }) {
    const [formData, setFormData] = useState({});

    const [permissions, setPermissions] = useState([
        { key: "View Subscriptions", value: false },
        { key: "Create Subscriptions", value: false },
        { key: "Delete Subscriptions", value: false },
        { key: "View Movies", value: false },
        { key: "Create Movies", value: false },
        { key: "Delete Movies", value: false }
    ]);

    const handleChangePermission = (key, value) => {
        const updatedPermissions = permissions.map(permission => permission.key === key ? { ...permission, value } : permission
        );
        setPermissions(updatedPermissions);

    };
    // useEffect(() => {
    //     user.premissions.map((p) => {
    //         handleChangePermission(p, true)
    //     })
    // }, [])

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(formData);
    }

    const handleReset = () => {
        setFormData({});
    }


    return (
        <Box component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }} >
            {fields.map(field => (
                <TextField sx={styleTextInput} key={field.name} name={field.name} label={field.label} variant="outlined" onChange={handleChange} />
            ))}
            {movie && (<TextField
                sx={styleTextInput} label="summary"
                key={"summary"} name={"summary"}
                multiline
                rows={8}
            />)}
            <br />
            {user && (
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormLabel component="legend">Premissions</FormLabel>
                    <FormGroup>
                        {permissions.map(({ key, value }) =>
                            <FormControlLabel key={key} control={
                                <Checkbox name={key} checked={value} onChange={() => handleChangePermission(key, !value)} />} label={key} />)
                        }

                    </FormGroup>
                </FormControl>
            )}
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                <Button sx={{ margin: 'auto' }} variant="contained" onClick={handleSubmit}>{typeForm}</Button>
                <Button sx={{ margin: 'auto' }} variant="contained" onClick={cancel}>cancel</Button>
            </Box>
        </Box>
    );
}

export default GenericForm;

