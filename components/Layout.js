import Head from 'next/head';
import Link from 'next/link';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// This controls the navbar
const frontPage = css`
  .navBarFront {
    position: relative;
    width: 100vw;
    top: 0px;
    display: flex;
    justify-content: flex-end;
    margin: 0;
    font-size: 32px;
    background-color: black;
    padding: 10px 0;
  }
  ${'' /* a tag in the navigationBar menu below this */}
  a {
    position: relative;
    margin: 5px 75px;
    text-decoration: none;
    color: #ffff01;
  }
  .topLink {
    margin-right: auto;
  }
  .bodyOfFrontPage {
    font-size: 45px;
    background-color: blue;
  }
  .imageContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    margin-left: 80px;
  }
  p {
    margin-right: 20px;
  }
`;

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>GymApp</title>
        <link rel="icon" href="/public/favicon.ico/" />
      </Head>
      <header css={frontPage}>
        <nav className="navBarFront">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/mygym">
            <a>Training</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/register">
            <a href="header-register">Register</a>
          </Link>
          <Link href="/login">
            <a href="header-login">Login</a>
          </Link>
        </nav>
      </header>
      {props.children}
    </>
  );
}
