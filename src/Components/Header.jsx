import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loader, setLoader } =
    useContext(Context);

  const handleLoggedOut = async () => {
    setLoader(true);
    try {
      await axios.get(
        `${server}/users/logout`,

        {
          withCredentials: true,
        }
      );
      toast.success("Logged out Success", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsAuthenticated(false);
      setLoader(false);
    } catch (err) {
      setLoader(false);

      setIsAuthenticated(true);
    }
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Todo App</Navbar.Brand>
        <Nav className="me-center">
          <Nav.Link>
            <Link to="/">Home</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/profile">Profile</Link>
          </Nav.Link>
          {isAuthenticated ? (
            <Button disabled={loader} onClick={handleLoggedOut}>
              Logout
            </Button>
          ) : (
            <Nav.Link>
              <Link to="/login">Log In</Link>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
