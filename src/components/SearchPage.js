// src/components/SearchPage.js
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import BookList from "./BookList";
import { searchBooks } from "../api";

const SearchPageContainer = styled.div`
    padding: 20px;
    font-family: "Arial", sans-serif;
`;

// 검색 결과 정보 영역 스타일
const SearchResultInfo = styled.div`
    margin: 10px 0;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 4px;
    color: #495057;
    text-align: center;
`;

const SearchPage = () => {
    const [books, setBooks] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchText, setSearchText] = useState(
        searchParams.get("query") || ""
    );
    const [page, setPage] = useState(1);
    const [isEnd, setIsEnd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const query = searchParams.get("query");
        console.log("useEffect - query:", query);
        if (query) {
            setSearchText(query);
            fetchBooks(query, 1); // SearchPage에서 fetchBooks 호출
        }
    }, [searchParams]);

    const fetchBooks = async (query, newPage = 1) => {
        if (!query) return;

        try {
            setLoading(true);
            setError(null);
            const data = await searchBooks(query, newPage); // searchBooks 함수 사용

            if (newPage === 1) {
                setBooks(data.documents);
            } else {
                setBooks((prevBooks) => [...prevBooks, ...data.documents]);
            }

            setIsEnd(data.meta.is_end);
            setPage(newPage);
        } catch (error) {
            console.error("도서 검색 중 오류가 발생했습니다.", error);
            setError("도서 검색 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const addToFavorites = async (book) => {
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
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(
                    data.message || `"${book.title}"가 즐겨찾기에 추가되었습니다!`
                );
            } else {
                throw new Error(data.error || "즐겨찾기 추가에 실패했습니다.");
            }
        } catch (error) {
            console.error("즐겨찾기 추가 중 오류가 발생했습니다.", error);
            alert(error.message || "즐겨찾기 추가 중 오류가 발생했습니다.");
        }
    };

    const handleSearch = (query) => {
        setSearchParams({ query });
    };

    const loadMore = () => {
        if (!isEnd && !loading) {
            const nextPage = page + 1;
            fetchBooks(searchText, nextPage);
        }
    };

    const handleBookClick = (isbn) => {
        navigate(`/book/${isbn}`);
    };

    return (
        <SearchPageContainer>
            <SearchBar onSearch={handleSearch} query={searchText} />

            {searchText && (
                <SearchResultInfo style={{ color: "black" }}>
                    <span style={{ color: "black" }}>'{searchText}'</span> 에 대한 검색
                    결과입니다.
                </SearchResultInfo>
            )}

            {error && (
                <div style={{ color: "red", textAlign: "center" }}>{error}</div>
            )}

            {/* BookList 컴포넌트에 onAddToFavorites prop으로 addToFavorites 함수 전달 */}
            <BookList
                onAddToFavorites={addToFavorites} // onAddToFavorites prop 전달 확인
                books={books}
                isEnd={isEnd}
                loadMore={loadMore}
                handleBookClick={handleBookClick}
            />

            {loading && <div style={{ textAlign: "center" }}>로딩 중...</div>}
        </SearchPageContainer>
    );
};

export default SearchPage;