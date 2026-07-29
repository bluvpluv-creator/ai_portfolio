/**
 * EmailJS 기반 이메일 문의 연락폼 컴포넌트 (js/components/ContactForm.js)
 * 답장받을 이메일 주소를 bluvpluv@gmail.com으로 고정하여 실시간 이메일을 전송합니다.
 * 모든 주석은 한글로 작성되었습니다.
 */
import { Button } from './Button.js';

export class ContactForm {
    /**
     * @param {Object} options
     * @param {Function} options.onSuccess - 이메일 전송 성공 시 토스트 및 알림 콜백
     * @param {Function} options.onError - 전송 실패 시 에러 콜백
     */
    constructor(options = {}) {
        this.onSuccess = options.onSuccess;
        this.onError = options.onError;

        // 사용자가 제공한 EmailJS 환경 설정 값 및 고정 이메일
        this.serviceID = 'service_7hhx1wk';
        this.templateID = 'template_xr85xnc';
        this.publicKey = 'PCeQnME1tnVXRl65u';
        this.fixedRecipientEmail = 'bluvpluv@gmail.com';

        this.isSending = false;
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
                console.warn('EmailJS 이미 초기화되었거나 경고:', e);
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
                프로젝트 제안이나 협업 문의사항을 남겨주시면 <code>${this.fixedRecipientEmail}</code>으로 실시간 전달됩니다.
            </p>

            <form id="portfolioContactForm" onsubmit="return false;">
                <div class="contact-form-group">
                    <label class="contact-form-label" for="senderName">보내는 사람 이름 *</label>
                    <input type="text" id="senderName" class="contact-form-input" placeholder="예: 김민서 / 채용 담당자" required />
                </div>

                <div class="contact-form-group">
                    <label class="contact-form-label" for="senderEmail">답장받을 이메일 주소 (고정) *</label>
                    <input type="email" id="senderEmail" class="contact-form-input" value="${this.fixedRecipientEmail}" readonly style="background-color: var(--bg-muted, #f8fafc); cursor: not-allowed;" />
                </div>

                <div class="contact-form-group">
                    <label class="contact-form-label" for="senderMessage">문의 내용 메시지 *</label>
                    <textarea id="senderMessage" class="contact-form-textarea" rows="4" placeholder="프로젝트 내용 및 문의하실 내용을 상세히 적어주세요." required></textarea>
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
     * EmailJS를 통한 실시간 이메일 전송 수행
     */
    async sendEmail(container) {
        if (this.isSending) return;

        const nameInput = container.querySelector('#senderName');
        const messageInput = container.querySelector('#senderMessage');

        const name = nameInput.value.trim();
        const message = messageInput.value.trim();
        const email = this.fixedRecipientEmail; // 고정 이메일 사용

        // 입력 폼 유효성 검사
        if (!name || !message) {
            alert('보내는 사람 이름과 문의 내용 메시지를 작성해 주세요.');
            return;
        }

        this.isSending = true;
        this.updateBtnText('⏳ 이메일 발송 중...');

        // 사용자 요청 전송 구조에 맞춘 템플릿 매개변수 설정
        const templateParams = {
            name: name,
            email: email, // 고정 이메일 bluvpluv@gmail.com
            message: message,
            to_name: "민서",
            to_email: email
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
                nameInput.value = '';
                messageInput.value = '';

                if (this.onSuccess) {
                    this.onSuccess('✨ 이메일이 성공적으로 bluvpluv@gmail.com으로 전송되었습니다!');
                } else {
                    alert('✨ 성공적으로 이메일이 발송되었습니다!');
                }
            } else {
                throw new Error('전송 상태 오류');
            }
        } catch (error) {
            console.error('EmailJS 이메일 전송 실패:', error);
            if (this.onError) {
                this.onError('이메일 전송에 실패했습니다. 다시 시도해 주세요.');
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
