import styled from "@emotion/styled";
import { Box, Link } from "@mui/material";
import { purple } from "@mui/material/colors";
import { Container } from "@mui/system";
import { NavLink } from "react-router-dom";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${purple[700]};
  padding: 20px 0;
`;

const Items = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Container>
        <Items>
          <div>
            <NavLink to="/">Posts</NavLink>
          </div>
          <div>
            <NavLink to="/signin">Sign in</NavLink>
          </div>
        </Items>
      </Container>
    </NavbarContainer>
  );
};

export default Navbar;
