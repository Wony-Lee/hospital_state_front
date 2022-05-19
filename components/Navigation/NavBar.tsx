import React, {useCallback, useEffect, useState} from 'react';
import Link from 'next/link'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import {setSwitchLogin, setUserInfo} from "../../reduces/userSlice";
import {useAppDispatch, useAppSelector} from "../../store";

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
    const dispatch = useAppDispatch()
    const router = useRouter()
    const isLogin = useAppSelector(state => state.user.isLogin)
    const handleLogout = useCallback(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/logout`, {
            method:"POST"
        })
            .then(res => console.log(res))
            .catch(err => {
                console.error(err, 'LOGOUT API CALL FAIL')
            })
        localStorage.clear();
        dispatch(setSwitchLogin(false))
        router.push('/')
    }, [isLogin])
    useEffect(()=>{
    },[handleLogout, isLogin])
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

export default React.memo(NavBar)
