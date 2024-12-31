import React from 'react';
import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';
import MatrixRain from '../MatrixRain';

interface MainLayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #000;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  position: relative;
  z-index: 1;
`;

const MatrixBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const HeaderWrapper = styled.div`
  position: relative;
  z-index: 2;
  border-bottom: 1px solid #0F0;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`;

const FooterWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <MatrixBackground>
        <MatrixRain />
      </MatrixBackground>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <MainContent>
        {children}
      </MainContent>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </LayoutContainer>
  );
};

export default MainLayout;
