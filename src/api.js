import axios from 'axios';

const API_KEY = 'a4ef82796297c739eb25c800be53a4e3'; // 카카오 REST API 키
const API_BASE_URL = 'https://dapi.kakao.com/v3/search/book';

export const searchBooks = async (
    query,
    page = 1,
    size = 10,
    target = 'title', // 기본값 유지, 사용자 선택 가능하도록
    sort = 'accuracy', // 정확도순 정렬 기본값
) => {
    try {
        const response = await axios.get(API_BASE_URL, {
            headers: {
                Authorization: `KakaoAK ${API_KEY}`,
            },
            params: {
                query,
                page,
                size,
                target,
                sort,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

// DB 도서 검색 (카카오 API와 별도)
export const searchDBBooks = async (query) => {
    try {
        const response = await axios.get(`/api/db/books/search`, {
            params: { query }
        });
        return response.data;
    } catch (error) {
        console.error('DB 도서 검색 중 오류:', error);
        throw error;
    }
};

// 전체 DB 도서 목록 조회
export const getAllDBBooks = async () => {
    try {
        const response = await axios.get('/api/db/books');
        return response.data;
    } catch (error) {
        console.error('전체 도서 목록 조회 오류:', error);
        throw error;
    }
};

export const adminLogin = async (password) => {
    try {
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || '로그인 실패');
        }
        
        return data;
    } catch (error) {
        console.error('관리자 로그인 오류:', error);
        throw error;
    }
};