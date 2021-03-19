import {
  css,
  Global,
} from '@emotion/react';

const myGlobalStyles = css`
  body {
    margin: 0;
    padding: 0;
    background-color: #1c1a1a;
    color: #39ff14;
  }
`;
// Globastyles apply to all the pages in the pages folder
export const globalStyles = <Global styles={myGlobalStyles} />;
