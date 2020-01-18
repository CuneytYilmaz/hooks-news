import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('reacthooks')
  const [results, setResults] = useState([])

  useEffect (() => {
    getResults()
  }, [query])

  const getResults = async () => {
    const response = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    )

    setResults(response.data.hits)
  }

  return (
    <>
      <input type='text' onChange={event => setQuery(event.target.value)}></input>
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
