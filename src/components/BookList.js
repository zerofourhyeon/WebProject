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

const handleAddToFavorites = async (book) => {
    // 즐겨찾기 추가 로직 (BookItem.js에서 제거된 부분)
    try {
        const response = await fetch("/api/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bookId: book.isbn,
                title: book.title,
                author: book.authors.join(", "),
                price: book.price, // 가격 정보 추가
                thumbnail: book.thumbnail, // 썸네일 정보 추가
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to add to favorites");
        }

        alert("즐겨찾기에 추가되었습니다!");
    } catch (error) {
        console.error("Error adding to favorites:", error);
        alert("즐겨찾기 추가에 실패했습니다.");
    }
};

const BookList = ({ books, isEnd, loadMore, handleBookClick}) => { // onAddToFavorites prop 받기
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
                            handleAddToFavorites={handleAddToFavorites} // onAddToFavorites prop 전달
                        />
                    </div>
                ))}
            </BookGrid>

            {!isEnd && <LoadMoreButton onClick={loadMore}>더 보기</LoadMoreButton>}
        </BookListContainer>
    );
};

export default BookList;