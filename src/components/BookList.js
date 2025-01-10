// src/components/BookList.js
import React from "react";
import styled from "styled-components";
import BookItem from "./BookItem";

const BookListContainer = styled.div`
    padding: 20px;
`;

const BookGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
`;

const LoadMoreButton = styled.button`
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #858bd6;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        background-color: #6c70c6;
    }
`;

const BookList = ({ books, isEnd, loadMore, handleBookClick, onAddToFavorites }) => { // onAddToFavorites prop 받기
    return (
        <BookListContainer>
            <BookGrid>
                {books.map((book) => (
                    <div
                        onClick={() => handleBookClick(book.isbn)}
                        key={book.isbn}
                        style={{ cursor: "pointer" }}
                    >
                        <BookItem
                            key={book.isbn}
                            book={book}
                            onAddToFavorites={onAddToFavorites} // onAddToFavorites prop 전달
                        />
                    </div>
                ))}
            </BookGrid>

            {!isEnd && <LoadMoreButton onClick={loadMore}>더 보기</LoadMoreButton>}
        </BookListContainer>
    );
};

export default BookList;