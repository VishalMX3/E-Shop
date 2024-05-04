import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined, KeyboardArrowDown } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import { resetCart } from "../redux/cartRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "1px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 2px;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  display: flex;
  font-size: 18px;
  margin-top: auto;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const AdminLink = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const DropdownArrow = styled(KeyboardArrowDown)`
  margin-left: 5px;
`;

const DropdownContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(dispatch);
    setIsOpen(false);
    dispatch(resetCart());
    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/">
            <Logo>E-SHOP</Logo>
          </Link>
        </Center>
        <Right>
          {user ? (
            <>
              {user.userName !== "admin" && (
                <>
                <DropdownContainer>

                  <MenuItem onClick={() => setIsOpen(!isOpen)}>
                      Hi {user.userName} <DropdownArrow />
                  </MenuItem>
                  <DropdownContent isOpen={isOpen}>
                  <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                  </DropdownContent>
                </DropdownContainer>
                </>
              )}
              {user.userName === "admin" && (
                <>
                  <AdminLink href="https://e-shop-admin-xxa1.onrender.com/" target="_blank" rel="noopener noreferrer">
                    Admin Portal
                  </AdminLink>
                  <DropdownContainer>
                  <MenuItem onClick={() => setIsOpen(!isOpen)}>
                    Hi {user.userName} <DropdownArrow />
                  </MenuItem>
                  <DropdownContent isOpen={isOpen}>
                  <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                  </DropdownContent>
                </DropdownContainer>               
                </>
              )}
            </>
          ) : (
            <>
              <Link to="/register">
                <MenuItem>SIGNUP</MenuItem>
              </Link>
              <Link to="/login">
                <MenuItem>LOGIN</MenuItem>
              </Link>
            </>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;