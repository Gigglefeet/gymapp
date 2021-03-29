import React, { useState } from 'react';

import Layout from '../components/Layout';

export default function mygym() {
  // useState for the API where exercises are set with an empty array as a starting state.
  const [exercises, setExercises] = useState([]);
  async function handleClick(e) {
    e.preventDefault();
    const response = await fetch('https://wger.de/api/v2/exercise');

    const endpointLibrary = await response.json();
    console.log(endpointLibrary.results);
    setExercises(endpointLibrary.results);
  }
  // Todo 1. Trigger onClick event
  // 2. create a function to fetch
  // 3. connect the Trigger to the function
  return (
    <Layout>
      <div>My gym page</div>

      {exercises.map((exercise) => {
        return <p>{exercise.name}</p>;
      })}
      <button onClick={handleClick} id="button" type="button">
        Get exercises
      </button>
      <p id="setup"></p>
      <p id="punchline"></p>
    </Layout>
  );
}
