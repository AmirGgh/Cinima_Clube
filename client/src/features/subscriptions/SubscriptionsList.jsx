
import { Grid } from '@mui/material';
import Loading from '../../components/Loading';
import Subscription from './Subscription';

import { useGetSubscriptionsQuery, useGetMembersQuery } from './subscriptionsSlice'

const SubscriptionsList = () => {

    const {
        data: members,
        isLoading,
        isSuccess,
        isError,
        error,
        isUninitialized
    } = useGetMembersQuery('getMembers')
    console.log(members)

    let content = 'k'
    if (isLoading) {
        content = <Loading />
    } else if (isSuccess) {
        content = members.ids.map(id => <Subscription key={id} id={id} />)

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

export default SubscriptionsList