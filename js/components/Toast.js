/**
 * 재사용 가능한 Toast 알림 컴포넌트 클래스
 * 메시지를 화면 하단에 팝업 형태로 표시하고 자동 숨김
 */
export class Toast {
    /**
     * @param {HTMLElement} toastEl - 토스트 컨테이너 엘리먼트
     * @param {HTMLElement} messageEl - 토스트 메시지 텍스트 엘리먼트
     */
    constructor(toastEl, messageEl) {
        this.toastEl = toastEl;
        this.messageEl = messageEl;
        this.timeoutId = null;
    }

    /**
     * 알림 메시지 출력
     * @param {string} message - 표시할 텍스트 문구
     * @param {number} [duration=2500] - 지속 시간(ms)
     */
    show(message, duration = 2500) {
        if (!this.toastEl || !this.messageEl) return;

        this.messageEl.textContent = message;
        this.toastEl.classList.remove('hidden');

        // 이전 타이머 취소 후 새 타이머 실행
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => {
            this.toastEl.classList.add('hidden');
        }, duration);
    }
}
