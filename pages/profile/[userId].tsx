/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Error, User } from '../../util/types';
import Layout from '../../components/Layout';

const labels = css`
  display: flex;
  justify-content: center;
  color: white;
`;

type Props = {
  user?: User;
  errors: Error[];
};

export default function Profile(props: Props) {
  if (!props.user) {
    return (
      <Layout>
        <Head>
          <title>{props.errors[0].message}</title>
        </Head>
        <h1>{props.errors[0].message}</h1>
      </Layout>
    );
  }

  return (
    <div css={labels}>
      <Head>
        <title>User Profile: {props.user.username}</title>
      </Head>

      <h1>{props.user.username}</h1>

      <div>id: {props.user.id}</div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUserById, getSessionByToken } = await import(
    '../../util/database'
  );
  const session = await getSessionByToken(context.req.cookies.session);
  console.log(session);

  if (!session || session.userId !== Number(context.query.userId)) {
    return {
      props: {
        user: null,
        errors: [{ message: 'Access denied' }],
      },
    };
  }

  const user = await getUserById(context.query.userId);
  return { props: { user: user } };
}
