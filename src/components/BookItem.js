// src/components/BookItem.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BookItemContainer = styled.div`
    border: 1px solid #ccc;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-5px);
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

const BookTitle = styled.h3`
    margin-top: 0;
`;

const BookAuthor = styled.p`
    color: #555;
`;

const BookPrice = styled.p`
    font-weight: bold;
`;

const BookThumbnail = styled.img`
    max-width: 100px;
    max-height: 150px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// BookItem.js의 즐겨찾기 추가 기능 수정
const BookItem = ({ book }) => {
    const handleAddToFavorites = async () => {
        try {
            const response = await fetch('/api/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookId: book.isbn,
                    title: book.title,
                    author: book.authors.join(", ")
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add to favorites');
            }

            alert('즐겨찾기에 추가되었습니다!');
        } catch (error) {
            console.error('Error adding to favorites:', error);
            alert('즐겨찾기 추가에 실패했습니다.');
        }
    };

    return (
        <BookItemContainer>
            <Link to={`/book/${book.isbn}`}>
                <BookThumbnail src={book.thumbnail} alt={book.title} />
                <BookTitle>{book.title}</BookTitle>
                <BookAuthor>저자: {book.authors.join(", ")}</BookAuthor>
                <BookPrice>가격: {book.price.toLocaleString()}원</BookPrice>
            </Link>
            <button
                style={{ marginTop: "10px" }}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToFavorites();
                }}
            >
                즐겨찾기 추가
            </button>
        </BookItemContainer>
    );
};

export default BookItem;