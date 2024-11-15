import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import UsersListItem from "./UsersListItem";
import { useThunk } from "../hooks/use-thunk";

function UsersList() {
    /* --- these are handled by useThunk() hook
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [loadingUsersError, setLoadingUsersError] = useState(null);
    */
    const [doFetchUsers, isLoadingUsers, loadingUsersError] =
        useThunk(fetchUsers);

    /*
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [creatingUserError, setIsCreatingUserError] = useState(null);
    */
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    // const dispatch = useDispatch();

    // const { isLoading, data, error } = useSelector((state) => {
    const { data } = useSelector((state) => {
        return state.users; // {data:[], isLoading:false, error:null}
    });

    /*
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
    }, [dispatch]); */

    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    /*
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
    };*/
    const handleAddUser = () => {
        doCreateUser();
    };
    /* -------------------------------------------------------------
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
    */

    // refactor for ALWAYS showing 'Header'
    let content;
    if (isLoadingUsers) {
        content = <Skeleton times={6} className="h-10 w-full" />;
    } else if (loadingUsersError) {
        content = <div>Error fetching data...</div>;
    } else {
        content = data.map((user) => {
            return <UsersListItem key={user.id} user={user} />;
            // moving below code to 'UsersListItem.js'
            // return (
            //     <div key={user.id} className="mb-2 border rounded">
            //         <div className="flex p-2 justify-between items-center cursor-pointer">
            //             {user.name}
            //         </div>
            //     </div>
            // );
        });
    }
    // -------------------------------------------------------------
    return (
        <div>
            <div className="flex flex-row justify-between items-center m-3">
                <h1 className="m-2 text-xl">Users</h1>
                <Button loading={isCreatingUser} onClick={handleAddUser}>
                    + Add User
                </Button>
                {creatingUserError && "Error Creating user..."}
            </div>
            {content}
        </div>
    );
}

export default UsersList;
