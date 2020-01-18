import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('react hooks')
  const [results, setResults] = useState([])
  const searchInputRef = useRef()

  useEffect (() => {
    getResults()
  }, [])

  const getResults = async () => {
    const response = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    )

    setResults(response.data.hits)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    getResults()
  }

  const handleSearchClear = () => {
    setQuery('')
    searchInputRef.current.focus()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type='text' 
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
        />
        <button
          type='submit'
        >Search</button>
        <button
          type='button'
          onClick={handleSearchClear}
        >Clear</button>
      </form>
      <ul>
        {results.map(result => (
            <li key={result.objectID}>
              <a href={result.url}>{result.title}</a>
            </li>
        ))}
      </ul>
    </>
  );
}

export default App;
