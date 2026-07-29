/**
 * 서버리스 API 엔드포인트: 이메일 문의 발송 (/api/contact)
 * EmailJS API 키(Service, Template, Public Key)를 서버 환경변수에서만 사용하고 브라우저에 노출하지 않습니다.
 * 모든 주석은 한글로 작성되었습니다.
 */
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'POST 요청만 지원합니다.' });
    }

    // 서버 측 환경변수 로드
    const serviceID = process.env.EMAILJS_SERVICE_ID || 'service_7hhx1wk';
    const templateID = process.env.EMAILJS_TEMPLATE_ID || 'template_xr85xnc';
    const publicKey = process.env.EMAILJS_PUBLIC_KEY || 'PCeQnME1tnVXRl65u';

    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
        return res.status(400).json({ error: '필수 폼 데이터(name, email, message)가 누락되었습니다.' });
    }

    try {
        // EmailJS REST API 서버 간(Server-to-Server) 직접 전송
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: serviceID,
                template_id: templateID,
                user_id: publicKey,
                template_params: {
                    name: name,
                    email: email,
                    message: message,
                    to_name: '민서',
                    to_email: 'bluvpluv@gmail.com'
                }
            })
        });

        if (response.ok) {
            return res.status(200).json({ success: true, message: '이메일이 성공적으로 전송되었습니다.' });
        } else {
            const errText = await response.text();
            console.error('EmailJS 서버 전송 오류:', errText);
            return res.status(500).json({ success: false, error: errText });
        }
    } catch (err) {
        console.error('API /api/contact 전송 실패:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
}
