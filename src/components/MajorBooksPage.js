import React, { useState, useEffect } from 'react';
import { searchDBBooks, getAllDBBooks } from '../api';
import styled from 'styled-components';

import bookImage2 from '../images/alice.jpg';
import bookImage3 from '../images/math-1.jpg';
import bookImage4 from '../images/soft-1.jpg';
import bookImage5 from '../images/soft-2.jpg';
import bookImage6 from '../images/reflect-1.jpg';
import bookImage7 from '../images/reflect-3.jpg';
import bookImage8 from '../images/reflect-4.jpg';
import bookImage9 from '../images/zeonza.jpg';
import bookImage10 from '../images/comp-1.jpg';
import bookImage11 from '../images/comp-2.jpg';
import bookImage12 from '../images/comp-3.jpg';

import bookImage13 from '../images/C-1.jpg';
import bookImage14 from '../images/C-2.jpg';
import bookImage15 from '../images/write-1.jpg';
import bookImage16 from '../images/cross.jpg';
import bookImage17 from '../images/Q-1.jpg';
import bookImage18 from '../images/Q-2.jpg';
import bookImage19 from '../images/python.jpg';
import bookImage20 from '../images/programing.jpg';


import bookImage21 from '../images/digital.jpg';
import bookImage22 from '../images/math-2.jpg';
import bookImage23 from '../images/zaryo-1.jpg';
import bookImage24 from '../images/zaryo-2.jpg';
import bookImage25 from '../images/zava2-1.jpg';
import bookImage26 from '../images/zava2-2.jpg';
import bookImage27 from '../images/zava2-3.jpg';
import bookImage28 from '../images/connect-1.jpg';
import bookImage29 from '../images/connect-2.jpg';


import bookImage30 from '../images/gaek.jpg';
import bookImage31 from '../images/mobile.jpg';
import bookImage32 from '../images/line.jpg';
import bookImage33 from '../images/imbeded.jpg';
import bookImage34 from '../images/protect.jpg';
import bookImage35 from '../images/tong-1.jpg';
import bookImage36 from '../images/tong-2.jpg';



import bookImage37 from '../images/unix.jpg';
import bookImage38 from '../images/algorithm.jpg';
import bookImage39 from '../images/web.jpg';
import bookImage40 from '../images/AI.jpg';
import bookImage41 from '../images/cpu-1.jpg';
import bookImage42 from '../images/cpu-2.jpg';
import bookImage43 from '../images/react.jpg';



import bookImage44 from '../images/web-2.jpg';
import bookImage45 from '../images/machine.jpg';
import bookImage46 from '../images/data.jpg';
import bookImage47 from '../images/os.jpg';
import bookImage48 from '../images/compiler.jpg';
import bookImage49 from '../images/key.jpg';


import bookImage50 from '../images/key-2.jpg';
import bookImage51 from '../images/data-2.jpg';
import bookImage52 from '../images/open.jpg';


const SearchContainer = styled.div`
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
`;

const SearchForm = styled.form`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const SearchButton = styled.button`
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const BookList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 30px;    // 세로 간격 추가
    column-gap: 20px; // 가로 간격 유지
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const BookCard = styled.div`
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 4px;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const BookTitle = styled.h3`
    margin: 0 0 10px 0;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const BookInfo = styled.p`
    margin: 5px 0;
    color: #666;
`;

const BookPrice = styled(BookInfo)`
    font-weight: bold;
    color: #007bff;
    margin-top: auto;
`;

const LoadingMessage = styled.div`
    text-align: center;
    padding: 20px;
    color: #666;
`;

const ErrorMessage = styled.div`
    color: #dc3545;
    padding: 10px;
    border-radius: 4px;
    background-color: #f8d7da;
    margin-bottom: 20px;
`;

const ResultSection = styled.div`
    margin-top: 20px;
`;

const SectionTitle = styled.h3`
    margin: 20px 0;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 4px;
    font-weight: bold;
`;

const NoResults = styled.div`
    text-align: center;
    padding: 20px;
    color: #666;
    background-color: #f8f9fa;
    border-radius: 4px;
    margin: 10px 0;
    grid-column: 1 / -1;
`;

function MajorBookPage() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        fetchAllBooks();
    }, []);

    const fetchAllBooks = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllDBBooks();
            setBooks(data);
            setIsSearching(false);
        } catch (err) {
            setError('도서 목록을 불러오는 중 오류가 발생했습니다.');
            console.error('도서 목록 조회 오류:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!query.trim()) {
            await fetchAllBooks();
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setIsSearching(true);
            const data = await searchDBBooks(query);
            setBooks(data);
        } catch (err) {
            setError('검색 중 오류가 발생했습니다.');
            console.error('검색 오류:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SearchContainer>
            <h2>전공 도서 검색</h2>
            <SearchForm onSubmit={handleSearch}>
                <SearchInput
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="도서 제목 또는 저자 검색"
                />
                <SearchButton type="submit">검색</SearchButton>
            </SearchForm>

            {loading && <LoadingMessage>로딩 중...</LoadingMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <ResultSection>
                <SectionTitle>
                    {isSearching
                        ? `'${query}' 검색 결과 (${books.length}건)`
                        : `전체 도서 목록 (${books.length}건)`
                    }
                </SectionTitle>
                <BookList>
                    {books.length === 0 ? (
                        <NoResults>도서가 없습니다.</NoResults>
                    ) : (
                        books.map((book) => (
                            <BookCard key={book._id}>
                                <BookTitle>{book.title}</BookTitle>
                                <BookInfo>저자: {book.author}</BookInfo>
                                <BookInfo>출판사: {book.publisher}</BookInfo>
                                <BookPrice>가격: {book.price}원</BookPrice>
                                {book.description && (
                                    <BookInfo>설명: {book.description}</BookInfo>
                                )}



                                {book.title === "엘리스를 이용한 프로그래밍의 학습" && (
                                    <img src={bookImage2} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "공학수학" && (
                                    <img src={bookImage3} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "컴퓨터과학개론" && (
                                    <img src={bookImage4} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "IT 세상을 만나는 컴퓨터 개론" && (
                                    <img src={bookImage5} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "Reflect : Reading & Writing 1" && (
                                    <img src={bookImage6} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "Reflect : Reading & Writing 3" && (
                                    <img src={bookImage7} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "Reflect : Reading & Writing 4 " && (
                                    <img src={bookImage8} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "전기전자통신공학 개론" && (
                                    <img src={bookImage9} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "두근두근 파이썬" && (
                                    <img src={bookImage10} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "새내기 파이썬" && (
                                    <img src={bookImage11} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "으뜸 파이썬" && (
                                    <img src={bookImage12} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}


                                {book.title === " C언어 일취월장" && (
                                    <img src={bookImage13} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "쉽게 풀어 쓴  C언어 EXPRESS " && (
                                    <img src={bookImage14} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "창의 융합 글쓰기" && (
                                    <img src={bookImage15} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "기독교와 현대 사회" && (
                                    <img src={bookImage16} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === " Q Skills for Success 3E: Reading & Speaking 2" && (
                                    <img src={bookImage17} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "Q Skills for Success Listening & Speaking 3" && (
                                    <img src={bookImage18} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "파이썬으로 배우는 게임 개발 입문편" && (
                                    <img src={bookImage19} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === " C언어 for Begginer" && (
                                    <img src={bookImage20} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}




                                {book.title === "디지털 논리 회로 이론 및 실험" && (
                                    <img src={bookImage21} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "4차 산업혁명 시대의 이산수학" && (
                                    <img src={bookImage22} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "C로 배우는 쉬운 자료구조" && (
                                    <img src={bookImage23} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === " C로 쓴 자료구조론" && (
                                    <img src={bookImage24} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === " 난생처음 자바프로그래밍" && (
                                    <img src={bookImage25} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "명품 자바 프로그래밍" && (
                                    <img src={bookImage26} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "자바 프로그래밍" && (
                                    <img src={bookImage27} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "4차 산업혁명 시대의 정보통신 개론" && (
                                    <img src={bookImage28} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "AI 리터러시 시대의 정보통신 개론" && (
                                    <img src={bookImage29} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}






                                {book.title === "명품 C++프로그래밍" && (
                                    <img src={bookImage30} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "안드로이드 프로그래밍" && (
                                    <img src={bookImage31} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "응용이 보이는 선형대수학 : 파이썬과 함께하는 선형대수학 이론과 응용" && (
                                    <img src={bookImage32} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "익스플로링 아두이노" && (
                                    <img src={bookImage33} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "정보보안개론" && (
                                    <img src={bookImage34} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "빅데이터 시대, 올바른 인사이트를 위한 통계 101x데이터 분석" && (
                                    <img src={bookImage35} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "제대로 시작하는 기초 통계학" && (
                                    <img src={bookImage36} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}



                                {book.title === "리눅스 프로그래밍 원리와 실제" && (
                                    <img src={bookImage37} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "파이썬 자료구조와 알고리즘 for Beginner " && (
                                    <img src={bookImage38} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === " JSP 웹프로그래밍과 스프링프레임워" && (
                                    <img src={bookImage39} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "밑바닥부터 시작하는 딥러닝" && (
                                    <img src={bookImage40} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "최신 컴퓨터 구조" && (
                                    <img src={bookImage41} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "컴퓨터 구조와 원리 3.0" && (
                                    <img src={bookImage42} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "처음 배우는 리엑트 네이티브" && (
                                    <img src={bookImage43} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}





                                {book.title === "코딩 자율학습 스프링 부터 3 자바 백엔드 개발 입문" && (
                                    <img src={bookImage44} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px'
                                    }}
                                    />
                                )}

                                {book.title === "밑바닥부터 시작하는 딥러닝 2" && (
                                    <img
                                        src={bookImage45}
                                        alt={book.title}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '8px',
                                            marginTop: '10px'
                                        }}
                                    />
                                )}

                                {book.title === "데이터베이스 시스템" && (
                                    <img
                                        src={bookImage46}
                                        alt={book.title}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '8px',
                                            marginTop: '10px'
                                        }}
                                    />
                                )}

                                {book.title === "쉽게 배우는 운영체재" && (
                                    <img
                                        src={bookImage47}
                                        alt={book.title}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '8px',
                                            marginTop: '10px'
                                        }}
                                    />
                                )}

                                {book.title === "컴파일러의 이해" && (
                                    <img
                                        src={bookImage48}
                                        alt={book.title}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '8px',
                                            marginTop: '10px'
                                        }}
                                    />
                                )}

                                {book.title === "Cryptography and Network Security" && (
                                    <img
                                        src={bookImage49}
                                        alt={book.title}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '8px',
                                            marginTop: '10px'
                                        }}
                                    />
                                )}



                                {book.title === "정보보안 이론과 실제" && (
                                    <img src={bookImage50} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "데이터 과학 기반의 파이썬 빅데이터 분석" && (
                                    <img src={bookImage51} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}

                                {book.title === "오픈 소스 소프트웨어로 실습하는 소프트웨어 공학" && (
                                    <img src={bookImage52} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} />
                                )}








                            </BookCard>
                        ))
                    )}
                </BookList>
            </ResultSection>
        </SearchContainer>
    );
}

export default MajorBookPage;