import { Button, Grid } from '@mui/material'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default function MovieBar() {
    return (
        <Grid container display="flex" spacing={1} >
            <Button textAlign="center"><Link style={{ textDecoration: "none", color: "white" }} to={`/Movies`}>All movies</Link></Button>
            <Button textAlign="center"><Link style={{ textDecoration: "none", color: "white" }} to={`/Movies/AddMovie`}>Add movie</Link></Button>
        </Grid>
    )
}
