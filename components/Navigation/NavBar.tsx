import React from 'react';
import Link from 'next/link'
import styled from '@emotion/styled'

const NavBarLayout = styled.div`
  
  border:1px solid red;
`;

const NavList = styled.ul`
  display:flex;
  justify-content: center;
  width:100%;
`;
const NavItem = styled.li`
  margin:3px;
`;

const NavBar = () => {
    return (
        <NavBarLayout>
            <NavList>
                <NavItem>
                    <Link href={"/"}>
                    메인
                    </Link>
                </NavItem>
                <NavItem>
                    <Link href={"/posts"}>
                    게시글
                    </Link>
                </NavItem>
                <NavItem>
                    <Link href={"/hospitalWrite"}>
                    글작성
                    </Link>
                </NavItem>
            </NavList>
        </NavBarLayout>
    )
}

export default NavBar
