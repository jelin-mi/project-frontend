import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { AuthContext } from "../context/auth.context";
import apiService from "../services/api.service";

function Profile() {
  const [ profile, setProfile] = useState({});
  const { /* isLoggedIn, */ /* user, */ logOutUser } = useContext(AuthContext);
  
  useEffect(() => {
    apiService
    .getProfile({})
    .then(response => {
      console.log(response.data);
      console.table(response.data);
      setProfile(response.data)
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  console.log(profile);

  return (
    <>
      <div className="container">
        <h1>User profile</h1>
        <p>{profile.email}</p>
        <button onClick={logOutUser}>Logout</button>
      </div>
      <Navbar />
    </>
  );
}

export default Profile;