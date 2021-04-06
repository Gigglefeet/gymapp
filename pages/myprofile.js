import React from 'react';
import Image from 'next/image';
import Layout from '../components/layout';

export default function home() {
  return (
    <Layout>
      <div>
        <h1>My Profile</h1>
        <Image
          src="/training.png"
          alt="picture of a deadlifter getting ready to lift"
          width={650}
          height={500}
        />
        <p>Welcome to your profile!</p>
      </div>
    </Layout>
  );
}
