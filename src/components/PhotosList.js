import { useFetchPhotosQuery } from "../store";

function PhotoList({ album }) {
    useFetchPhotosQuery(album);
    return "PhotosList";
}

export default PhotoList;
