import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({ fetchData }) => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        fetchData(searchText);
        navigate(`/search/${searchText}`);
        setSearchText('');
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input type="search" name="search" placeholder="Search" required value="{searchTect}" onChange={e => setSearchText(e.target.value)}/>
            <button type="submit" className="search-button"></button>
        </form>
    );
};

export default Search;