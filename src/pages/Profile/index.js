import { useParams } from 'react-router-dom';

import AccountProfile from '~/layouts/components/AccountProfile/AccountProfile';

function Profile() {
    return <AccountProfile />;
}

// đang suy nghĩ thử là Link theo nickname thì nó sẽ có prop và truyền qua như thế kia được

export default Profile;
