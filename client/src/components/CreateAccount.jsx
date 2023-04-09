import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useNavigate } from 'react-router-dom';
import GenericForm from '../utils/genericForm';
import { styleModal } from '../utils/theme'



export default function CreateAccount({ cancel }) {
    const navigate = useNavigate()
    const fields = [
        { label: 'Username', name: 'username', type: 'text' },
        { label: 'Password', name: 'password', type: 'password' },
    ]

    const curUser = { name: '', password: '' }

    const handleSubmit = async (user) => {
        try {
            console.log(user)
            const response = await fetch(`http://localhost:8000/users/username/${user.username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    return (
        <div>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal} >
                    <Typography variant="h6" component="h2"> Create New User </Typography>
                    <GenericForm typeForm={"create"} fields={fields} onSubmit={handleSubmit} cancel={cancel} ditails={curUser} />
                </Box>
            </Modal>
        </div>
    );
}





