/**
 * 재사용 가능한 Modal 팝업 컴포넌트 클래스
 * design.md 가이드 기반: Backdrop blur, Scale-up 팝업 및 ESC 키 이벤트 처리
 */
import { Button } from './Button.js';
import { Badge } from './Badge.js';

export class ModalComponent {
    /**
     * @param {HTMLElement} overlayEl - 오버레이 엘리먼트
     */
    constructor(overlayEl) {
        this.overlay = overlayEl;
        this.container = this.overlay.querySelector('.modal-container');
        this.bindEvents();
    }

    /**
     * 오버레이 및 ESC 키 닫기 이벤트 핸들러 바인딩
     */
    bindEvents() {
        const closeBtn = this.overlay.querySelector('.modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // 바깥 배경 클릭 시 모달 닫기
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // ESC 키 입력 시 모달 닫기
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                this.close();
            }
        });
    }

    /**
     * 프로젝트 상세 정보 렌더링 및 모달 열기
     * @param {Object} project - 프로젝트 데이터 객체
     */
    open(project) {
        const contentEl = this.overlay.querySelector('#modalContent');
        if (!contentEl) return;

        // 태그 칩 HTML 생성
        const tagsHtml = (project.tags || [])
            .map(t => Badge.createTagHtml(t))
            .join('');

        // 주요 기능 목록 HTML 생성
        const featuresHtml = (project.features || [])
            .map(f => `<li>${f}</li>`)
            .join('');

        contentEl.innerHTML = `
            <img src="${project.thumbnail}" alt="${project.title}" class="modal-hero-img" />
            <div class="modal-body">
                <span class="badge badge-blue" style="margin-bottom: 8px;">${project.categoryLabel}</span>
                <h2 class="modal-title">${project.title}</h2>
                <p style="color: var(--text-secondary); font-size: 1rem;">${project.summary}</p>

                <div class="modal-vibe-box">
                    <div class="modal-vibe-title">⚡ 바이브코딩 & AI 융합 개발 비하인드</div>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                        ${project.vibeStory}
                    </p>
                </div>

                <h3 class="modal-section-h3">✨ 주요 기능 및 특징</h3>
                <ul class="modal-features-list">
                    ${featuresHtml}
                </ul>

                <h3 class="modal-section-h3">🛠️ 사용 기술 스택</h3>
                <div class="project-tags">${tagsHtml}</div>

                <div class="modal-actions" id="modalActions"></div>
            </div>
        `;

        // 모달 내 액션 버튼(Button) 컴포넌트 조합
        const actionsContainer = contentEl.querySelector('#modalActions');
        
        const demoBtn = new Button({
            text: '🚀 라이브 서비스 접속하기',
            variant: 'primary',
            size: 'lg',
            href: project.demoUrl
        }).render();

        const githubBtn = new Button({
            text: '💻 GitHub 저장소',
            variant: 'secondary',
            size: 'lg',
            href: project.githubUrl
        }).render();

        actionsContainer.appendChild(demoBtn);
        actionsContainer.appendChild(githubBtn);

        // 모달 활성화 처리 및 배경 스크롤 방지
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * 모달 닫기
     */
    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}
