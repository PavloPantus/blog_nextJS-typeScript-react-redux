import * as React from 'react';
import Head from 'next/head';
import Header from "./Header/Header";
import styled from "styled-components";

const StyledPageContainer = styled.div`
  min-height: 70vh;
`

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <StyledPageContainer>
      {children}
    </StyledPageContainer>
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
