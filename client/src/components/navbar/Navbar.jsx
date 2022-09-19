import styled from "@emotion/styled";
import { Box, Link } from "@mui/material";
import { purple } from "@mui/material/colors";
import { Container } from "@mui/system";
import { NavLink } from "react-router-dom";

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  background: ${purple[700]};
  padding: 20px 0;
`;

const Items = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    gap: 20px;
  }
`;

const Navbar = () => {
  const token = localStorage.getItem("token");

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <NavbarContainer>
      <Container>
        <Items>
          <div>
            <NavLink to="/">Posts</NavLink>
            <NavLink to="/chat">Chat</NavLink>
          </div>
          <div>
            {token ? (
              <a onClick={handleClickLogout}>Logout</a>
            ) : (
              <NavLink to="/signin">Sign in</NavLink>
            )}
          </div>
        </Items>
      </Container>
    </NavbarContainer>
  );
};

export default Navbar;
