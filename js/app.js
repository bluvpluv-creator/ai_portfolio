/**
 * 포트폴리오 메인 어플리케이션 엔트리 포인트 (js/app.js)
 * 모듈화된 UI 컴포넌트(Navbar, Profile, ProjectsController, ModalComponent, AdminModal, Toast, Button)를 초기화하고 바인딩합니다.
 * 모든 주석은 한글로 작성되었습니다.
 */
import { Navbar } from './components/Navbar.js';
import { renderProfile } from './components/profile.js';
import { ProjectsController } from './components/projectCard.js';
import { ModalComponent } from './components/ModalComponent.js';
import { AdminModal } from './components/AdminModal.js';
import { Toast } from './components/Toast.js';
import { Button } from './components/Button.js';

class PortfolioApp {
    constructor() {
        this.initDOM();
        this.initModules();
    }

    /**
     * 주요 DOM 엘리먼트 참조 초기화
     */
    initDOM() {
        this.navContainer = document.getElementById('navbarContainer');
        this.profileContainer = document.getElementById('profileSection');
        this.pillsContainer = document.getElementById('categoryPills');
        this.projectsGridContainer = document.getElementById('projectsGrid');
        this.modalOverlay = document.getElementById('projectModalOverlay');
        this.contactActionsContainer = document.getElementById('contactActionsContainer');
        this.toastEl = document.getElementById('toastNotification');
        this.toastMessageEl = document.getElementById('toastMessage');
    }

    /**
     * 모듈화된 UI 컴포넌트 초기화 및 PRD 레이아웃 동적 조립
     */
    initModules() {
        // 1. 네비게이션 바 컴포넌트(Navbar.js) 렌더링
        if (this.navContainer) {
            const navbarNode = new Navbar({
                brandName: 'Minseo Kim',
                badgeText: 'Language & AI',
                links: [
                    { label: '자기소개', href: '#profileSection' },
                    { label: '작업물', href: '#projects' },
                    { label: '연락처', href: '#contact' },
                    { label: '🎨 컴포넌트 연구소', href: 'demo.html' }
                ]
            }).render();

            this.navContainer.appendChild(navbarNode);
        }

        // 2. 관리자 모달(AdminModal.js) 초기화 및 데이터 갱신 콜백 연결
        if (this.modalOverlay) {
            this.modal = new ModalComponent(this.modalOverlay);
            this.adminModal = new AdminModal(this.modalOverlay, () => {
                // 관리자 페이지에서 데이터 수정 시 프로필 및 프로젝트 그리드 실시간 갱신
                renderProfile(this.profileContainer);
                if (this.projects) this.projects.init();
            });
        }

        // 3. 프로필 히어로 섹션 (profile.js + Card.js + Badge.js) 렌더링
        if (this.profileContainer) {
            renderProfile(this.profileContainer);
        }

        // 4. 토스트 알림 컴포넌트 (Toast.js) 초기화
        if (this.toastEl && this.toastMessageEl) {
            this.toast = new Toast(this.toastEl, this.toastMessageEl);
        }

        // 5. 프로젝트 카드 그리드 및 카테고리 컨트롤러 (projectCard.js + Card.js + Button.js) 초기화
        if (this.pillsContainer && this.projectsGridContainer) {
            this.projects = new ProjectsController(
                this.pillsContainer,
                this.projectsGridContainer,
                (project) => this.modal.open(project)
            );
        }

        // 6. 연락처 섹션 재사용 버튼(Button.js) 컴포넌트 및 Admin 진입 버튼 조립
        this.renderContactButtons();
    }

    /**
     * 연락처 섹션의 버튼(Button) 컴포넌트 및 관리자 진입 버튼 조합 렌더링
     */
    renderContactButtons() {
        if (!this.contactActionsContainer) return;

        this.contactActionsContainer.innerHTML = '';

        // 이메일 복사 버튼
        const copyEmailBtn = new Button({
            text: '이메일 복사하기',
            variant: 'ghost-dark',
            size: 'lg',
            icon: '✉️',
            onClick: () => {
                const email = 'minseo.kim.ai@hufs.ac.kr';
                navigator.clipboard.writeText(email).then(() => {
                    if (this.toast) {
                        this.toast.show('✨ 이메일 주소가 클립보드에 복사되었습니다!');
                    }
                }).catch(() => {
                    if (this.toast) {
                        this.toast.show('이메일 주소: minseo.kim.ai@hufs.ac.kr');
                    }
                });
            }
        }).render();

        // GitHub 방문 버튼
        const githubBtn = new Button({
            text: 'GitHub 방문',
            variant: 'ghost-dark',
            size: 'lg',
            icon: '💻',
            href: 'https://github.com'
        }).render();

        // 관리자 모드 진입 버튼 (Ctrl + Shift + A 단축키 또는 버튼 클릭)
        const adminBtn = new Button({
            text: '🔐 관리자 로그인',
            variant: 'ghost-dark',
            size: 'lg',
            onClick: () => {
                if (this.adminModal) this.adminModal.open();
            }
        }).render();

        this.contactActionsContainer.appendChild(copyEmailBtn);
        this.contactActionsContainer.appendChild(githubBtn);
        this.contactActionsContainer.appendChild(adminBtn);
    }
}

// DOM 준비 완료 시 어플리케이션 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});
