import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';

const LoginContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12rem 2rem 4rem;
  z-index: 10;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 28rem;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #0F0;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
  border-radius: 0.5rem;
  padding: 2rem;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
`;

const Subtitle = styled.p`
  font-size: 1rem;
  text-align: center;
  color: rgba(0, 255, 0, 0.8);
  font-family: 'Roboto Mono', monospace;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #0F0;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F0;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #0F0;
  border-radius: 0.375rem;
  color: #0F0;
  outline: none;
  transition: all 0.3s ease;
  font-family: 'Roboto Mono', monospace;

  &::placeholder {
    color: rgba(0, 255, 0, 0.5);
  }

  &:focus {
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #0F0;
  color: #000;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #00FF00;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #FF0000;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
`;

const SuccessMessage = styled.div`
  color: #0F0;
  text-align: center;
  font-size: 1.25rem;
  padding: 2rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`;

const ForgotPassword = styled(Link)`
  display: block;
  text-align: center;
  color: #0F0;
  font-size: 0.875rem;
  margin-top: 1rem;
  text-decoration: none;
  opacity: 0.8;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }
`;

const ValidationError = styled.div`
  color: #FF0000;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { login, error, fieldErrors, clearErrors } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearErrors();
    
    try {
      await login(email, password);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      // Error handling is done by AuthContext
      console.error('Login error:', err);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>MSDEVSEC</Logo>
        <Subtitle>Code Tutorials and Penetration Testing</Subtitle>
        {isSuccess ? (
          <SuccessMessage>
            Login successful, redirecting...
          </SuccessMessage>
        ) : (
          <>
            <Title>Sign In</Title>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                {fieldErrors.email && (
                  <ValidationError>{fieldErrors.email[0]}</ValidationError>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                {fieldErrors.password && (
                  <ValidationError>{fieldErrors.password[0]}</ValidationError>
                )}
              </FormGroup>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <SubmitButton 
                type="submit"
                disabled={!email || !password}
              >
                Sign In
              </SubmitButton>

              <ForgotPassword to="/premium">
                Forgot your password? (Premium Feature)
              </ForgotPassword>
            </form>
          </>
        )}
      </LoginCard>
    </LoginContainer>
  );
};
