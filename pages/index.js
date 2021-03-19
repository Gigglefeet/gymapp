import Head from 'next/head';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../components/Layout';

const navigationBar = css`
  .navBarIndex {
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;
    font-size: 32px;
    background-color: #9711a8;
  }
`;

export default function Home() {
  return (
    <>
      <Layout>
        <div className="frontpage">
          <Head>
            <title>GymApp</title>
          </Head>
        </div>
        <div css={navigationBar}>
          <section>
            <div>Home</div>
          </section>
        </div>
      </Layout>
    </>
  );
}

// const {};
