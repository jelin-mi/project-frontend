import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /* const [name, setName] = useState(''); */
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { signup } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  /*   const handleName = e => setName(e.target.value); */

  const handleSignupSubmit = e => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password /* , name  */ };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state``
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
    <div className="SignupPage">
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

        {/* <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} /> */}

        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>
        Already have account?
        <br />
        Log in <Link to={'/login'}>here</Link>.
      </p>
    </div>
  );
}

export default SignupPage;
