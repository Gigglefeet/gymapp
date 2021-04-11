import Head from 'next/head';
import Link from 'next/link';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// This controls the navbar
const frontPage = css`
  .navBarFront {
    position: fixed;
    width: 100vw;
    top: 0px;
    display: flex;
    justify-content: center;
    margin: 0;
    font-size: 32px;
    background-color: black;
    padding: 10px 0;
    z-index: 1;
  }
  ${'' /* a tag in the navigationBar menu below this */}
  a {
    position: relative;
    margin: 5px 75px;
    text-decoration: none;
    ${'' /* neon yellow color #ffff01 */}
    color: white;
  }
  .topLink {
    margin-right: auto;
  }

  ${
    '' /* .imageContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    margin-left: 80px;
  } */
  }
  p {
    margin-right: 20px;
  }
`;

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>Gym80</title>
        <link rel="icon" href="/public/favicon.ico/" />
      </Head>
      <header css={frontPage}>
        <nav className="navBarFront">
          <Link href="/myprofile">
            <a>My Profile</a>
          </Link>
          <Link href="/mygym">
            <a>My exercises</a>
          </Link>
          <Link href="/">
            <a>|</a>
          </Link>
          <div>
            {!props.isSessionValid ? (
              <>
                <Link href="/register">
                  <a data-cy="header-register">Register</a>
                </Link>
                <Link href="/login">
                  <a data-cy="header-login">Login</a>
                </Link>
              </>
            ) : (
              <Link href="/logout">
                <a data-cy="header-logout">Logout</a>
              </Link>
            )}
          </div>
        </nav>
      </header>
      {props.children}
    </>
  );
}
