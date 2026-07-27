/**
 * 관리자 새 작업물 추가 폼 컴포넌트 (js/components/admin/AdminProjectForm.js)
 * 프로젝트 제목, 카테고리, 요약, 데모 URL, 바이브코딩 개발 스토리 입력 및 LocalStorage 추가
 * 모든 주석은 한글로 작성되었습니다.
 */
import { Button } from '../Button.js';

export class AdminProjectForm {
    /**
     * @param {Function} onAdd - 작업물 추가 성공 시 콜백 함수
     */
    constructor(onAdd) {
        this.onAdd = onAdd;
    }

    /**
     * 작업물 추가 폼 DOM 엘리먼트 반환
     * @returns {HTMLElement}
     */
    render() {
        const wrapper = document.createElement('div');
        wrapper.className = 'admin-project-form-wrapper';

        wrapper.innerHTML = `
            <div class="admin-form-group">
                <label class="admin-form-label">프로젝트 제목</label>
                <input type="text" id="newProjTitle" class="admin-form-input" placeholder="예: AI 논문 다국어 요약 서비스" />
            </div>

            <div class="admin-form-group">
                <label class="admin-form-label">카테고리 선택</label>
                <select id="newProjCategory" class="admin-form-select">
                    <option value="llm">🤖 LLM / AI 웹앱</option>
                    <option value="nlp">🗣️ Language & NLP</option>
                    <option value="vibe">⚡ 바이브코딩 실험실</option>
                </select>
            </div>

            <div class="admin-form-group">
                <label class="admin-form-label">한 줄 요약</label>
                <input type="text" id="newProjSummary" class="admin-form-input" placeholder="프로젝트 핵심 기능 한 줄 설명" />
            </div>

            <div class="admin-form-group">
                <label class="admin-form-label">데모 접속 URL</label>
                <input type="text" id="newProjDemoUrl" class="admin-form-input" value="#" />
            </div>

            <div class="admin-form-group">
                <label class="admin-form-label">바이브코딩 개발 스토리</label>
                <textarea id="newProjVibeStory" class="admin-form-textarea" rows="3" placeholder="개발 과정에서 활용한 AI 툴 및 바이브코딩 비하인드 스토리"></textarea>
            </div>

            <div id="addProjBtnBox" style="margin-top: 16px;"></div>
        `;

        // 추가 등록 버튼 조립
        const btnBox = wrapper.querySelector('#addProjBtnBox');
        const addBtn = new Button({
            text: '➕ 새 작업물 추가 등록',
            variant: 'accent',
            size: 'md',
            onClick: () => this.handleAdd(wrapper)
        }).render();

        btnBox.appendChild(addBtn);

        return wrapper;
    }

    /**
     * 작업물 추가 처리 및 LocalStorage 저장
     */
    handleAdd(wrapper) {
        const title = wrapper.querySelector('#newProjTitle').value;
        const category = wrapper.querySelector('#newProjCategory').value;
        const summary = wrapper.querySelector('#newProjSummary').value;
        const demoUrl = wrapper.querySelector('#newProjDemoUrl').value || '#';
        const vibeStory = wrapper.querySelector('#newProjVibeStory').value;

        if (!title || !summary) {
            alert('프로젝트 제목과 한 줄 요약은 필수 입력 항목입니다.');
            return;
        }

        const categoryLabels = {
            llm: '🤖 LLM / AI 웹앱',
            nlp: '🗣️ Language & NLP',
            vibe: '⚡ 바이브코딩 실험실'
        };

        const newProj = {
            id: 'custom-' + Date.now(),
            title,
            category,
            categoryLabel: categoryLabels[category] || '🤖 LLM / AI 웹앱',
            summary,
            thumbnail: 'assets/images/project_radar.svg',
            demoUrl,
            githubUrl: 'https://github.com',
            tags: ['Vibe Coding', 'Admin Added'],
            vibeStory: vibeStory || '관리자 페이지에서 등록한 신규 작업물입니다.',
            features: ['신규 등록 프로젝트', '인터랙티브 기능 탑재']
        };

        const storedProjects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
        const updatedProjects = [newProj, ...storedProjects];

        localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));

        if (this.onAdd) this.onAdd(newProj);
    }
}
