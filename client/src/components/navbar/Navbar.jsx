import styled from "@emotion/styled";
import { Box, Link } from "@mui/material";
import { purple } from "@mui/material/colors";
import { Container } from "@mui/system";

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
            <Link>Posts</Link>
          </div>
          <div>
            <Link>Sign in</Link>
          </div>
        </Items>
      </Container>
    </NavbarContainer>
  );
};

export default Navbar;
