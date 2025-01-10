// Favorites.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FavoriteContainer = styled.div`
    padding: 20px;
`;

const FavoriteItem = styled.div`
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DeleteButton = styled.button`
    background-color: #ff4444;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #cc0000;
    }
`;

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    const fetchFavorites = async () => {
        try {
            const response = await fetch('/api/favorites');
            if (!response.ok) {
                throw new Error('Failed to fetch favorites');
            }
            const data = await response.json();
            setFavorites(data);
        } catch (error) {
            console.error('Error fetching favorites:', error);
            alert('즐겨찾기 목록을 불러오는데 실패했습니다.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/favorites/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete favorite');
            }

            // 삭제 후 목록 새로고침
            fetchFavorites();
            alert('즐겨찾기가 삭제되었습니다.');
        } catch (error) {
            console.error('Error deleting favorite:', error);
            alert('즐겨찾기 삭제에 실패했습니다.');
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <FavoriteContainer>
            <h2>즐겨찾기 목록</h2>
            {favorites.length === 0 ? (
                <p>즐겨찾기한 도서가 없습니다.</p>
            ) : (
                favorites.map((favorite) => (
                    <FavoriteItem key={favorite._id}>
                        <div>
                            <h3>{favorite.title}</h3>
                            <p>저자: {favorite.author}</p>
                        </div>
                        <DeleteButton onClick={() => handleDelete(favorite._id)}>
                            삭제
                        </DeleteButton>
                    </FavoriteItem>
                ))
            )}
        </FavoriteContainer>
    );
};

export default Favorites;