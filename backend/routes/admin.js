const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// 환경 변수에서 관리자 비밀번호와 JWT 시크릿 키 가져오기
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

router.post('/login', (req, res) => {
    const { password } = req.body;

    if (password === ADMIN_PASSWORD) {
        // JWT 토큰 생성
        const token = jwt.sign({ isAdmin: true }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ 
            success: true, 
            token,
            message: '로그인 성공' 
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: '비밀번호가 올바르지 않습니다.' 
        });
    }
});

module.exports = router;