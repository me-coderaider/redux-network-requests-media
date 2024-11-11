import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";

function UsersList() {
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [loadingUsersError, setLoadingUsersError] = useState(null);
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [creatingUserError, setIsCreatingUserError] = useState(null);

    const dispatch = useDispatch();

    // const { isLoading, data, error } = useSelector((state) => {
    const { data } = useSelector((state) => {
        return state.users; // {data:[], isLoading:false, error:null}
    });

    useEffect(() => {
        setIsLoadingUsers(true);
        dispatch(fetchUsers())
            .unwrap()
            .then(() => {
                // setIsLoadingUsers(false);
                // console.log("Success");
            })
            .catch((err) => {
                setLoadingUsersError(err);
                // setIsLoadingUsers(false);
                // console.log("Fail");
            })
            .finally(() => {
                setIsLoadingUsers(false);
            });
    }, [dispatch]);

    const handleAddUser = () => {
        setIsCreatingUser(true);
        dispatch(addUser())
            .unwrap()
            .catch((err) => {
                setIsCreatingUser(err);
            })
            .finally(() => {
                setIsCreatingUser(false);
            });
    };

    // if (isLoading) {
    if (isLoadingUsers) {
        // return <div>Loading...</div>;
        return <Skeleton times={6} className="h-10 w-full" />;
    }

    // if (error) {
    if (loadingUsersError) {
        return <div>Error fetching data...</div>;
    }

    const renderedUsers = data.map((user) => {
        return (
            <div key={user.id} className="mb-2 border rounded">
                <div className="flex p-2 justify-between items-center cursor-pointer">
                    {user.name}
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 text-xl">Users</h1>
                {isCreatingUser ? (
                    "Creating User..."
                ) : (
                    <Button onClick={handleAddUser}>+ Add User</Button>
                )}
                {creatingUserError && "Error Creating user..."}
            </div>
            {renderedUsers}
        </div>
    );
}

export default UsersList;
