import React, { useState, useEffect } from 'react';
import apiService from '../services/api.service';

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = token => {
    localStorage.setItem('authToken', token);
  };

  const signup = async requestBody => {
    return apiService.signup(requestBody);
  };

  const login = async requestBody => {
    return apiService.login(requestBody).then(response => {
      console.log('JWT token', response.data.authToken);
      storeToken(response.data.authToken);
      authenticateUser();
    });
  };

  const authenticateUser = () => {
    apiService
      .verify()
      .then(response => {
        // If the server verifies that JWT token is valid  ✅
        const user = response.data;
        // Update state variables
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);
      })
      .catch(() => {
        // If the server sends an error response (invalid token) ❌
        // Update state variables
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      });
  };

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem('authToken');
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    // Run the function after the initial render,
    // after the components in the App render for the first time.
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser, signup, login }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
