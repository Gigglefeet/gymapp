/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Error } from '../util/types';
import { Button, Checkbox } from '@material-ui/core';
const labels = css`
  margin-top: 75px;
  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 10%;
    color: white;
    margin: 0 auto;
  }
  .register-button {
    display: flex;
    justify-content: center;
  }
  input {
    border-radius: 5px;
  }
  Button {
    color: #e555f8;
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
`;

type Props = {
  csrfToken: string;
};

export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Error[]>([]);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
              csrfToken: props.csrfToken,
            }),
          });

          const { user, errors: returnedErrors } = await response.json();

          if (returnedErrors) {
            setErrors(returnedErrors);
            return;
          }

          const returnTo = Array.isArray(router.query.returnTo)
            ? router.query.returnTo[0]
            : router.query.returnTo;

          router.push('/login'); // change this when finished with the whole auth setup.
        }}
      >
        <div css={labels}>
          <label>
            Username:
            <input
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
            <Button
              className="material-button"
              variant="outlined"
              size="small"
              color="primary"
              type="submit"
            >
              Register
            </Button>
          </label>
        </div>
      </form>

      {errors.map((error) => (
        <div style={{ color: 'red' }} key={`error-message-${error.message}`}>
          {error.message}
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/register`,
        permanent: true,
      },
    };
  }

  const { createCsrfToken } = await import('../util/auth');
  const { getSessionByToken, deleteAllExpiredSessions } = await import(
    '../util/database'
  );
  const { createSessionWithCookie } = await import('../util/sessions');

  let session = await getSessionByToken(context.req.cookies.session);

  // If the user already has a valid session cookie,
  // don't allow visiting the register page
  if (session?.userId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  await deleteAllExpiredSessions();

  if (!session) {
    const result = await createSessionWithCookie();
    session = result.session;
    context.res.setHeader('Set-Cookie', result.sessionCookie);
  }

  // At this point, we have either used the existing
  // valid session token, or we have created a new one.
  //
  // We can use this to generate a CSRF token
  // to mitigate CSRF attacks
  const csrfToken = createCsrfToken(session.token);

  return { props: { csrfToken: csrfToken } };
}
