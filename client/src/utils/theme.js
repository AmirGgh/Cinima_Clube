import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
})
const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const styleTextInput = {
    margin: 1, display: 'block', justifyContent: 'center', alignItems: 'center', flexGrow: 1
};

export { theme, styleModal, styleTextInput }