/**
 * 관리자 대시보드 모달 조립 컴포넌트 (js/components/AdminModal.js)
 * AdminPinEntry, AdminBioForm, AdminProjectForm, AdminResetPanel 모듈을 수집 및 조립합니다.
 * 모든 주석은 한글로 작성되었습니다.
 */
import { AdminPinEntry } from './admin/AdminPinEntry.js';
import { AdminBioForm } from './admin/AdminBioForm.js';
import { AdminProjectForm } from './admin/AdminProjectForm.js';
import { AdminResetPanel } from './admin/AdminResetPanel.js';
import { Badge } from './Badge.js';

export class AdminModal {
    /**
     * @param {HTMLElement} overlayEl - 모달 오버레이 엘리먼트
     * @param {Function} onDataUpdated - 데이터 저장/초기화 시 갱신 콜백
     */
    constructor(overlayEl, onDataUpdated) {
        this.overlay = overlayEl;
        this.onDataUpdated = onDataUpdated;
        this.isAuthenticated = false;

        this.bindEvents();
    }

    /**
     * 모달 바깥 배경 닫기 및 키보드 단축키(Ctrl + Shift + A) 바인딩
     */
    bindEvents() {
        const closeBtn = this.overlay.querySelector('.modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        // 비밀 단축키 Ctrl + Shift + A
        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
                e.preventDefault();
                this.open();
            }
        });
    }

    /**
     * 관리자 모달 오픈
     */
    open() {
        this.render();
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * 관리자 모달 닫기
     */
    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    /**
     * 인증 여부에 따른 렌더링 분기
     */
    render() {
        const contentEl = this.overlay.querySelector('#modalContent');
        if (!contentEl) return;

        contentEl.innerHTML = '';

        if (!this.isAuthenticated) {
            // 1. PIN 인증 컴포넌트(AdminPinEntry) 조립
            const pinNode = new AdminPinEntry(() => {
                this.isAuthenticated = true;
                this.render();
            }).render();

            contentEl.appendChild(pinNode);
        } else {
            // 2. 관리자 대시보드 메인 폼 조립
            this.renderDashboard(contentEl);
        }
    }

    /**
     * 관리자 탭 대시보드 조립
     */
    renderDashboard(container) {
        const wrapper = document.createElement('div');
        wrapper.className = 'modal-body';
        wrapper.style.padding = '28px';

        // 학부 로그인 뱃지 생성
        const statusBadgeHtml = new Badge({
            text: '로그인됨 (PIN: 1234)',
            variant: 'emerald',
            icon: '🟢'
        }).render().outerHTML;

        wrapper.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 class="modal-title" style="margin: 0;">🛠️ 관리자 설정 대시보드</h2>
                ${statusBadgeHtml}
            </div>

            <!-- 탭 전환 메인 필터 -->
            <div class="admin-tab-nav">
                <button class="filter-pill active" id="tabBioBtn">👤 자기소개 수정</button>
                <button class="filter-pill" id="tabAddProjectBtn">➕ 새 작업물 추가</button>
                <button class="filter-pill" id="tabResetBtn" style="color: red;">🔄 데이터 초기화</button>
            </div>

            <!-- 탭 콘텐츠 슬롯 -->
            <div id="tabSlot"></div>
        `;

        const tabSlot = wrapper.querySelector('#tabSlot');
        const tabBioBtn = wrapper.querySelector('#tabBioBtn');
        const tabAddProjectBtn = wrapper.querySelector('#tabAddProjectBtn');
        const tabResetBtn = wrapper.querySelector('#tabResetBtn');

        // 서브 컴포넌트 객체 생성
        const bioFormNode = new AdminBioForm(() => {
            alert('✨ 자기소개 정보가 성공적으로 저장되었습니다!');
            if (this.onDataUpdated) this.onDataUpdated('bio');
        }).render();

        const projectFormNode = new AdminProjectForm(() => {
            alert('🚀 새로운 작업물이 정상 추가되었습니다!');
            if (this.onDataUpdated) this.onDataUpdated('projects');
            this.close();
        }).render();

        const resetPanelNode = new AdminResetPanel(() => {
            alert('🔄 데이터가 기초 상태로 복원되었습니다.');
            if (this.onDataUpdated) this.onDataUpdated('reset');
            this.close();
        }).render();

        // 초기 기본 탭: 자기소개 수정
        tabSlot.appendChild(bioFormNode);

        // 탭 전환 이벤트 바인딩
        const switchTab = (btn, node) => {
            [tabBioBtn, tabAddProjectBtn, tabResetBtn].forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabSlot.innerHTML = '';
            tabSlot.appendChild(node);
        };

        tabBioBtn.addEventListener('click', () => switchTab(tabBioBtn, bioFormNode));
        tabAddProjectBtn.addEventListener('click', () => switchTab(tabAddProjectBtn, projectFormNode));
        tabResetBtn.addEventListener('click', () => switchTab(tabResetBtn, resetPanelNode));

        container.appendChild(wrapper);
    }
}
