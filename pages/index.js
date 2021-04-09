import Head from 'next/head';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Image from 'next/image';

const navigationBar = css`
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
    padding: 20px;
  }
  .welcome-to-training {
  }
  .section-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function MyProfile() {
  return (
    <>
      <div className="frontpage">
        <Head>
          <title>GymApp</title>
        </Head>
      </div>
      <div css={navigationBar}>
        <section className="section-wrapper">
          <div className="welcome-to-training">
            <h3>Welcome to my training app</h3>
          </div>
          {/* // don't forget to comment the picture in before the graduation event */}
          <Image
            className="mountain-fight"
            src="/fightingmountain.jpg"
            alt="Me fighting the Mountain from Game of Thrones"
            width={650}
            height={500}
          />
          <div>
            <h3>I destroyed him after the picture was taken </h3>
          </div>
        </section>
      </div>
    </>
  );
}

// const {};
