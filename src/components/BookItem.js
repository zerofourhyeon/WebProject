// src/components/BookItem.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BookItemContainer = styled.div`
    border: 1px solid #d8bfd8; /* 연한 보라색 테두리 */
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(147, 112, 219, 0.2); /* 보라색 계열 그림자 */
    background-color: #ffffff; /* 아주 연한 보라색 배경 */
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(147, 112, 219, 0.3); /* 호버 시 더 진한 그림자 */
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

const BookTitle = styled.h3`
    margin-top: 0;
    color: #663399; /* 보라색 텍스트 */
    font-weight: bold;
`;

const BookAuthor = styled.p`
    color: #333; /* 조금 더 밝은 보라색 텍스트 */
    font-size: 0.9em;
`;

const BookPrice = styled.p`
    font-weight: bold;
    color: #000000; /* 보라색 텍스트 */
`;

const BookThumbnail = styled.img`
    max-width: 120px;
    max-height: 180px;
    margin-bottom: 15px;
    box-shadow: 0 4px 8px rgba(147, 112, 219, 0.3); /* 보라색 계열 그림자 */
    border-radius: 4px;
`;

const FavoriteButton = styled.button`
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #9370db; /* 밝은 보라색 버튼 */
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #7d49b1; /* 호버 시 더 진한 보라색 */
  }
`;

// BookItem.js의 즐겨찾기 추가 기능 수정
const BookItem = ({ book, handleAddToFavorites }) => {
    return (
        <BookItemContainer>
            <Link to={`/book/${book.isbn}`}>
                <BookThumbnail src={book.thumbnail} alt={book.title} />
                <BookTitle>{book.title}</BookTitle>
                <BookAuthor>저자: {book.authors.join(", ")}</BookAuthor>
                <BookPrice>
                    가격:{" "}
                    {typeof book.price === "number"
                        ? book.price.toLocaleString() + "원"
                        : "가격 정보 없음"}
                </BookPrice>
            </Link>
            {/* BookList에서는 즐겨찾기 추가 버튼 렌더링 */}
            {handleAddToFavorites && (
                <FavoriteButton
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToFavorites(book); // props로 받은 함수 호출
                    }}
                >
                    즐겨찾기 추가
                </FavoriteButton>
            )}
        </BookItemContainer>
    );
};

export default BookItem;