import { css, Global } from '@emotion/react';

const myGlobalStyles = css`
  body {
    margin: 0;
    padding: 0;
    background-color: #1c1a1a;
    ${'' /* neon green color #39ff14 */}
    color: black;
  }
`;

export const globalStyles = <Global styles={myGlobalStyles} />;
