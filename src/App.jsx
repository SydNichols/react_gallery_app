
import {useState, useEffect } from 'react'
import { Route, Routes, Navigate, useParams, useLocation } from 'react-router-dom'
import Search from './components/Search'
import Nav from './components/Nav'
import PhotoList from './components/PhotoList'
import apiKey from './config'
import './index.css'

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false)
  const location = useLocation();

  //Fetch data
  const fetchData = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&per_page=24`
      );
      const data = await response.json();
      setPhotos(data.hits);
    } catch (error) {
      console.error('Error fetching data:', error);
      setPhotos([])
    } finally {
      setLoading(false)
    }
  };

  //Loading defaulting data - cats search query
  useEffect(() => {
    const path = location.pathname;

    if (path === '/cats') {
      fetchData('cats');
    } else if (path === '/dogs') {
      fetchData('dogs');
    } else if (path === '/birds') {
      fetchData('birds');
    }
  }, [location.pathname]);

  return (
    <div className="container">
      <Search fetchData={fetchData} />
      <Nav fetchData={fetchData}/>

      <Routes>
        <Route path="/" element={ <Navigate to="/cats" replace />} />

        <Route path="/cats" element={<PhotoList photos={photos} title="Cats" />} />
        <Route path="/dogs" element={<PhotoList photos={photos} title="Dogs" />} />
        <Route path="/birds" element={<PhotoList photos={photos} title="Birds" />} />

        <Route path="/search/:query" element={<SearchResults photos={photos} fetchData={fetchData} />} />
      </Routes>
    </div>
  )
}

//search results component
function SearchResults ({ photos, fetchData }) {
  const { query } = useParams();

  useEffect(() => {
    if (query) {
      fetchData(query);
    }
  }, [query, fetchData]);

  return <PhotoList photos={photos} title={`Results for "${query}"`} />
}

export default App
