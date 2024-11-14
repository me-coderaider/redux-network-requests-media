import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumListItem from "./AlbumListItem";

function AlbumList({ user }) {
    const { data, error, isFetching } = useFetchAlbumsQuery(user);
    // useFetchAlbumsQuery(user); // for understand re-fetching of requests using RTKQ
    const [addAlbum, results] = useAddAlbumMutation();
    const handleAddAlbum = () => {
        addAlbum(user);
    };

    let content;
    // if (isLoading) {
    if (isFetching) {
        // using 'isFetching' to 'remove' the fetching delay of albums

        content = <Skeleton className="h-10 w-full" times={3} />;
    } else if (error) {
        content = <div>Error loading albums.</div>;
    } else {
        content = data.map((album) => {
            return <AlbumListItem key={album.id} album={album} />;
        });
    }

    return (
        <div>
            <div className="m-3 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Albums for {user.name}</h3>
                <Button loading={results.isLoading} onClick={handleAddAlbum}>
                    + Add Album
                </Button>
            </div>
            <div>{content}</div>
        </div>
    );
}

export default AlbumList;
