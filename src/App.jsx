
import {useState, useEffect, useCallback } from 'react'
import { Route, Routes, Navigate, useParams, useLocation } from 'react-router-dom'
import Search from './components/Search'
import Nav from './components/Nav'
import PhotoList from './components/PhotoList'
import apiKey from './config'
import './index.css'

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false)
  //hook to track URL location set for back and forward button functionality
  const location = useLocation();

  //Fetch data from Pixabay
  const fetchData = useCallback(async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&per_page=24`
      );
      const data = await response.json();
      //update photos state with fetch photos
      if (data && data.hits) {
        setPhotos(data.hits);
      } else {
        setPhotos([])
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setPhotos([])
    } finally {
      setLoading(false)
    }
  }, [apiKey]);

  //Loading defaulting data - cats search query
  // effect to handle route changes, triggering when URL changes
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

  //rendering search bar, nav links, and photos arrays
  // setting static routes as well as search routes from user queries
  return (
    <div className="container">
      <Search fetchData={fetchData} />
      <Nav />

      <Routes>
        <Route path="/" element={ <Navigate to="/cats" replace />} />

        <Route path="/cats" element={<PhotoList photos={photos} title="Cats" loading={loading} />} />
        <Route path="/dogs" element={<PhotoList photos={photos} title="Dogs" loading={loading} />} />
        <Route path="/birds" element={<PhotoList photos={photos} title="Birds" loading={loading} />} />

        <Route path="/search/:query" element={<SearchResults photos={photos} fetchData={fetchData} loading={loading} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

//search results component
function SearchResults ({ photos, fetchData, loading }) {
  //extrancting query parameter from URL 
  const { query } = useParams();

  useEffect(() => {
    if (query) {
      fetchData(query);
    }
  }, [query, fetchData]);

  //photo list rendering
  return <PhotoList photos={photos} title={`Results for "${query}"`} loading={loading} />
}

function NotFound() {
  return (
    <div className="photo-container">
      <h2>404 - Page Not Found</h2>
      <div className="not-found">
        <h3>Oops! The page you're looking for doesn't exist.</h3>
        <p>Please check the URL or navigate back to the home page.</p>
      </div>
    </div>
  );
}

export default App
