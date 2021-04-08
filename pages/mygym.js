/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import 'rc-slider/assets/index.css';
import React, { useEffect, useState } from 'react';
import { ExerciseModal } from '../components/ExerciseModal';
import Layout from '../components/Layout';

const dayCheckboxDescription = css`
  display: flex;
  flex-direction: column;
  width: 25%;
  .header {
    background-color: gray;
  }
  .button-wrapper {
    background-color: white;
  }
`;
const weekdays = css`
  display: flex;
  flex-direction: column;
  width: 30%;
  padding: 30px 20px;
  background-color: gray;
  .weekday-row {
    display: flex;
    gap: 5px;
  }
  .save-button {
    width: 10%;
  }
`;

export default function mygym() {
  // useState for the API where exercises are set with an empty array as a starting state.

  const [trainingDays, setTrainingDays] = useState([]);
  const [trainingdayButtonClick, setTrainingdayButtonClick] = useState(false);
  const [dayDescription, setdayDescription] = useState('');
  const [savedCheckboxDays, setSavedCheckboxDays] = useState({});
  const [showExerciseOverlay, setShowExerciseOverlay] = useState(false);
  const [currentTrainingDayId, setCurrentTrainingDayId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const handleDayCheckboxChange = (event) => {
    setSavedCheckboxDays({
      day: event.target.name,
    });
  };
  console.log(trainingDays);
  // Todo 1. Trigger onClick event
  // 2. create a function to fetch
  // 3. connect the Trigger to the function

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/exercises', { withCredentials: true })
      .then((res) => {
        console.log(res);
        const traningDays = res.data.trainingDays.data;
        setTrainingDays([...traningDays]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [trainingDays]);

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <button
          onClick={() => {
            setTrainingdayButtonClick(true);
          }}
        >
          Add Training Day
        </button>
      </div>
      {trainingdayButtonClick ? (
        <form onSubmit={() => {}}>
          <div css={weekdays}>
            <input
              onChange={(event) => {
                setdayDescription(event.target.value);
              }}
              value={dayDescription}
            />
            <div className="weekday-row">
              <input
                onChange={handleDayCheckboxChange}
                type="checkbox"
                name="Monday"
                value="Monday"
              />
              <label>Monday</label>
            </div>
            <div className="weekday-row">
              <input
                onChange={handleDayCheckboxChange}
                type="checkbox"
                name="Tuesday"
                value="Tuesday"
              />
              <label>Tuesday</label>
            </div>
            <div className="weekday-row">
              <input
                onChange={handleDayCheckboxChange}
                type="checkbox"
                name="Wednesday"
                value="Wednesday"
              />
              <label>Wednesday</label>
            </div>
            <div className="weekday-row">
              <input
                onChange={handleDayCheckboxChange}
                type="checkbox"
                name="Thursday"
                value="Thursday"
              />
              <label>Thursday</label>
            </div>
            <div className="weekday-row">
              <input
                onChange={handleDayCheckboxChange}
                type="checkbox"
                name="Friday"
                value="Friday"
              />
              <label>Friday</label>
            </div>

            <div className="weekday-row">
              <input
                onChange={handleDayCheckboxChange}
                type="checkbox"
                name="Saturday"
                value="Saturday"
              />
              <label>Saturday</label>
            </div>
            <div className="weekday-row">
              <input
                onChange={handleDayCheckboxChange}
                type="checkbox"
                name="Sunday"
                value="Sunday"
              />
              <label>Sunday</label>
            </div>
            <button
              onClick={async () => {
                setTrainingdayButtonClick(false);

                try {
                  const res = await axios.post(
                    'http://localhost:3000/api/workout-days',
                    { description: dayDescription, ...savedCheckboxDays },
                  );
                  console.log(res.data);
                  const workoutDay = res.data.workoutDay;
                  setTrainingDays([...trainingDays, workoutDay]);
                } catch (error) {
                  console.log(error);
                }
                setdayDescription('');
                setSavedCheckboxDays({});
              }}
              className="save-button"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        ''
      )}
      <ExerciseModal
        currentUser={currentUser}
        trainingDays={trainingDays}
        setTrainingDays={setTrainingDays}
        workoutDayId={currentTrainingDayId}
        showExerciseOverlay={showExerciseOverlay}
        setShowExerciseOverlay={setShowExerciseOverlay}
      />
      <div css={dayCheckboxDescription}>
        {trainingDays.map((day) => {
          const exercises = [];

          for (let exercise in day.exercises) {
            exercises.push(<div>{exercise}</div>);
            for (let row in day.exercises[exercise].sets) {
              exercises.push(
                <p>
                  {day.exercises[exercise].sets[row].reps} x{' '}
                  {day.exercises[exercise].sets[row].weight} kg
                </p>,
              );
            }
          }
          return (
            <>
              <div className="dayCheckboxDescription" key={Math.random()}>
                {' '}
                <div className="header">
                  {day.description} - {day.day}{' '}
                </div>
                <div className="button-wrapper">
                  {day.exercises ? exercises : ''}
                  <button
                    onClick={() => {
                      setShowExerciseOverlay(true);
                      setCurrentTrainingDayId(day.id);
                    }}
                  >
                    Add Exercises
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
