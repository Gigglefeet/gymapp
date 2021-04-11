import Head from 'next/head';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Image from 'next/image';

const navigationBar = css`
  margin-top: 20px;
  .navBarIndex {
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;
    font-size: 32px;
    background-color: #9711a8;
  }
  .mountain-fight {
    border-radius: 20px;
    width: 650px;
    height: 500;
    margin: 90px;
  }
  .welcome-to-training {
    color: white;
  }
  .section-wrapper {
    display: grid;
    grid-template-columns: 30vw;
    grid-template-rows: 1fr 1fr 1fr;
    justify-content: center;
  }
`;

export default function MyProfile() {
  return (
    <>
      <div className="frontpage">
        <Head>
          <title>Gym80</title>
        </Head>
      </div>
      <div css={navigationBar}>
        <section className="section-wrapper">
          <div className="welcome-to-training">
            <h3>Welcome to the greates gratuation ever built</h3>
            <h3>
              What do you do when you look like this and you have lost your job
              because of Corona?
            </h3>

            <Image
              className="mountain-fight"
              src="/fat-me.jpg"
              alt="Me unhappy after loosing my job because of corona"
              width={650}
              height={800}
            />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h3>
              STEP 1: <br />
              Make your own training app.{' '}
              <h1>"""Setja inn screenshot af appinu mínu"""</h1>
            </h3>
            <h3>
              STEP 2: <br />
              Sign up for a full stack web development Bootcamp at UpLeveled.
            </h3>
            <h1>Setja inn mynd af UpLeveled logoinu</h1>
            <h3>
              STEP 3: <br />
              Start training to fight the mountain.
            </h3>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <Image
              className="mountain-fight"
              src="/trainingToFightTheMountain.jpg"
              alt="Hafthor in a t-shirt saying training to fight the mountain"
              width={650}
              height={650}
            />
            <h3>
              But obviously that takes a lot of training. So let's get going.{' '}
              <br />
            </h3>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Image
              className="mountain-fight"
              src="/fightingmountain.jpg"
              alt="Me fighting the Mountain from Game of Thrones"
              width={650}
              height={500}
            />
            <div>
              <h3>Of course I destroyed him after the picture was taken </h3>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

// const {};
