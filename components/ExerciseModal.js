/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import React, { useEffect, useState } from 'react';
let baseurl;
if (process.env.NODE_ENV === 'development') {
  baseurl = 'http://localhost:3000';
}

if (process.env.NODE_ENV === 'production') {
  baseurl = 'https://gym80.herokuapp.com';
}
const SliderWithTooltip = createSliderWithTooltip(Slider);

const selectedExercise = css`
  li {
    list-style: none;
  }
`;
const dropdown = css`
  background-color: purple;
  padding: 30px 20px;
  width: 30%;
  position: relative;
  top: 25%;
  left: 35%;
  border-radius: 20px;
  .exercise-input {
    width: 100%;
  }

  .numberOfSets {
    margin-top: 25px;
  }
  .dropdown {
    position: absolute;
    background-color: white;
    width: 94%;
    z-index: 5;
    padding-left: 10px;
    li {
      list-style: none;
    }
    ul {
      padding: 0;
    }
  }
  .rowsOfExercises {
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    input {
      margin-right: 10px;
      width: 100%;
    }
  }
  .columnNames {
    display: flex;
    justify-content: space-between;
    &-unit1 {
      transform: translateX(32px);
    }
    &-weight {
    }
    &-unit2 {
      transform: translateX(-15px);
    }
  }
`;

const exerciseOverlay = css`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transition: all 0.2s linear;
  background: rgba(26, 26, 26, 0.7);
  z-index: 2;
  visibility: 'visible';
`;

export const ExerciseModal = ({
  showExerciseOverlay,
  workoutDayId,
  setTrainingDays,
  trainingDays,
  setShowExerciseOverlay,
  currentUser,
}) => {
  const [sets, setSets] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [rowsOfExercises, setRowsOfExercises] = useState([]);
  const [rowOfSet, setRowOfSet] = useState({});
  const renderRows = () => {
    const rows = [];
    for (let row = 0; row < sets; row++) {
      // here I need to push rows that is a div with 3 inputs
      rows.push(
        <div className="row">
          <input
            onChange={(e) => {
              setRowOfSet((rowOfSet) => {
                return {
                  ...rowOfSet,
                  [e.target.name]: {
                    ...rowOfSet[e.target.name],
                    reps: Number(e.target.value),
                  },
                };
              });
            }}
            name={`row-${row + 1}`}
            type="number"
          />
          <select>
            <option value="repetition">Repetitions</option>
            <option value="until failure">Until failure</option>
          </select>
          <input
            onChange={(e) => {
              setRowOfSet((rowOfSet) => {
                return {
                  ...rowOfSet,
                  [e.target.name]: {
                    ...rowOfSet[e.target.name],
                    weight: Number(e.target.value),
                  },
                };
              });
            }}
            name={`row-${row + 1}`}
            type="number"
          />
          <select>
            <option value="kg">Kg.</option>
          </select>
        </div>,
      );
    }
    return setRowsOfExercises([...rows]);
  };
  useEffect(() => {
    renderRows();
  }, [sets]);

  useEffect(() => {
    async function handleSearch() {
      const response = await fetch(
        `https://wger.de/api/v2/exercise/search/?term=${searchValue}`,
      );

      const endpointLibrary = await response.json();
      const fetchedExercises = endpointLibrary.suggestions;
      if (fetchedExercises) {
        setExercises([...fetchedExercises]);
      } else if (!fetchedExercises || fetchedExercises.length === 0) {
        setExercises([]);
      }
    }
    const timer = setTimeout(() => {
      handleSearch();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  return (
    <div
      style={{ visibility: showExerciseOverlay ? 'visible' : 'hidden' }}
      css={exerciseOverlay}
    >
      <div>Exercises</div>

      {/* {exercises.map((exercise) => {
  return <p>{exercise.name}</p>;
})} */}
      <div css={dropdown}>
        <input
          className="exercise-input"
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
          value={searchValue}
        />
        <p>{selectedExercise}</p>
        {exercises.length > 0 ? (
          <div className="dropdown">
            <ul>
              {exercises.length > 0
                ? exercises.map((exercise) => {
                    return (
                      <li
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                        role="button"
                        onKeyDown={(e) => {
                          if (e.key === 'e') {
                            setSelectedExercise(exercise.value);
                            setExercises([]);
                            setSearchValue('');
                          }
                        }}
                        onClick={() => {
                          setSelectedExercise(exercise.value);
                          setExercises([]);
                          setSearchValue('');
                        }}
                        key={exercise.data.id}
                      >
                        {exercise.value}
                      </li>
                    );
                  })
                : ''}
            </ul>
          </div>
        ) : (
          ''
        )}
        <p className="numberOfSets">Number of Sets:{sets}</p>
        <SliderWithTooltip
          min={0}
          max={10}
          tipFormatter={(value) => {
            return `${value} `;
          }}
          tipProps={{ overlayClassName: 'foo' }}
          onChange={(value) => {
            setSets(value);
          }}
        />

        <div>
          {sets > 0 ? (
            <div className="columnNames">
              <span className="columnNames-amount">Amount</span>
              <span className="columnNames-unit1">Unit</span>
              <span className="columnNames-weight">Weight</span>
              <span className="columnNames-unit2">Unit</span>
            </div>
          ) : (
            ''
          )}

          <div className="rowsOfExercises">{rowsOfExercises}</div>
          <button
            onClick={() => {
              setShowExerciseOverlay(false);
              const updatedTrainingDays = trainingDays.map((trainingDay) => {
                if (trainingDay.id === workoutDayId) {
                  return {
                    ...trainingDay,
                    exercises: {
                      ...trainingDay.exercises,
                      [selectedExercise]: { sets: { ...rowOfSet } },
                    },
                  };
                }
                return trainingDay;
              });

              axios
                .post(`${baseurl}/api/exercises`, {
                  data: updatedTrainingDays,
                })
                .then((res) => {
                  console.log(res);
                })
                .catch((error) => {
                  console.log(error);
                });

              setTrainingDays([...updatedTrainingDays]);
              setSelectedExercise('');
              setRowOfSet({});
              setRowsOfExercises([]);
            }}
            className="save-button"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
