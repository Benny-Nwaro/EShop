import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({ children }) => {
  if (!localStorage.token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(ProtectedRoute);
