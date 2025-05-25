import Photo from "./Photo";

// HTML photo container as guide - use to render list of Photo components

const PhotoList = ({ photos, title, loading }) => {
    //photo list rendering with individual photo components and title
    return (
        <div className="photo-container">
            <h2>{title}</h2>
            {loading && (
                <div className="loading">
                    <p>Loading...</p>
                </div>
            )}
            <ul>
                {!loading && photos.length > 0 ? (
                    photos.map(photo => (
                        <Photo key={photo.id} photo={photo} />
                    ))
                ) : !loading ? (
                    <li className="not-found">
                        <h3>No Results Found</h3>
                        <p>Your search did not return any results. Please try again.</p>
                    </li>
                ): null}
            </ul>
        </div>
    );
};

export default PhotoList;