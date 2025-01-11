// src/components/BookDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { searchBooks } from '../api';
import styled from 'styled-components';

const BookDetailContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; // 수평 중앙 정렬
    gap: 50px; // 이미지와 텍스트 사이 간격 조정
    padding: 30px; // 내부 여백 조정
    font-family: 'Arial', sans-serif;
    color: #333;
    background-color: #ffffff;
    max-width: 900px;
    margin: 30px auto;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const BookCover = styled.img`
    width: 250px;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // 이미지 그림자 효과

    @media (max-width: 768px) {
        width: 50%;
    }
`;

const BookInfo = styled.div`
    width: 50%; // 텍스트 영역 너비 조정
    display: flex;
    flex-direction: column;
    justify-content: center; // 텍스트 수직 중앙 정렬
`;

const Title = styled.h2`
    margin-top: 0;
    font-size: 1.7em;
    border-bottom: 3px solid #cb9dd8; // 제목 하단 보라색 밑줄
    padding-bottom: 10px; // 제목과 내용 사이 여백
    color: #673ab7; // 제목 보라색
`;

const InfoItem = styled.p`
    margin: 5px 0;
    font-size: 1em;
`;

const PriceInfo = styled.div`
    margin-top: 15px;
`;

const OriginalPrice = styled.span`
    text-decoration: line-through;
    color: #999;
    margin-right: 10px;
    font-size: 1.1em; // 정가 텍스트 크기 조정
`;

const SalePrice = styled.span`
    font-weight: bold;
    font-size: 1.3em;
    color: #d9534f;
`;

const DiscountRate = styled.span`
    color: #d9534f;
    margin-left: 10px;
    font-size: 1.1em; // 할인율 텍스트 크기 조정
`;

const UrlButton = styled.a`
    display: inline-block;
    background-color: #b29dd8; // 버튼 보라색 (진한 보라색)
    // background-color: #9575cd; // 버튼 보라색 (연한 보라색)
    color: white;
    padding: 10px 20px; // 버튼 크기 조정
    border-radius: 5px;
    text-decoration: none;
    font-size: 1.1em; // 버튼 텍스트 크기 조정
    transition: background-color 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // 버튼 그림자 효과

    &:hover {
        background-color: #5e35b1; // 버튼 호버 효과 (진한 보라색)
        // background-color: #7e57c2; // 버튼 호버 효과 (연한 보라색)
    }
`;

const ButtonContainer = styled.div`
    text-align: left;
    margin-top: 20px; // 버튼 위쪽 여백 조정
`;

const BookDetail = () => {
    let { isbn } = useParams();
    const [book, setBook] = useState(null);

    if (isbn.includes(' ')) {
        isbn = isbn.split(' ')[1];
    }

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                const data = await searchBooks(isbn);
                if (data.documents.length > 0) {
                    setBook(data.documents[0]);
                }
            } catch (error) {
                console.error('도서 상세 정보를 가져오는데 실패했습니다.', error);
            }
        };

        fetchBookDetail();
    }, [isbn]);

    if (!book) {
        return <div>도서 정보를 불러오는 중...</div>;
    }

    return (
        <BookDetailContainer>
            <BookCover src={book.thumbnail} alt={book.title} />
            <BookInfo>
                <Title>{book.title}</Title>
                <InfoItem>저자: {book.authors.join(', ')}</InfoItem>
                <InfoItem>출판사: {book.publisher}</InfoItem>
                <InfoItem>출판일: {new Date(book.datetime).toLocaleDateString()}</InfoItem>
                <InfoItem>
                    번역자: {book.translators.length > 0 ? book.translators.join(', ') : '없음'}
                </InfoItem>
                <PriceInfo>
                    <OriginalPrice>{book.price}원</OriginalPrice>
                    <SalePrice>{book.sale_price}원</SalePrice>
                    <DiscountRate>
                        ({Math.round((1 - book.sale_price / book.price) * 100)}%)
                    </DiscountRate>
                </PriceInfo>
                <ButtonContainer>
                    <UrlButton href={book.url} target="_blank" rel="noopener noreferrer">
                        바로가기
                    </UrlButton>
                </ButtonContainer>
            </BookInfo>
        </BookDetailContainer>
    );
};

export default BookDetail;