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
    ${'' /* border-radius: 20px; */}
  }
  .image-wrapper {
    justify-self: center;
    width: 650px;
    height: 800px;
  }
  .all-images {
    width: 100%;
    border-radius: 20px;
  }
  .mountain-wrapper {
    justify-self: center;
    width: 650px;
    height: 650px;
  }
  .upleveled-wrapper {
    justify-self: center;
    width: 750px;
    height: 550px;
  }
  .gym80-wrapper {
    justify-self: center;
    width: 750px;
    height: 550px;
  }
  .meposing2-wrapper {
    justify-self: center;
    width: 650px;
    height: 500px;
  }
  .mountain-fight-wrapper {
    justify-self: center;
    width: 650px;
    height: 500px;
  }
  .meme-wrapper {
    justify-self: center;
    width: 650px;
    height: 500px;
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
            <h1>
              The first chapter in my Web Development story begins here...
            </h1>
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
            <br />
            <br />
            <br />
            <h1>I just lost my job And...</h1>
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
            <div className="image-wrapper">
              <img className="all-images" src="/fat-me.jpg" alt="" />
            </div>
            <br />
            {/* <Image
              className="mountain-fight"
              src="/fat-me.jpg"
              alt="Me unhappy after loosing my job because of corona"
              width={650}
              height={800}
            /> */}
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
            <h1>STEP 1: Start training to fight "the Mountain".</h1>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="mountain-wrapper">
              <img
                className="all-images"
                src="/trainingToFightTheMountain.jpg"
                alt=""
              />
            </div>
            {/* <Image
              className="mountain-fight"
              src="/trainingToFightTheMountain.jpg"
              alt="The Mountain from game of thrones"
              width={650}
              height={650}
            /> */}
            <br />
            <br />
            <h1>But obviously that takes a lot of training. </h1>
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

            <h1>
              STEP 2: <br />
              Sign up for a full stack web development Bootcamp at UpLeveled.
            </h1>

            <br />
            <div className="upleveled-wrapper">
              <img
                className="all-images"
                src="/upleveled-screenshot.png"
                alt=""
              />
            </div>
            {/* <Image
              className="mountain-fight"
              src="/upleveled-screenshot.png"
              alt="UpLeveled screenshot"
              width={950}
              height={550}
            /> */}
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
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1>
              STEP 3: Make my own training plan application <br />
            </h1>
            <br />
            <br />
            <div className="gym80-wrapper">
              <img className="all-images" src="/gym80-screenshot.png" alt="" />
            </div>
            {/* <Image
              className="mountain-fight"
              src="/gym80-screenshot.png"
              alt="Screenshot of my training app."
              width={950}
              height={550}
            /> */}
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
            <br />
            <br />
            <h1>Now I'm ready to fight "The Mountain".</h1>
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
            <div className="image-wrapper">
              <img className="all-images" src="/fat-me.jpg" alt="" />
            </div>
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
            <div className="meposing2-wrapper">
              <img className="all-images" src="/me-posing1.jpg" alt="" />
            </div>

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
            <div className="mountain-fight-wrapper">
              <img className="all-images" src="/fightingmountain.jpg" alt="" />
            </div>
            {/* <Image
              className="mountain-fight"
              src="/fightingmountain.jpg"
              alt="Me fighting the Mountain from Game of Thrones"
              width={650}
              height={500}
            /> */}
            <div>
              <h1>
                You probably can't tell but I was just slowly preparing a rear
                naked choke hold. He didn't have a chance.{' '}
              </h1>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <h1>Thank you for watching.</h1>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <div className="meme-wrapper">
                <img className="all-images" src="/your_meme.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
