/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Dispatch, SetStateAction, useEffect } from 'react';

const buttons = css`
  h1 {
    color: white;
  }
`;

type Props = {
  setIsSessionStateStale: Dispatch<SetStateAction<boolean>>;
};
export default function Logout(props: Props) {
  useEffect(() => {
    props.setIsSessionStateStale(true);
  }, [props]);
  return (
    <div css={buttons}>
      <Head>
        <title>Logged out successfully</title>
      </Head>

      <h1>Logged out successfully</h1>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { deleteSessionByToken } = await import('../util/database');
  const { serializeEmptyCookieServerSide } = await import('../util/cookies');

  await deleteSessionByToken(context.req.cookies.session);
  const emptyCookie = serializeEmptyCookieServerSide('session');
  context.res.setHeader('Set-Cookie', emptyCookie);
  return { props: {} };
}
