/**
 * 관리자 4자리 PIN 인증 컴포넌트 (js/components/admin/AdminPinEntry.js)
 * 보안 PIN 번호(기본값: 1234) 검증 및 키보드 엔터 지원
 * 모든 주석은 한글로 작성되었습니다.
 */
import { Button } from '../Button.js';

export class AdminPinEntry {
    /**
     * @param {Function} onSuccess - PIN 검증 성공 시 콜백 함수
     * @param {string} [correctPin='1234'] - 정답 PIN 번호
     */
    constructor(onSuccess, correctPin = '1234') {
        this.onSuccess = onSuccess;
        this.correctPin = correctPin;
    }

    /**
     * PIN 인증 폼 DOM 엘리먼트 반환
     * @returns {HTMLElement}
     */
    render() {
        const wrapper = document.createElement('div');
        wrapper.className = 'admin-pin-wrapper';

        wrapper.innerHTML = `
            <span class="admin-pin-icon">🔐</span>
            <h2 class="modal-title" style="margin-bottom: 8px;">관리자 PIN 인증</h2>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 24px;">
                보안 PIN 4자리를 입력하세요. (기본 암호: <strong>1234</strong>)
            </p>
            <div style="margin-bottom: 16px;">
                <input type="password" id="adminPinInput" class="admin-pin-input" maxlength="4" placeholder="••••" />
                <div id="pinErrorMsg" class="admin-error-text" style="display: none;">
                    PIN 번호가 일치하지 않습니다. 다시 시도해 주세요.
                </div>
            </div>
            <div id="pinBtnContainer"></div>
        `;

        const pinInput = wrapper.querySelector('#adminPinInput');
        const errorMsg = wrapper.querySelector('#pinErrorMsg');
        const btnContainer = wrapper.querySelector('#pinBtnContainer');

        // 로그인 버튼 컴포넌트(Button) 조립
        const submitBtn = new Button({
            text: '관리자 로그인',
            variant: 'primary',
            size: 'md',
            onClick: () => this.validate(pinInput.value, errorMsg)
        }).render();

        btnContainer.appendChild(submitBtn);

        // 엔터 키 이벤트 등록
        pinInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.validate(pinInput.value, errorMsg);
            }
        });

        // 렌더링 후 자동 포커스
        setTimeout(() => pinInput.focus(), 100);

        return wrapper;
    }

    /**
     * PIN 입력값 검증
     */
    validate(val, errorEl) {
        if (val === this.correctPin) {
            errorEl.style.display = 'none';
            if (this.onSuccess) this.onSuccess();
        } else {
            errorEl.style.display = 'block';
        }
    }
}
