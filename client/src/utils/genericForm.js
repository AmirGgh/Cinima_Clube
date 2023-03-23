import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Box, FormGroup, FormControlLabel, Checkbox, FormControl, FormLabel } from '@mui/material';
import authService from '../utils/authService'
import { styleTextInput } from './theme';

function GenericForm({ onSubmit, fields, movie, user, typeForm, cancel }) {
    const [formData, setFormData] = useState({});
    const [EditPremiss, setEditPremiss] = useState(false);
    // console.log(user)
    const [premissions, setPremissions] = useState([
        { key: "View Subscriptions", value: false },
        { key: "Create Subscriptions", value: false },
        { key: "Delete Subscriptions", value: false },
        { key: "View Movies", value: false },
        { key: "Create Movies", value: false },
        { key: "Delete Movies", value: false }
    ]);
    const userPremissions = () => {
        let update;
        update = premissions.map(premission => user.premissions.includes(premission.key) ? { key: premission.key, value: true } : premission);
        setPremissions(update)
    }

    const handleChangePremission = (key, value) => {
        console.log(key, value)
        const updatedPremissions = premissions.map(premission => premission.key === key ? { ...premission, value } : premission);
        setPremissions(updatedPremissions);
        const userUpdate = updatedPremissions.filter(p => p.value).map((p) => p.key);
        setFormData(prevState => ({
            ...prevState,
            premissions: userUpdate
        }));
        console.log(formData)
    };

    const editPremiss = () => {
        setEditPremiss(!EditPremiss)
        userPremissions();
    }

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
        console.log(formData)
    }

    const handleReset = () => {
        setFormData({});
    }

    const editUserPre = authService.getRole() === 'admin' && !EditPremiss && user;
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
            {editUserPre && <Button onClick={editPremiss}>Edit Permissions</Button>}

            {EditPremiss && (
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormLabel component="legend">Premissions</FormLabel>
                    <FormGroup>
                        {premissions.map(({ key, value }) =>
                            <FormControlLabel key={key} control={
                                <Checkbox name={key} checked={value} onChange={() => handleChangePremission(key, !value)} />} label={key} />)
                        }

                    </FormGroup>
                </FormControl>
            )}
            <br />
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                <Button sx={{ margin: 'auto' }} variant="contained" onClick={handleSubmit}>{typeForm}</Button>
                {cancel && <Button sx={{ margin: 'auto' }} variant="contained" onClick={cancel}>cancel</Button>}
            </Box>
        </Box>
    );
}

export default GenericForm;

