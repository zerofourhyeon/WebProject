// src/components/Favorites.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const FavoriteContainer = styled.div`
    padding: 20px;
`;

const FavoriteList = styled.div`
    display: grid; // flex 대신 grid 사용
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); // 반응형 열 개수
    gap: 20px;
    margin-top: 20px;
`;

const FavoriteItem = styled.div`
    border: 1px solid #d8bfd8;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(147, 112, 219, 0.2);
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: auto;
`;

const Title = styled.h3`
    margin-top: 0;
    color: #663399;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
    font-size: 1.05em; // 폰트 크기 조정
    overflow: hidden; // 긴 제목 처리
    text-overflow: ellipsis; // 긴 제목 생략 부호
    white-space: nowrap; // 줄바꿈 방지
`;

const Author = styled.p`
  color: #333;
  font-size: 0.85em; // 폰트 크기 조정
  text-align: center;
  margin-bottom: 10px;
`;

const DeleteButton = styled.button`
    padding: 8px 16px;
    background-color: #9370db;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    align-self: center;

    &:hover {
        background-color: #7d49b1;
    }
`;

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    const fetchFavorites = async () => {
        try {
            const response = await fetch("/api/favorites");
            if (!response.ok) {
                throw new Error("Failed to fetch favorites");
            }
            const data = await response.json();
            setFavorites(data);
        } catch (error) {
            console.error("Error fetching favorites:", error);
            alert("즐겨찾기 목록을 불러오는데 실패했습니다.");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/favorites/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete favorite");
            }

            fetchFavorites();
            alert("즐겨찾기가 삭제되었습니다.");
        } catch (error) {
            console.error("Error deleting favorite:", error);
            alert("즐겨찾기 삭제에 실패했습니다.");
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <FavoriteContainer>
            <h2>즐겨찾기 목록</h2>
            <FavoriteList>
                {favorites.length === 0 ? (
                    <p>즐겨찾기한 도서가 없습니다.</p>
                ) : (
                    favorites.map((favorite) => (
                        <FavoriteItem key={favorite._id}>
                            <div>
                                <Title>{favorite.title}</Title>
                                <Author>저자: {favorite.author}</Author>
                            </div>
                            <DeleteButton onClick={() => handleDelete(favorite._id)}>
                                삭제
                            </DeleteButton>
                        </FavoriteItem>
                    ))
                )}
            </FavoriteList>
        </FavoriteContainer>
    );
};

export default Favorites;