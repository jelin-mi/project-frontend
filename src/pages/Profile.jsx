import { useContext } from "react";
import { AuthContext } from "../context/auth.context";



//TODO

function Profile() {
  const { /* isLoggedIn, */ /* user, */ logOutUser } = useContext(AuthContext);
  

  return (
    <>
      <h1>User profile</h1>
      <button onClick={logOutUser}>Logout</button>
    </>
  );
}

export default Profile;