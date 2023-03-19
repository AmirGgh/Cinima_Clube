import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useNavigate } from 'react-router-dom';
import authService from '../utils/authService'
import GenericForm from '../utils/genericForm';
import { styleModal } from '../utils/theme'

const Login = () => {
    const navigate = useNavigate()
    const fields = [
        { label: 'Username', name: 'username', type: 'text' },
        { label: 'Password', name: 'password', type: 'password' }]



    const handleSubmit = async ({ username, password }) => {
        authService.login(username, password)
            .then(res => {
                if (res.status == 200) {
                    authService.saveToken(res.data.token)
                    authService.saveId(res.data.id)
                    authService.saveRole(res.data.role)
                    navigate('/movies')
                }
            })
    };

    return (
        <div>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal} >
                    <Typography variant="h6" component="h2"> Welcome! </Typography>
                    <GenericForm typeForm={"login"} fields={fields} onSubmit={handleSubmit} />
                </Box>
            </Modal>
        </div>
    );
};

export default Login;
