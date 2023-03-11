import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import authService from '../utils/authService'
import GenericForm from '../utils/genericForm';

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
        <GenericForm typeForm={"login"} fields={fields} onSubmit={handleSubmit} />
    );
};

export default Login;
