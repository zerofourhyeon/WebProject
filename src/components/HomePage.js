import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import mainImage from '../images/mainsectionimage.png';

// SectionTitle을 전역 선언해주었습니다.
const SectionTitle = styled.h2`
    font-size: 17px;
    margin-bottom: 10px;
    cursor: pointer;

    &:hover {
        color: #9da2d8;
        text-decoration: underline;
    }
`;

// 이미지를 올바르게 import 합니다.
const book1 = require("../images/book-1.png");
const book2 = require("../images/book-2.png");
const book3 = require("../images/book-3.png");
const book4 = require("../images/book-4.png");
const book5 = require("../images/book-5.png");

const book6 = require("../images/cook.png");
const book7 = require("../images/pro.png");
const book8 = require("../images/sinagong.png");
const book9 = require("../images/unity.png");

const MainSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;
    border: 1px solid #d3d3d3;
    padding: 20px;
    background-color: #9da2d8;
    height: auto;
    border-radius: 30px;

    .image {
        flex: 0 0 30%; /* 왼쪽 영역을 30% 차지 */
        display: flex;
        justify-content: center; /* 이미지 중앙 정렬 */

        img {
            max-width: 100%; /* 부모 영역에 맞게 이미지 크기 조정 */
            border-radius: 30px; /* 둥근 모서리 */
        }
    }

    .text {
        flex: 0 0 70%; /* 오른쪽 영역을 70% 차지 */
        display: flex;
        flex-direction: column; /* 텍스트와 검색 영역 세로 정렬 */
        justify-content: center;
        padding-left: 10px; /* 왼쪽과의 간격 */

        .main-text {
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            padding-left: 30px;
        }
    }
`;

const Section = styled.div`
    border: 1px solid #d3d3d3;
    z-index: 2;
    position: relative;
    padding: 20px;
    background-color: rgba(239, 236, 234, 1);
    border-radius: 30px;

    .books {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
        gap: 20px;
        padding: 10px;
        flex-wrap: wrap; /* 이미지가 넘칠 경우 줄 바꿈 */
    }

    .book {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1 0 200px; /* 최소 200px 크기로 자동으로 크기 조정 */
        max-width: 200px; /* 책 크기 최대 설정 */
        min-width: 150px; /* 책 크기 최소 설정 */
    }

    .book-image {
        width: 100%;
        aspect-ratio: 3/4;
        overflow: hidden;
        margin-bottom: 10px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
        }
    }

    .book-title {
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        width: 100%;
    }
`;

const Section1 = styled.div`
    margin-bottom: 30px;
    border: 1px solid #d3d3d3;
    z-index: 1;
    position: relative;
    padding: 20px;
    background-color: #efecea;
    border-radius: 30px;

    .books {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
        gap: 20px;
        padding: 10px;
        flex-wrap: wrap; /* 이미지가 넘칠 경우 줄 바꿈 */
    }

    .book {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1 0 200px; /* 최소 200px 크기로 자동으로 크기 조정 */
        max-width: 200px; /* 책 크기 최대 설정 */
        min-width: 150px; /* 책 크기 최소 설정 */
    }

    .book-image {
        width: 100%;
        aspect-ratio: 3/4;
        overflow: hidden;
        margin-bottom: 10px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
        }
    }

    .book-title {
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        width: 100%;
    }
`;

const AdminLoginLink = styled(Link)`
    display: flex;
    justify-content: flex-end;
    text-decoration: none;
    color: #007bff;

    :hover {
        text-decoration: underline;
    }
`;

function HomePage() {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const imagePaths = [book1, book2, book3, book4, book5];
    const nonMajorBooks = [book6, book7, book8, book9];

    // 로그인 상태 체크
    useEffect(() => {
        const isAdminUser = sessionStorage.getItem("isAdmin") === "true";
        setIsAdmin(isAdminUser); // 토큰 존재 여부로 isAdmin 상태 업데이트
    }, []);

    const handleSearchSubmit = (query) => {
        if (query.trim()) {
            navigate(`/search?query=${query}`);
        }
    };

    const handleMajorClick = () => {
        navigate("/major-books");
    };

    return (
        <div>
            {/* 관리자 로그인 / 도서 추가 링크 */}
            {isAdmin ? (
                <AdminLoginLink to="/add-book">도서 추가</AdminLoginLink>
            ) : (
                <AdminLoginLink to="/admin-login">관리자 로그인</AdminLoginLink>
            )}

            <MainSection>
                <div className="image">
                    <img src={mainImage} alt="main image" />
                </div>
                <div className="text">
                    <div className="main-text">
                        "컴퓨터 공학" 을 전공하는 당신을 위한 도서 추천
                    </div>
                    <SearchBar onSubmit={handleSearchSubmit} /> {/* onSubmit prop으로 handleSearch 함수 전달 */}
                </div>
            </MainSection>

            <Section1>
                <SectionTitle>전공외 서적</SectionTitle>
                <div className="books">
                    {nonMajorBooks.map((path, index) => (
                        <div className="book" key={index}>
                            <div className="book-image">
                                <img src={path} alt={`Non-Major Book ${index + 1}`} />
                            </div>
                            <div className="book-title">
                                {index === 0 && '달고 알싸한 요리책'}
                                {index === 1 && '프리미어 프로'}
                                {index === 2 && '정보처리기사 기본서'}
                                {index === 3 && '유니티 게임 프로그래밍'}
                            </div>
                        </div>
                    ))}
                </div>
            </Section1>

            {/* "전공 서적" 섹션 */}
            <Section>
                <SectionTitle onClick={handleMajorClick}>전공 서적</SectionTitle>
                <div className="books">
                    {imagePaths.map((path, index) => (
                        <div className="book" key={index}>
                            <div className="book-image">
                                <img src={path} alt={`Book ${index + 1}`} />
                            </div>
                            <div className="book-title">
                                {index === 0 && '명품 자바 프로그래밍'}
                                {index === 1 && '기초 통계학'}
                                {index === 2 && 'JSP 웹 프레임과 스프링 프레임워크'}
                                {index === 3 && '운영체재'}
                                {index === 4 && 'C언어 일취월장'}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
}

export default HomePage;
