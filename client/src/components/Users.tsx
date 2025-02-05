import React from 'react';

import type { UserData } from "../interfaces/UserData";
import auth from '../utils/auth';

// Define the props for the component
interface UserListProps {
    users: UserData[] | null; // users can be an array of UserData objects or null
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <>
            <h2 className="pb-5">
               Hey {auth.getProfile().username}, Check out all your friends!
            </h2>
            {users && users.map((user) => (
                <div className="row align-center mb-5" key={user.id}>
                    <div className="col-md-6">
                        <h3>{user.id}. {user.username}</h3>
                    </div>
                    <div className="col-md-6">
                        <h4><a href={`mailto:${user.email}`}>{user.email}</a></h4>
                    </div>
                </div>
            ))}
        </>
    );
};

export default UserList;
