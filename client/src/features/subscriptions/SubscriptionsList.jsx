
import { Grid } from '@mui/material';
import Loading from '../../components/Loading';
import Subscription from './Subscription';

import { useGetMembersQuery } from './subscriptionsSlice'

const SubscriptionsList = () => {

    const {
        data: members,
        isLoading,
        isSuccess
    } = useGetMembersQuery('getMembers')


    let content
    if (isLoading) {
        content = <Loading />
    } else if (isSuccess) {
        content = members.ids.filter((id) => members.entities[id].firstName).map(id => <Subscription key={id} id={id} />)
    }
    return (
        <Grid container display="flex" spacing={2}  >
            {content}
        </Grid>)
}

export default SubscriptionsList