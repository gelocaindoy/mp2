import { useEffect, useState } from "react";
import { Route, withRouter } from "react-router-dom";
import firebase from "../firebaseConfig";

// renders the appropriate component
const AccountTypeRoute = withRouter(
  ({ component: Component, accountType, history, ...rest }) => {
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("Rendering AccountTypeRoute with accountType:", accountType);

    useEffect(() => {
      // Fetch the user's account type
      const user = firebase.auth().currentUser;
      if (user) {
        firebase
          .database()
          .ref("employees")
          .child(user.uid)
          .once("value")
          .then((snapshot) => {
            const employee = snapshot.val();
            console.log("employee:", employee);
            const userType = accountType;
            console.log("Setting userType to", userType);
            setUserType(userType);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setLoading(false);
      }

      // Listen for changes in the URL
      const unlisten = history.listen(() => {
        if (userType !== accountType) {
          setLoading(true); // Trigger a re-render when the URL changes
        }
      });

      if (userType === accountType) {
        setLoading(false);
      }

      return () => {
        unlisten();
      };
    }, [history, accountType, userType]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (userType === accountType) {
      return <Route {...rest} render={(props) => <Component {...props} />} />;
    } else {
      return <h1>You don't have permission to access this page</h1>;
    }
  }
);

export default AccountTypeRoute;
