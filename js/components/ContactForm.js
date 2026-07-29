/**
 * EmailJS 기반 이메일 문의 연락폼 컴포넌트 (js/components/ContactForm.js)
 * 허니팟(Honeypot) 트랩, 동적 보안 퀴즈, 60초 쿨다운 레이트 리미팅 등 다층 스팸 방지 기능 포함
 * 모든 주석은 한글로 작성되었습니다.
 */
import { Button } from './Button.js';

export class ContactForm {
    /**
     * @param {Object} options
     * @param {Function} options.onSuccess - 이메일 전송 성공 시 콜백
     * @param {Function} options.onError - 전송 실패 시 에러 콜백
     */
    constructor(options = {}) {
        this.onSuccess = options.onSuccess;
        this.onError = options.onError;

        // Vercel 환경변수 감지 및 기본값 폴백
        this.serviceID = (typeof process !== 'undefined' && process.env?.EMAILJS_SERVICE_ID)
            || (typeof window !== 'undefined' && window._env_?.EMAILJS_SERVICE_ID)
            || 'service_7hhx1wk';

        this.templateID = (typeof process !== 'undefined' && process.env?.EMAILJS_TEMPLATE_ID)
            || (typeof window !== 'undefined' && window._env_?.EMAILJS_TEMPLATE_ID)
            || 'template_xr85xnc';

        this.publicKey = (typeof process !== 'undefined' && process.env?.EMAILJS_PUBLIC_KEY)
            || (typeof window !== 'undefined' && window._env_?.EMAILJS_PUBLIC_KEY)
            || 'PCeQnME1tnVXRl65u';

        this.isSending = false;

        // 스팸 방지용 동적 덧셈 퀴즈 숫무 생성
        this.num1 = Math.floor(Math.random() * 8) + 1;
        this.num2 = Math.floor(Math.random() * 8) + 1;
        this.correctAnswer = this.num1 + this.num2;

        this.initEmailJS();
    }

    /**
     * EmailJS SDK 초기화
     */
    initEmailJS() {
        if (window.emailjs) {
            try {
                window.emailjs.init(this.publicKey);
            } catch (e) {
                console.warn('EmailJS 초기화 경고:', e);
            }
        }
    }

    /**
     * 연락폼 DOM 엘리먼트 렌더링
     * @returns {HTMLElement}
     */
    render() {
        const container = document.createElement('div');
        container.className = 'contact-form-container';

        container.innerHTML = `
            <div class="contact-form-title">
                <span>✉️</span>
                <span>이메일 문의 보내기</span>
            </div>
            <p class="contact-form-desc">
                프로젝트 제안이나 협업 문의사항을 남겨주시면 <code>bluvpluv@gmail.com</code>으로 실시간 전달됩니다.
            </p>

            <form id="portfolioContactForm" onsubmit="return false;">
                <!-- 1. 허니팟(Honeypot) 스팸 트랩 필드: 사람에게는 보이지 않지만 봇이 자동으로 작성 시 이메일 전송을 차단함 -->
                <div class="honeypot-trap-field">
                    <label for="website_trap_url">웹사이트 주소 (자동입력금지)</label>
                    <input type="text" id="website_trap_url" name="website_trap_url" tabindex="-1" autocomplete="off" />
                </div>

                <div class="contact-form-group">
                    <label class="contact-form-label" for="senderName">보내는 사람 이름 *</label>
                    <input type="text" id="senderName" class="contact-form-input" placeholder="예: 김민서 / 채용 담당자" required />
                </div>

                <div class="contact-form-group">
                    <label class="contact-form-label" for="senderEmail">본인 이메일 주소 *</label>
                    <input type="email" id="senderEmail" class="contact-form-input" placeholder="example@domain.com" required />
                </div>

                <div class="contact-form-group">
                    <label class="contact-form-label" for="senderMessage">문의 내용 메시지 *</label>
                    <textarea id="senderMessage" class="contact-form-textarea" rows="4" placeholder="프로젝트 내용 및 문의하실 내용을 상세히 적어주세요." required></textarea>
                </div>

                <!-- 2. 동적 보안 퀴즈 필드: 간단한 덧셈을 통한 사람/봇 구별 -->
                <div class="spam-quiz-box">
                    <span class="spam-quiz-question">🛡️ 스팸 방지 퀴즈: ${this.num1} + ${this.num2} = ?</span>
                    <input type="number" id="spamQuizInput" class="spam-quiz-input" placeholder="정답" required />
                </div>

                <div class="contact-form-actions">
                    <div id="contactSubmitBtnBox"></div>
                </div>
            </form>
        `;

        // 이메일 전송 버튼 조립
        const btnBox = container.querySelector('#contactSubmitBtnBox');
        this.submitBtn = new Button({
            text: '✉️ 이메일 보내기',
            variant: 'accent',
            size: 'lg',
            onClick: () => this.sendEmail(container)
        }).render();

        btnBox.appendChild(this.submitBtn);

        return container;
    }

    /**
     * EmailJS를 통한 실시간 이메일 전송 수행 (스팸 방지 검증 포함)
     */
    async sendEmail(container) {
        if (this.isSending) return;

        // 1. 허니팟(Honeypot) 스팸 트랩 검증: 봇이 비밀 필드를 채웠을 경우 무소식 차단
        const trapInput = container.querySelector('#website_trap_url');
        if (trapInput && trapInput.value.trim() !== '') {
            console.warn('스팸 봇에 의해 자동 탐지 및 차단되었습니다.');
            alert('스팸 시도로 감지되었습니다.');
            return;
        }

        // 2. 60초 쿨다운(Rate Limiter) 검증: 무분별한 연속 전송 방지
        const lastSent = localStorage.getItem('contact_last_sent_time');
        const now = Date.now();
        if (lastSent && (now - parseInt(lastSent, 10)) < 60000) {
            const remainSec = Math.ceil((60000 - (now - parseInt(lastSent, 10))) / 1000);
            alert(`🔒 도배 방지를 위해 약 ${remainSec}초 후에 다시 시도해 주세요.`);
            return;
        }

        const nameInput = container.querySelector('#senderName');
        const emailInput = container.querySelector('#senderEmail');
        const messageInput = container.querySelector('#senderMessage');
        const quizInput = container.querySelector('#spamQuizInput');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        const quizAnswer = quizInput.value.trim();

        // 3. 필드 유효성 검사
        if (!name || !email || !message) {
            alert('이름, 이메일 주소, 메시지 내용을 모두 작성해 주세요.');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            alert('올바른 이메일 주소 형식을 입력해 주세요.');
            return;
        }

        // 4. 보안 퀴즈 정답 검증
        if (parseInt(quizAnswer, 10) !== this.correctAnswer) {
            alert(`🛡️ 스팸 방지 퀴즈 정답이 틀렸습니다. (${this.num1} + ${this.num2} = ${this.correctAnswer})`);
            quizInput.focus();
            return;
        }

        this.isSending = true;
        this.updateBtnText('⏳ 이메일 발송 중...');

        const templateParams = {
            name: name,
            email: email,
            message: message,
            to_name: "민서",
            to_email: "bluvpluv@gmail.com"
        };

        try {
            let response;
            if (window.emailjs) {
                response = await window.emailjs.send(this.serviceID, this.templateID, templateParams, this.publicKey);
            } else {
                const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        service_id: this.serviceID,
                        template_id: this.templateID,
                        user_id: this.publicKey,
                        template_params: templateParams
                    })
                });
                if (!res.ok) throw new Error(await res.text());
                response = { status: 200 };
            }

            if (response.status === 200 || response.text === 'OK') {
                // 연속 전송 방지 쿨다운 시간 저장
                localStorage.setItem('contact_last_sent_time', Date.now().toString());

                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';
                quizInput.value = '';

                // 새로운 퀴즈 문제 갱신
                this.num1 = Math.floor(Math.random() * 8) + 1;
                this.num2 = Math.floor(Math.random() * 8) + 1;
                this.correctAnswer = this.num1 + this.num2;
                const quizLabel = container.querySelector('.spam-quiz-question');
                if (quizLabel) quizLabel.textContent = `🛡️ 스팸 방지 퀴즈: ${this.num1} + ${this.num2} = ?`;

                if (this.onSuccess) {
                    this.onSuccess('✨ 이메일이 성공적으로 전송되었습니다!');
                } else {
                    alert('✨ 성공적으로 이메일이 발송되었습니다!');
                }
            } else {
                throw new Error('전송 상태 오류');
            }
        } catch (error) {
            console.error('EmailJS 이메일 전송 실패:', error);
            if (this.onError) {
                this.onError('이메일 전송에 실패했습니다. 이메일 주소를 확인해 주세요.');
            } else {
                alert('이메일 발송 중 오류가 발생했습니다: ' + (error.text || error.message || error));
            }
        } finally {
            this.isSending = false;
            this.updateBtnText('✉️ 이메일 보내기');
        }
    }

    /**
     * 버튼 텍스트 동적 업데이트
     */
    updateBtnText(text) {
        if (this.submitBtn) {
            const span = this.submitBtn.querySelector('span:last-child');
            if (span) span.textContent = text;
        }
    }
}
