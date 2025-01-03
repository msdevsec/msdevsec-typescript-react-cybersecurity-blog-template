import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HeaderContainer = styled.header`
  background: rgba(0, 0, 0, 0.95);
  padding: 0.5rem;
  border-bottom: 2px solid #0F0;
  box-shadow: 0 0 10px #0F0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  height: 60px;
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
`;

const LogoImage = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

const Logo = styled(Link)`
  color: #0F0;
  font-size: 1.25rem;
  font-weight: bold;
  text-decoration: none;
  font-family: 'Orbitron', sans-serif;
  text-shadow: 0 0 10px #0F0;
  transition: text-shadow 0.3s ease;
  
  &:hover {
    text-shadow: 0 0 20px #0F0,
                 0 0 30px #0F0,
                 0 0 40px #0F0;
  }
`;

const YouTubeLink = styled.a`
  color: #bf00ff;
  display: inline-flex;
  align-items: center;
  margin-left: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #a000ff;
    filter: drop-shadow(0 0 10px rgba(191, 0, 255, 0.8));
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #0F0;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 2;
  transition: all 0.3s ease;

  @media (max-width: 1200px) {
    display: block;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    color: #0F0;
    filter: drop-shadow(0 0 10px rgba(0, 255, 0, 0.8));
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;

  @media (max-width: 1200px) {
    position: fixed;
    top: 60px;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    bottom: 0;
    width: 250px;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.98);
    padding: 1rem;
    gap: 0;
    transition: right 0.3s ease;
    overflow-y: auto;
    display: flex;
  }
`;

const NavLink = styled(Link)`
  color: #0F0;
  text-decoration: none;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  text-shadow: 0 0 20px rgba(0, 255, 0, 0.8);
  transition: all 0.3s ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #0F0;
    box-shadow: 0 0 10px #0F0;
    transition: width 0.3s ease;
  }
  
  &:hover {
    text-shadow: 0 0 20px rgba(0, 255, 0, 0.8),
                 0 0 30px rgba(0, 255, 0, 0.6),
                 0 0 40px rgba(0, 255, 0, 0.4);
  }
  
  &:hover::after {
    width: 100%;
  }

  @media (max-width: 1200px) {
    width: 100%;
    text-align: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(0, 255, 0, 0.1);

    &:last-child {
      border-bottom: none;
    }
  }
`;

const PentestingLink = styled(NavLink)`
  color: #FF0000;
  text-shadow: 0 0 20px rgba(255, 0, 0, 0.8);
  
  &:after {
    background-color: #FF0000;
    box-shadow: 0 0 10px #FF0000;
  }
  
  &:hover {
    text-shadow: 0 0 20px rgba(255, 0, 0, 0.8),
                 0 0 30px rgba(255, 0, 0, 0.6),
                 0 0 40px rgba(255, 0, 0, 0.4);
  }
`;

const PremiumLink = styled(NavLink)`
  color: #FFD700;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  
  &:after {
    background-color: #FFD700;
    box-shadow: 0 0 10px #FFD700;
  }
  
  &:hover {
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.8),
                 0 0 30px rgba(255, 215, 0, 0.6),
                 0 0 40px rgba(255, 215, 0, 0.4);
  }
`;

const DashboardLink = styled(NavLink)`
  color: #40E0FF;
  text-shadow: 0 0 20px rgba(64, 224, 255, 0.8);
  
  &:after {
    background-color: #40E0FF;
    box-shadow: 0 0 10px #40E0FF;
  }
  
  &:hover {
    text-shadow: 0 0 20px rgba(64, 224, 255, 0.8),
                 0 0 30px rgba(64, 224, 255, 0.6),
                 0 0 40px rgba(64, 224, 255, 0.4);
  }
`;

const LogoutButton = styled.button`
  color: #0F0;
  background: none;
  border: 1px solid #0F0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
    text-shadow: 0 0 15px rgba(0, 255, 0, 0.8);
  }

  @media (max-width: 1200px) {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

const UserName = styled.span`
  color: #9F00FF;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  font-weight: bold;
  text-shadow: 0 0 20px rgba(159, 0, 255, 0.8);
  transition: all 0.3s ease;
  
  &:hover {
    text-shadow: 0 0 20px rgba(159, 0, 255, 0.8),
                 0 0 30px rgba(159, 0, 255, 0.6),
                 0 0 40px rgba(159, 0, 255, 0.4);
  }

  @media (max-width: 1200px) {
    margin: 0.5rem 0;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 1200px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
  }
`;

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Nav>
        <LogoSection>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <LogoImage 
              src="/icons/icon-512x512.png" 
              alt="msdevsec logo" 
            />
            <Logo to="/">MSDEVSEC</Logo>
          </Link>
          <YouTubeLink 
            href="https://youtube.com/@msdevsec" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </YouTubeLink>
        </LogoSection>

        <HamburgerButton onClick={toggleMenu} aria-label="Toggle menu">
          <svg viewBox="0 0 24 24" fill="currentColor">
            {isMenuOpen ? (
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L12 10.586l6.293-6.293a1 1 0 111.414 1.414L13.414 12l6.293 6.293a1 1 0 01-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M4 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm1 4a1 1 0 100 2h14a1 1 0 100-2H5z" clipRule="evenodd" />
            )}
          </svg>
        </HamburgerButton>

        <Overlay isOpen={isMenuOpen} onClick={closeMenu} />
        
        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/tutorials" onClick={closeMenu}>Code Tutorials</NavLink>
          <PentestingLink to="/pentesting" onClick={closeMenu}>Pentesting</PentestingLink>
          <NavLink to="https://github.com/msdevsec" onClick={closeMenu}>Portfolio</NavLink>
          <PremiumLink to="/premium" onClick={closeMenu}>Premium Content</PremiumLink>
          {user ? (
            <>
              <DashboardLink to="/dashboard" onClick={closeMenu}>
                {user.role === 'ADMIN' ? 'Admin Dashboard' : 'Dashboard'}
              </DashboardLink>
              <UserName>Hi, {user.username}</UserName>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={closeMenu}>Sign In</NavLink>
              <NavLink to="/register" onClick={closeMenu}>Sign Up</NavLink>
            </>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
