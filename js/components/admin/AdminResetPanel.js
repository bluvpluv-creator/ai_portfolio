/**
 * 관리자 데이터 초기화 패널 컴포넌트 (js/components/admin/AdminResetPanel.js)
 * LocalStorage 수정한 데이터를 지우고 기초 JSON 데이터 상태로 롤백
 * 모든 주석은 한글로 작성되었습니다.
 */
import { Button } from '../Button.js';

export class AdminResetPanel {
    /**
     * @param {Function} onReset - 초기화 성공 시 콜백 함수
     */
    constructor(onReset) {
        this.onReset = onReset;
    }

    /**
     * 초기화 패널 DOM 엘리먼트 반환
     * @returns {HTMLElement}
     */
    render() {
        const wrapper = document.createElement('div');
        wrapper.className = 'admin-reset-panel-wrapper';
        wrapper.style.textAlign = 'center';
        wrapper.style.padding = '24px 12px';

        wrapper.innerHTML = `
            <span style="font-size: 2.5rem; display: block; margin-bottom: 12px;">⚠️</span>
            <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px;">기초 데이터 원상복구</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 24px;">
                LocalStorage에 수정한 자기소개 및 추가 작업물 데이터를 지우고 원본 JSON 데이터 상태로 되돌립니다.
            </p>
            <div id="resetBtnBox" style="display: flex; justify-content: center;"></div>
        `;

        const btnBox = wrapper.querySelector('#resetBtnBox');
        const resetBtn = new Button({
            text: '🔄 기초 JSON 데이터로 복원',
            variant: 'secondary',
            size: 'md',
            onClick: () => this.handleReset()
        }).render();

        btnBox.appendChild(resetBtn);

        return wrapper;
    }

    /**
     * 초기화 실행
     */
    handleReset() {
        if (confirm('모든 로컬스토리지 데이터(수정한 자기소개, 추가 작업물)를 삭제하고 기초 데이터로 복구하시겠습니까?')) {
            localStorage.removeItem('portfolio_bio');
            localStorage.removeItem('portfolio_projects');
            if (this.onReset) this.onReset();
        }
    }
}
