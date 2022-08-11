import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import { logout } from "../actions/userAction.js"
const Header = ({ location }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    window.location.href = "/"
  }

  const profileHandler = () => {
    window.location.href = "/profile"
  }
  return (
    <header>
      <Container>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <span>Eco ||</span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarColor03"
              aria-controls="navbarColor03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor03">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/cart"
                    onClick={() => (window.location.href = "/cart")}
                  >
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Link>
                </li>
                <li className="nav-item">
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="username">
                      <Link
                        onClick={profileHandler}
                        style={{ textDecoration: "none" }}
                      >
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </Link>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <Link
                      className="nav-link"
                      onClick={() => (window.location.href = "/login")}
                    >
                      <i className="fas fa-user"></i> Sign In
                    </Link>
                  )}
                </li>
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="adminmenu">
                    <Link
                      onClick={() => (window.location.href = "/admin/userlist")}
                    >
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </Link>
                    <Link
                      onClick={() =>
                        (window.location.href = "/admin/productlist")
                      }
                    >
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </Link>
                    <Link
                      onClick={() =>
                        (window.location.href = "/admin/orderlist")
                      }
                    >
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </Link>
                  </NavDropdown>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header
