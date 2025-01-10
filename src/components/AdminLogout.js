// src/components/AdminLogout.js
import React from "react";
import styled from "styled-components";

const LogoutButton = styled.button`
    padding: 5px 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #c82333;
    }
`;

function AdminLogout({ onLogout }) { // onLogout prop 추가
    const handleLogout = () => {
        sessionStorage.removeItem("isAdmin");
        onLogout(); // 로그아웃 시 onLogout 함수 호출
    };

    return <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>;
}

export default AdminLogout;