import { useState, FormEvent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const Card = styled.div`
  width: 100%;
  max-width: 28rem;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #0F0;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
  border-radius: 0.5rem;
  padding: 2rem;
  margin: 1rem;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #0F0;
  font-family: 'Orbitron', sans-serif;
  margin-bottom: 2rem;
  text-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #0F0;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`;

const Description = styled.p`
  text-align: center;
  color: #0F0;
  margin-bottom: 2rem;
  opacity: 0.8;
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
  color: #fff;
  outline: none;
  transition: all 0.3s ease;

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

const SuccessMessage = styled.div`
  color: #0F0;
  text-align: center;
  font-size: 1.25rem;
  padding: 2rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`;

const ValidationError = styled.div`
  color: #FF0000;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  const validateEmail = () => {
    if (!email) {
      setValidationError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError('Please enter a valid email address');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }

    // TODO: Implement password reset functionality
    setIsSuccess(true);
  };

  return (
    <Container>
      <Card>
        <Logo>MSDEVSEC</Logo>
        {isSuccess ? (
          <SuccessMessage>
            If an account exists for {email}, you will receive password reset instructions.
          </SuccessMessage>
        ) : (
          <>
            <Title>Reset Password</Title>
            <Description>
              Enter your email address and we'll send you instructions to reset your password.
            </Description>
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
                {validationError && (
                  <ValidationError>{validationError}</ValidationError>
                )}
              </FormGroup>

              <SubmitButton 
                type="submit"
                disabled={!email}
              >
                Send Reset Instructions
              </SubmitButton>
            </form>
          </>
        )}
      </Card>
    </Container>
  );
};
