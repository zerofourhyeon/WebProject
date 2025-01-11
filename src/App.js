import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet,
} from "react-router-dom";
import BookDetail from "./components/BookDetail";
import Favorites from "./components/Favorites";
import DBBookSearch from "./components/DBBookSearch";
import AddBook from "./components/AddBook";
import AdminLogin from "./components/AdminLogin";
import SearchPage from "./components/SearchPage";
import HomePage from "./components/HomePage";
import styled from "styled-components";
import MajorBooksPage from './components/MajorBooksPage';
import homeIcon from './images/home.svg';
import starIcon from './images/star.svg';

const AppContainer = styled.div`
    max-width: 1280px;
    margin: 30px auto;
    font-family: 'Arial', sans-serif;
    border-radius: 8px;
    background-color: #ffffff;
`;

const NavBar = styled.nav`
    display: flex;
    justify-content: space-between; /* 좌우 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
    padding: 15px 0;
    margin-bottom: 30px;
    border-bottom: 2px solid #dee2e6;

    & > div {
        display: flex;
        align-items: center; /* 요소들을 수직 중앙 정렬 */
        gap: 10px; /* 요소 사이 간격 조정 */
    }

    .nav-center {
        font-weight: 700;
        font-size: 22px;
        color: #343a40;
        
    }

    a {
        text-decoration: none;
        color: #495057;
        font-weight: 600;
        padding: 8px 16px;
        transition: background-color 0.2s ease-in-out;
        display: flex;
        align-items: center; /* 기본 수직 중앙 정렬 */
        gap: 5px; /* 텍스트와 아이콘 간 간격 */

        &:hover {
            background-color: #EFECEA;
            border-radius: 30px;
        }
    }

    img {
        width: 25px;
        height: 25px;
        
    }

    @media (max-width: 600px) {
        flex-direction: column;

        & > div {
            width: 100%;
            justify-content: center;
        }
    }
`;

function Layout() {
    return (
        <>
            <NavBar>
                <div>
                    <Link to="/">
                        <img src={homeIcon} alt="Home" />
                        메인화면
                    </Link>
                </div>
                <div className="nav-center">Book Link</div>
                <div>
                    <Link to="/favorites">
                        즐겨찾기
                        <img src={starIcon} alt="Favorites" />
                    </Link>
                </div>
            </NavBar>
            <Outlet />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContainer>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="search" element={<SearchPage />} />
                        <Route path="book/:isbn" element={<BookDetail />} />
                        <Route path="favorites" element={<Favorites />} />
                        <Route path="db-search" element={<DBBookSearch />} />
                        <Route path="admin-login" element={<AdminLogin />} />
                        <Route path="add-book" element={<AddBook />} />
                        <Route path="major-books" element={<MajorBooksPage />} />
                    </Route>
                </Routes>
            </AppContainer>
        </BrowserRouter>
    );
}

export default App;