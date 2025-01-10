import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminLogout from './AdminLogout';

const AddBookContainer = styled.div`
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoutContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px;
`;

const HomeLink = styled(Link)`
    display: block;
    width: fit-content;
    margin: 10px auto;
    text-decoration: none;
    color: #007bff;

    &:hover {
        text-decoration: underline;
    }
`;

const Title = styled.h2`
    margin-bottom: 20px;
    color: #333;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
`;

const Textarea = styled.textarea`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    resize: vertical;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #5cb85c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        background-color: #4cae4c;
    }
`;

const ErrorMessage = styled.div`
    color: #d9534f;
    margin-bottom: 15px;
`;

function AddBook() {
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        publisher: "",
        price: "",
        description: "",
    });
    const [error, setError] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const isAdminUser = sessionStorage.getItem("isAdmin") === "true";
        setIsAdmin(isAdminUser);

        // isAdmin이 true일 경우 아무런 행동을 취할 필요가 없습니다.
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value,
        });
    };

    const handleLogout = () => {
        sessionStorage.removeItem("isAdmin");
        navigate("/"); // 로그아웃 후 HomePage로 이동
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/db/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookData),
            });

            if (!response.ok) {
                throw new Error("도서 추가에 실패했습니다.");
            }

            const result = await response.json();
            if (result.success) {
                console.log("도서 추가 성공:", result.data);
                alert("도서가 성공적으로 추가되었습니다.");
                setBookData({
                    title: "",
                    author: "",
                    publisher: "",
                    price: "",
                    description: "",
                });
                setError("");
            } else {
                console.error("도서 추가 실패:", result.error);
                setError(result.error);
            }
        } catch (error) {
            console.error("도서 추가 중 오류:", error);
            setError(error.message);
        }
    };

    // isAdmin 상태를 세션 스토리지에서 가져오도록 수정
    useEffect(() => {
        const isAdminUser = sessionStorage.getItem("isAdmin") === "true";
        setIsAdmin(isAdminUser);
    }, []);

    if (!isAdmin) {
        return <div>관리자만 접근할 수 있는 페이지입니다.</div>;
    }

    return (
        <AddBookContainer>
            <LogoutContainer>
                <AdminLogout onLogout={handleLogout} /> {/* onLogout prop으로 handleLogout 함수 전달 */}
            </LogoutContainer>
            <HomeLink to="/">홈으로 가기</HomeLink>
            <Title>도서 추가</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="title"
                    value={bookData.title}
                    onChange={handleChange}
                    placeholder="제목"
                    required
                />
                <Input
                    type="text"
                    name="author"
                    value={bookData.author}
                    onChange={handleChange}
                    placeholder="저자"
                    required
                />
                <Input
                    type="text"
                    name="publisher"
                    value={bookData.publisher}
                    onChange={handleChange}
                    placeholder="출판사"
                    required
                />
                <Input
                    type="number"
                    name="price"
                    value={bookData.price}
                    onChange={handleChange}
                    placeholder="가격"
                    required
                />
                <Textarea
                    name="description"
                    value={bookData.description}
                    onChange={handleChange}
                    placeholder="상세 설명"
                    rows="5"
                />
                <Button type="submit">도서 추가</Button>
            </Form>
        </AddBookContainer>
    );
}

export default AddBook;