// use HTML photo container as guide

//individual photo component to be redered in list
const Photo = ({ photo }) => {
    return (
        <li>
            <img src={photo.largeImageURL} alt={photo.tags} />
        </li>
    );
};

export default Photo;