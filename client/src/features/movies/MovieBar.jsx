import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AddMovie from './AddMovie'

export default function MovieBar() {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(!open);
    return (
        <Grid container display="flex" spacing={1} >
            <Button onClick={handleClose}>Add movie</Button>
            {open && <AddMovie handleClose={handleClose} open={open} />}
        </Grid>
    )
}
