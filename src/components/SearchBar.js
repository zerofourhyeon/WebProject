import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const reactDescriptions = ["프론트엔드","백엔드","알고리즘","파이썬","아우내 많관부~!!"];

function genRandomInt(max) {
    return Math.floor(Math.random() * (max + 1)); // 부동 소수점 난수 반환
}
const description = reactDescriptions[genRandomInt(2)];

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #e0e0e0;
    border-radius: 25px;
    padding: 5px 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
    margin-top: 20px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
`;

const SearchIcon = styled.div`
    margin-right: 10px;
    color: #9e9e9e;
`;

const SearchInput = styled.input`
    flex: 1;
    border: none;
    padding: 8px;
    font-size: 16px;
    border-radius: 25px;
    outline: none;
    background-color: transparent;

    &::placeholder {
        color: #bdbdbd;
    }
`;

const SearchButton = styled.button`
    padding: 8px 16px;
    background-color: ${props => props.isFilled ? '#9999ff' : '#bdbdbd'}; // 조건부 스타일 적용
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: ${props => props.isFilled ? '#6666ff' : '#9e9e9e'}; // 조건부 스타일 적용
    }
`;

const SearchBar = ({ onSearch, onSubmit, query }) => {
    const [inputValue, setInputValue] = useState(query || "");

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        // onSearch prop이 존재하는 경우에만 onSearch 호출 (SearchPage에서만 호출됨)
        // HomePage에서는 텍스트 입력 시 onSearch를 호출하지 않도록 수정
        if (onSearch) {
            onSearch(newValue);
        }
    };

    const handleSearch = () => {
        // onSubmit prop이 존재하는 경우 (HomePage에서 사용) onSubmit 호출
        if (onSubmit) {
            onSubmit(inputValue);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            // onSubmit prop이 존재하는 경우 (HomePage에서 사용) onSubmit 호출
            if (onSubmit) {
                onSubmit(inputValue);
            }
        }
    };

    return (
        <SearchContainer>
            <SearchIcon>
                <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
            <SearchInput
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={`"${description}"를 검색해보세요!`}
            />
            <SearchButton onClick={handleSearch} isFilled={inputValue !== ''}>
                검색
            </SearchButton>
        </SearchContainer>
    );
};

export default SearchBar;