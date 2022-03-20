import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import './Signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { signup } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  const handleSignupSubmit = e => {
    e.preventDefault();
    const requestBody = { email, password };

    signup(requestBody)
      .then(() => {
        navigate('/login');
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="container signup">
      <h1>Welcome to Buddy Films</h1>
      <p>
        Hey movie lover!
        <br />I guess you are new around here. Please create your account to get the most from this app.
      </p>
      <form onSubmit={handleSignupSubmit}>
        <label>Email address</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />
        <label>Password</label>
        <input type="password" name="password" value={password} onChange={handlePassword} />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p className="text">
        Already have account?
        <br />
        Log in <Link to={'/login'}>here</Link>.
      </p>
    </div>
  );
}

export default Signup;
