import { Grid } from '@mui/material';
import Loading from '../../components/Loading';
import User from './User'
import { useGetUsersQuery } from './usersSlice'

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
        isUninitialized
    } = useGetUsersQuery('getUsers')


    let content;
    if (isLoading) {
        content = <Loading />
    } else if (isSuccess) {
        content = users.ids.map(id => <User key={id} id={id} />)
    } else if (isError) {
        content = <p>{error}</p>;
    } else if (isUninitialized) {
        content = <p>{error}</p>;
    }
    return (
        <Grid container display="flex" spacing={2}  >
            {content}
        </Grid>)
}

export default UsersList