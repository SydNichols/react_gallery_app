
import {useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Search from './components/Search'
import Nav from './components/Nav'
import PhotoList from './components/PhotoList'
import apiKey from './config'

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false)

  //Fetch data
  const fetchData = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pixavay.com/api/?key=${apiKey}&q${query}&image_type=photot&per_page=24`
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
  UseEffect(() => {
    fetchData('cats');
  }, []);

  return (
    <div className="container">
      <Search></Search>
      <Nav />

      <Routes>
        <Route path="/" element={ <Navigate to="/cats" replace />} />

        <Route path="/cats" element={<PhotoList photos={[]} title="Cats" />} />
        <Route path="/dogs" element={<PhotoList photos={[]} title="Dogs" />} />
        <Route path="/birds" element={<PhotoList photos={[]} title="Birds" />} />

        <Route path="/search/:query" element={<PhotoList photos={[]} title="Search Results" />} />
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

  return <PhotoList photos={photos} title={`Results for"${query}"`} />
}

export default App
