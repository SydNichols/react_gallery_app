const Photo = ({ photo }) => {
    return (
        <li>
            <img src={photo.largeImageURL} alt={photo.tags} />
        </li>
    );
};

export default Photo;