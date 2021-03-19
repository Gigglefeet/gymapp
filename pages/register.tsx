import Head from 'next/head';
import Layout from '../components/layout';
import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>

      <form
        onSubmit={async () => {
          await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
        }}
      >
        <label>
          username:
          <input
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <label>
          password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <button type="submit">register</button>
      </form>
    </Layout>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookie = await import('cookie');
  const {
    createSessionWithFiveMinuteExpiry,
    deleteAllExpiredSessions,
  } = await import('../util/database');

  const { serializeSecureCookieServerSide } = await import('../util/cookies');

  await deleteAllExpiredSessions();

  const token =
    context.req.cookies.session ||
    (await createSessionWithFiveMinuteExpiry()).token;

  console.log('token', token);

  const sessionCookie = serializeSecureCookieServerSide(
    'session',
    token,
    60 * 5,
  );

  context.res.setHeader('Set-Cookie', sessionCookie);

  return { props: {} };
}
