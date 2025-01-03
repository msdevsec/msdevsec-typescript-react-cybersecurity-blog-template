import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';

const RegisterContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10rem 2rem 4rem;
  z-index: 10;
`;

const RegisterCard = styled.div`
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

const ValidationError = styled.div`
  color: #FF0000;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const StyledLink = styled(Link)`
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

const SignInLink = styled(StyledLink)`
  color: #9F00FF;
  font-weight: 600;
  margin-top: 1rem;

  &:hover {
    text-shadow: 0 0 10px rgba(159, 0, 255, 0.5);
  }
`;

export const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, error, fieldErrors, clearErrors } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearErrors();
    
    try {
      await register(formData);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const isFormComplete = Object.values(formData).every(value => value.length > 0);

  return (
    <RegisterContainer>
      <RegisterCard>
        <Logo>MSDEVSEC</Logo>
        <Subtitle>Code Tutorials and Penetration Testing</Subtitle>
        {isSuccess ? (
          <SuccessMessage>
            Registration successful, redirecting...
          </SuccessMessage>
        ) : (
          <>
            <Title>Create Account</Title>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
                {fieldErrors.firstName && (
                  <ValidationError>{fieldErrors.firstName[0]}</ValidationError>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
                {fieldErrors.lastName && (
                  <ValidationError>{fieldErrors.lastName[0]}</ValidationError>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
                />
                {fieldErrors.username && (
                  <ValidationError>{fieldErrors.username[0]}</ValidationError>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Choose a password"
                  required
                />
                {fieldErrors.password && (
                  <ValidationError>{fieldErrors.password[0]}</ValidationError>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
                {fieldErrors.confirmPassword && (
                  <ValidationError>{fieldErrors.confirmPassword[0]}</ValidationError>
                )}
              </FormGroup>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <SubmitButton 
                type="submit"
                disabled={!isFormComplete}
              >
                Create Account
              </SubmitButton>

              <SignInLink to="/login">
                Already have an account? Sign In Now!
              </SignInLink>
            </form>
          </>
        )}
      </RegisterCard>
    </RegisterContainer>
  );
};
