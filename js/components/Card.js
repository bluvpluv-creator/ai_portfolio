/**
 * 재사용 가능한 Card 컴포넌트 모듈
 * design.md 가이드 기반: 프로필 히어로 카드 및 프로젝트 카드 그리드 렌더러
 */
import { Button } from './Button.js';
import { Badge } from './Badge.js';

export class Card {
    /**
     * 프로젝트 갤러리 카드 DOM 엘리먼트 생성
     * @param {Object} projectData - 프로젝트 정보 객체
     * @param {Function} onOpenModal - 모달 오픈 이벤트 콜백
     * @returns {HTMLElement} 카드 엘리먼트
     */
    static createProjectCard(projectData, onOpenModal) {
        const cardEl = document.createElement('div');
        cardEl.className = 'card card-hoverable project-card animate-fade-in';
        cardEl.dataset.id = projectData.id;

        // 태그 칩 리스트 HTML 조합
        const tagsHtml = (projectData.tags || [])
            .map(tag => Badge.createTagHtml(tag))
            .join('');

        cardEl.innerHTML = `
            <div class="project-thumb-wrapper">
                <img src="${projectData.thumbnail}" alt="${projectData.title}" class="project-thumb-img" />
                <span class="badge badge-dark-glass project-category-badge">${projectData.categoryLabel}</span>
            </div>
            <div class="project-card-content">
                <div>
                    <h3 class="project-title">${projectData.title}</h3>
                    <p class="project-summary">${projectData.summary}</p>
                    <div class="project-tags">${tagsHtml}</div>
                </div>
                <div class="project-card-footer" id="cardFooter_${projectData.id}"></div>
            </div>
        `;

        // 액션 버튼 컴포넌트(Button) 동적 조립
        const footerContainer = cardEl.querySelector(`#cardFooter_${projectData.id}`);

        // 1. 상세 설명 모달 오픈 버튼
        const detailBtn = new Button({
            text: '🔍 상세 설명 보기',
            variant: 'secondary',
            size: 'md',
            onClick: () => {
                if (onOpenModal) onOpenModal(projectData);
            }
        }).render();

        // 2. 라이브 데모 이동 버튼
        const demoBtn = new Button({
            text: '🚀 데모 접속',
            variant: 'primary',
            size: 'md',
            href: projectData.demoUrl
        }).render();

        footerContainer.appendChild(detailBtn);
        footerContainer.appendChild(demoBtn);

        // 카드 전체 클릭 시 모달 열기
        cardEl.addEventListener('click', (e) => {
            if (!e.target.closest('a')) {
                if (onOpenModal) onOpenModal(projectData);
            }
        });

        return cardEl;
    }
}
