/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';
import { ExerciseModal } from '../components/ExerciseModal';
let baseurl;
if (process.env.NODE_ENV === 'development') {
  baseurl = 'http://localhost:3000';
}

if (process.env.NODE_ENV === 'production') {
  baseurl = 'https://gym80.herokuapp.com';
}

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

export default function MyGym() {
  // useState for the API where exercises are set with an empty array as a starting state.

  const [trainingDays, setTrainingDays] = useState([]);
  const [trainingDayButtonClick, setTrainingDayButtonClick] = useState(false);
  const [dayDescription, setDayDescription] = useState('');
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
      .get(`${baseurl}/api/exercises`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        const trainingDays = res.data.trainingDays.data;
        setTrainingDays([...trainingDays]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <button
          onClick={() => {
            setTrainingDayButtonClick(true);
          }}
        >
          Add Training Day
        </button>
      </div>
      {trainingDayButtonClick ? (
        <form onSubmit={() => {}}>
          <div css={weekdays}>
            <input
              onChange={(event) => {
                setDayDescription(event.target.value);
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
              <label htmlFor="checkbox">Monday</label>
            </div>
            <div className="weekday-row">
              <input
                onChange={handleDayCheckboxChange}
                type="checkbox"
                name="Tuesday"
                value="Tuesday"
              />
              <label htmlFor="checkbox">Tuesday</label>
            </div>
            <div className="weekday-row">
              <input
                onChange={handleDayCheckboxChange}
                type="checkbox"
                name="Wednesday"
                value="Wednesday"
              />
              <label htmlFor="checkbox">Wednesday</label>
            </div>
            <div className="weekday-row">
              <input
                onChange={handleDayCheckboxChange}
                type="checkbox"
                name="Thursday"
                value="Thursday"
              />
              <label htmlFor="checkbox">Thursday</label>
            </div>
            <div className="weekday-row">
              <input
                onChange={handleDayCheckboxChange}
                type="checkbox"
                name="Friday"
                value="Friday"
              />
              <label htmlFor="checkbox">Friday</label>
            </div>

            <div className="weekday-row">
              <input
                onChange={handleDayCheckboxChange}
                type="checkbox"
                name="Saturday"
                value="Saturday"
              />
              <label htmlFor="checkbox">Saturday</label>
            </div>
            <div className="weekday-row">
              <input
                onChange={handleDayCheckboxChange}
                type="checkbox"
                name="Sunday"
                value="Sunday"
              />
              <label htmlFor="checkbox">Sunday</label>
            </div>
            <button
              onClick={async () => {
                setTrainingDayButtonClick(false);

                try {
                  const res = await axios.post(`${baseurl}/api/workout-days`, {
                    description: dayDescription,
                    ...savedCheckboxDays,
                  });
                  console.log(res.data);
                  const workoutDay = res.data.workoutDay;
                  setTrainingDays([...trainingDays, workoutDay]);
                } catch (error) {
                  console.log(error);
                }
                setDayDescription('');
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
          );
        })}
      </div>
    </>
  );
}
