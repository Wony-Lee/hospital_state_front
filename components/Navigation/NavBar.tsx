import React, {useCallback, useEffect, useState} from 'react';
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
    const [isLogin, setIsLogin] = useState(false)
    const handleLogout = useCallback(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/logout`, {
            method:"POST"
        })
            .then(res => console.log(res))
            .catch(err => {
                console.error(err, 'LOGOUT API CALL FAIL')
            })
        localStorage.clear();
        setIsLogin(false)
    }, [isLogin])
    useEffect(()=>{
        const isLoginCheck = localStorage.getItem('IsLogin')
        if(isLoginCheck) setIsLogin(true)
    },[handleLogout,isLogin])
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
                {
                    isLogin ?
                    <NavItem onClick={handleLogout}>
                        로그아웃
                    </NavItem>
                        :
                    <NavItem>
                        <Link href={"/login"}>
                            로그인
                        </Link>
                    </NavItem>
                }
            </NavList>
        </NavBarLayout>
    )
}

export default NavBar
