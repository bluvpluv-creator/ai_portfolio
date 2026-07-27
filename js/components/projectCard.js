/**
 * 프로젝트(Projects) 갤러리 컨트롤러 모듈
 * Supabase DB(또는 LocalStorage/JSON)에서 작업물 목록을 가져와 렌더링합니다.
 * 모든 주석은 한글로 작성되었습니다.
 */
import { Card } from './Card.js';
import { supabaseService } from '../services/supabaseService.js';

export class ProjectsController {
    /**
     * @param {HTMLElement} pillsContainer - 카테고리 필터 버튼 부모 컨테이너
     * @param {HTMLElement} gridContainer - 프로젝트 카드가 배치될 그리드 컨테이너
     * @param {Function} onOpenModal - 모달 팝업 오픈 콜백 함수
     */
    constructor(pillsContainer, gridContainer, onOpenModal) {
        this.pillsContainer = pillsContainer;
        this.gridContainer = gridContainer;
        this.onOpenModal = onOpenModal;

        this.projects = [];
        this.activeCategory = 'all';

        this.init();
    }

    /**
     * Supabase DB 연동 데이터 로드 및 초기화
     */
    async init() {
        try {
            // Supabase / LocalStorage / JSON 데이터 통합 로드
            this.projects = await supabaseService.fetchProjects();

            this.renderPills();
            this.renderGrid();
        } catch (e) {
            console.error('프로젝트 데이터를 불러오는데 실패했습니다:', e);
            this.gridContainer.innerHTML = `<p style="color: red;">프로젝트 목록을 불러오는데 실패했습니다.</p>`;
        }
    }

    /**
     * 카테고리 필터 버튼 렌더링
     */
    renderPills() {
        const categories = [
            { id: 'all', label: '✨ 전체 (All)' },
            { id: 'llm', label: '🤖 LLM / AI 웹앱' },
            { id: 'nlp', label: '🗣️ Language & NLP' },
            { id: 'vibe', label: '⚡ 바이브코딩 실험실' }
        ];

        this.pillsContainer.innerHTML = categories.map(cat => `
            <button class="filter-pill ${cat.id === this.activeCategory ? 'active' : ''}" data-id="${cat.id}">
                ${cat.label}
            </button>
        `).join('');

        // 필터 버튼 클릭 이벤트 등록
        this.pillsContainer.querySelectorAll('.filter-pill').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.activeCategory = e.currentTarget.dataset.id;
                this.renderPills();
                this.renderGrid();
            });
        });
    }

    /**
     * 선택된 카테고리에 맞는 프로젝트 카드 그리드 렌더링
     */
    renderGrid() {
        const filtered = this.activeCategory === 'all'
            ? this.projects
            : this.projects.filter(p => p.category === this.activeCategory);

        this.gridContainer.innerHTML = '';

        if (filtered.length === 0) {
            this.gridContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
                    해당 카테고리의 프로젝트가 아직 없습니다.
                </div>
            `;
            return;
        }

        // 재사용 가능한 Card 컴포넌트를 사용하여 카드 생성 및 배치
        filtered.forEach(project => {
            const cardNode = Card.createProjectCard(project, this.onOpenModal);
            this.gridContainer.appendChild(cardNode);
        });
    }
}
