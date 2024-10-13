import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, message } from "antd";
import PropTypes from "prop-types";
import { logout } from "../../actions/authActions";
import "../../dashboard.css";

const Dashboard = ({ nestedRoute: Child }) => {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    activeNav();
  }, [location]);

  const activeNav = () => {
    const pathname = location.pathname;
    const possibleRoutes = [
      { route: "/dashboard", targetId: "home" },
      { route: "/addProduct", targetId: "addProduct" },
      { route: "/products", targetId: "products" },
      { route: "/profile", targetId: "profile" },
    ];
    possibleRoutes.forEach(({ route, targetId }) => {
      window.jQuery(`#${targetId}`).removeClass("active");
      if (route === pathname) {
        window.jQuery(`#${targetId}`).addClass("active");
      }
    });
  };

  const avatarText = (name) => {
    return name.split(" ").map((n) => n.charAt(0)).join("");
  };

  const logUserOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div id="wrapper">
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
          <div className="sidebar-brand-text mx-3">
            <i className="fas fa-store"></i> e-Shop
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Merchant Store</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <li className="nav-item">
          <Link className="nav-link" to="/dashboard/addProduct">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Add A Product</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <li className="nav-item">
          <Link className="nav-link" to="/dashboard/products">
            <i className="fas fa-fw fa-table"></i>
            <span>Products</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <li className="nav-item">
          <Link className="nav-link" to="/dashboard/profile">
            <i className="far fa-id-card"></i>
            <span>Profile</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />
      </ul>

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
              <i className="fa fa-bars"></i>
            </button>

            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>

            <ul className="navbar-nav ml-auto">
              <div className="topbar-divider d-none d-sm-block"></div>

              <li className="nav-item dropdown no-arrow">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                    {user?.name}
                  </span>
                  <Avatar size={40}>{user?.name && avatarText(user.name)}</Avatar>
                </Link>

                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                  <Link className="dropdown-item" to="#">
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Profile
                  </Link>
                  <Link className="dropdown-item" to="#">
                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    Settings
                  </Link>
                  <Link className="dropdown-item" to="#">
                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                    Activity Log
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="#" onClick={logUserOut}>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                  </Link>
                </div>
              </li>
            </ul>
          </nav>

          <Child search={search} />
        </div>

        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; eShop {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </div>

      <Link className="scroll-to-top rounded" to="#page-top">
        <i className="fas fa-angle-up"></i>
      </Link>
    </div>
  );
};

Dashboard.propTypes = {
  nestedRoute: PropTypes.object.isRequired,
};

export default Dashboard;
