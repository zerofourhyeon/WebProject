import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../api';
import styled from 'styled-components';

const LoginContainer = styled.div`
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const ErrorMessage = styled.div`
    color: #dc3545;
    margin-top: 10px;
`;

function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await adminLogin(password);
            
            if (response.success) {
                // JWT 토큰 저장
                sessionStorage.setItem('adminToken', response.token);
                sessionStorage.setItem('isAdmin', 'true');
                navigate('/'); // 메인 페이지로 이동
            }
        } catch (err) {
            setError(err.message || '로그인 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginContainer>
            <h2>관리자 로그인</h2>
            <LoginForm onSubmit={handleSubmit}>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="관리자 비밀번호 입력"
                    required
                    disabled={loading}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? '로그인 중...' : '로그인'}
                </Button>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </LoginForm>
        </LoginContainer>
    );
}

export default AdminLogin;