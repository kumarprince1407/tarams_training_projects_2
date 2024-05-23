//UserContainer.jsx
import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../redux";

function UserContainer({ fetchUsers, userData }) {
  useEffect(() => {
    fetchUsers();
  }, []);
  //The 'UserContainer' dispatches the 'fetchUsers' action when it mounts
  return (
    <div>
      {userData.loading ? (
        <h2>Loading</h2>
      ) : userData.error ? (
        <h2>userData.error</h2>
      ) : (
        <div>
          <h2>User List: </h2>
          <div>
            {userData &&
              userData.users &&
              userData.users.map((user) => <p>{user.name}</p>)}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(UserContainer);
