import Photo from "./Photo";

// HTML photo container as guide - use to render list of Photo components

const PhotoList = ({ photos, title }) => {
    //photo list rendering with individual photo components and title
    return (
        <div className="photo-container">
            <h2>{title}</h2>
            <ul>
                {photos.length > 0 ? (
                    photos.map(photo => (
                        <Photo key={photo.id} photo={photo} />
                    ))
                ) : (
                    <li className="not-found">
                        <h3>No Results Found</h3>
                        <p>Your search did not return any results. Please try again.</p>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default PhotoList;