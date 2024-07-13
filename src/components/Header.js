import { Avatar } from "@material-ui/core";
import { AccessTime, HelpOutline, Search } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Header() {
  const [user] = useAuthState(auth);
  const handleSignOut = () => {
    auth.signOut().catch((error) => console.error("Sign out error", error));
  };
  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar
          onClick={handleSignOut}
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTime />
      </HeaderLeft>

      <HeaderSearch>
        <Search />
        <input type="text" placeholder="Search Slack Clone" />
      </HeaderSearch>

      <HeaderRight>
        <HelpOutline />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;
const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;
  > .MuiSvgIcon-root {
    margin-left: auto;
    /* background-color: red; */
    margin-right: 30px;
  }
`;
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  /* background-color: red; */
  text-align: center;
  display: flex;
  padding: 0px 50px;
  color: gray;
  border: 1px gray solid;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: white;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;
  > .MuiSvgIcon-root {
    /* background-color: red; */
    margin-left: auto;
    margin-right: 20px;
  }
`;
