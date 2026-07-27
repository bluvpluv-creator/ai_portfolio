/**
 * 관리자(Admin) 팝업 모달 컴포넌트 (js/components/AdminModal.js)
 * 4자리 PIN 인증(1234) 후 자기소개 수정, 새 프로젝트 추가 및 LocalStorage 데이터 관리 기능 제공
 * 모든 주석은 한글로 작성되었습니다.
 */
import { Button } from './Button.js';

export class AdminModal {
    /**
     * @param {HTMLElement} overlayEl - 오버레이 컨테이너
     * @param {Function} onDataUpdated - 데이터 갱신 시 실행할 콜백
     */
    constructor(overlayEl, onDataUpdated) {
        this.overlay = overlayEl;
        this.onDataUpdated = onDataUpdated;
        this.isAuthenticated = false;
        this.correctPin = '1234';

        this.bindEvents();
    }

    /**
     * 오버레이 닫기 및 키보드 단축키 바인딩
     */
    bindEvents() {
        const closeBtn = this.overlay.querySelector('.modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        // 비밀 단축키 Ctrl + Shift + A 모달 열기
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
     * 모달 닫기
     */
    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    /**
     * 렌더링 함수: 로그인 여부에 따라 PIN 입력 창 또는 관리자 파넬 표시
     */
    render() {
        const contentEl = this.overlay.querySelector('#modalContent');
        if (!contentEl) return;

        if (!this.isAuthenticated) {
            this.renderPinEntry(contentEl);
        } else {
            this.renderDashboard(contentEl);
        }
    }

    /**
     * PIN 번호 입력 폼 렌더링
     */
    renderPinEntry(container) {
        container.innerHTML = `
            <div class="modal-body" style="text-align: center; padding: 40px 24px;">
                <span style="font-size: 3rem; display: block; margin-bottom: 12px;">🔐</span>
                <h2 class="modal-title" style="margin-bottom: 8px;">관리자 PIN 인증</h2>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 24px;">
                    보안 PIN 4자리를 입력하세요. (기본 암호: <strong>1234</strong>)
                </p>
                <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 20px;">
                    <input type="password" id="adminPinInput" maxlength="4" placeholder="••••" 
                           style="width: 140px; font-size: 1.5rem; text-align: center; letter-spacing: 6px; padding: 8px; border: 2px solid var(--border-color); border-radius: 8px; outline: none;">
                </div>
                <div id="pinErrorMsg" style="color: red; font-size: 0.85rem; margin-bottom: 16px; display: none;">
                    PIN 번호가 일치하지 않습니다.
                </div>
                <div id="pinSubmitBtnContainer" style="display: flex; justify-content: center;"></div>
            </div>
        `;

        const pinInput = container.querySelector('#adminPinInput');
        const pinError = container.querySelector('#pinErrorMsg');
        const submitContainer = container.querySelector('#pinSubmitBtnContainer');

        const submitBtn = new Button({
            text: '로그인',
            variant: 'primary',
            size: 'md',
            onClick: () => this.verifyPin(pinInput.value, pinError)
        }).render();

        submitContainer.appendChild(submitBtn);

        pinInput.focus();
        pinInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.verifyPin(pinInput.value, pinError);
        });
    }

    /**
     * PIN 입력 검증
     */
    verifyPin(inputVal, errorEl) {
        if (inputVal === this.correctPin) {
            this.isAuthenticated = true;
            errorEl.style.display = 'none';
            this.render();
        } else {
            errorEl.style.display = 'block';
        }
    }

    /**
     * 관리자 편집 대시보드 렌더링
     */
    renderDashboard(container) {
        // 기존 LocalStorage 자기소개 및 프로젝트 가져오기
        const currentBio = JSON.parse(localStorage.getItem('portfolio_bio') || '{}');
        
        container.innerHTML = `
            <div class="modal-body" style="padding: 28px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 class="modal-title" style="margin: 0;">🛠️ 관리자 설정 대시보드</h2>
                    <span class="badge badge-emerald">로그인됨 (PIN: 1234)</span>
                </div>

                <!-- 탭 서브 메뉴 -->
                <div style="display: flex; gap: 8px; margin-bottom: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
                    <button class="filter-pill active" id="tabBioBtn">👤 자기소개 수정</button>
                    <button class="filter-pill" id="tabAddProjectBtn">➕ 새 작업물 추가</button>
                    <button class="filter-pill" id="tabResetBtn" style="color: red;">🔄 데이터 초기화</button>
                </div>

                <!-- 탭 1: 자기소개 수정 폼 -->
                <div id="tabBioContent" class="admin-tab-content">
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <label style="font-size: 0.85rem; font-weight: 700;">이름 (Name)</label>
                        <input type="text" id="editBioName" value="${currentBio.name || '김민서'}" style="padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;">

                        <label style="font-size: 0.85rem; font-weight: 700;">서브타이틀 (Subtitle)</label>
                        <input type="text" id="editBioSubtitle" value="${currentBio.subtitle || '언어공학과 인공지능을 융합하고, 바이브코딩으로 아이디어를 현실로 만듭니다.'}" style="padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;">

                        <label style="font-size: 0.85rem; font-weight: 700;">한 줄 소개 (Bio Summary)</label>
                        <textarea id="editBioSummary" rows="3" style="padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;">${currentBio.bioSummary || '언어에 대한 깊은 이해와 최신 LLM/AI 트렌드를 결합하여 사용자가 바로 체감할 수 있는 유용한 웹서비스와 앱을 구축합니다.'}</textarea>

                        <div id="saveBioBtnContainer" style="margin-top: 12px;"></div>
                    </div>
                </div>

                <!-- 탭 2: 새 작업물 추가 폼 -->
                <div id="tabAddProjectContent" class="admin-tab-content" style="display: none;">
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <label style="font-size: 0.85rem; font-weight: 700;">프로젝트 제목</label>
                        <input type="text" id="newProjTitle" placeholder="예: AI 번역 플랫폼" style="padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;">

                        <label style="font-size: 0.85rem; font-weight: 700;">카테고리</label>
                        <select id="newProjCategory" style="padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;">
                            <option value="llm">🤖 LLM / AI 웹앱</option>
                            <option value="nlp">🗣️ Language & NLP</option>
                            <option value="vibe">⚡ 바이브코딩 실험실</option>
                        </select>

                        <label style="font-size: 0.85rem; font-weight: 700;">한 줄 요약</label>
                        <input type="text" id="newProjSummary" placeholder="프로젝트에 대한 핵심 설명" style="padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;">

                        <label style="font-size: 0.85rem; font-weight: 700;">데모 접속 URL</label>
                        <input type="text" id="newProjDemoUrl" value="#" style="padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;">

                        <label style="font-size: 0.85rem; font-weight: 700;">바이브코딩 개발 스토리</label>
                        <textarea id="newProjVibeStory" rows="2" placeholder="어떤 AI 툴과 바이브코딩 방식을 활용하여 개발했는지 적어주세요." style="padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;"></textarea>

                        <div id="saveProjBtnContainer" style="margin-top: 12px;"></div>
                    </div>
                </div>

                <!-- 탭 3: 데이터 초기화 -->
                <div id="tabResetContent" class="admin-tab-content" style="display: none; text-align: center; padding: 20px;">
                    <p style="color: var(--text-secondary); margin-bottom: 20px;">
                        로컬스토리지에 저장된 수정 내역을 지우고 초기 JSON 데이터로 원상복구합니다.
                    </p>
                    <div id="resetBtnContainer" style="display: flex; justify-content: center;"></div>
                </div>
            </div>
        `;

        // 탭 전환 핸들러
        this.bindTabEvents(container);

        // 저장 버튼 렌더링
        const saveBioContainer = container.querySelector('#saveBioBtnContainer');
        const saveBioBtn = new Button({
            text: '💾 자기소개 저장하기',
            variant: 'primary',
            size: 'md',
            onClick: () => this.saveBio(container)
        }).render();
        saveBioContainer.appendChild(saveBioBtn);

        const saveProjContainer = container.querySelector('#saveProjBtnContainer');
        const saveProjBtn = new Button({
            text: '➕ 새 작업물 추가 등록',
            variant: 'accent',
            size: 'md',
            onClick: () => this.addProject(container)
        }).render();
        saveProjContainer.appendChild(saveProjBtn);

        const resetContainer = container.querySelector('#resetBtnContainer');
        const resetBtn = new Button({
            text: '🔄 기초 JSON 데이터로 복원',
            variant: 'secondary',
            size: 'md',
            onClick: () => this.resetData()
        }).render();
        resetContainer.appendChild(resetBtn);
    }

    bindTabEvents(container) {
        const tabBioBtn = container.querySelector('#tabBioBtn');
        const tabAddProjectBtn = container.querySelector('#tabAddProjectBtn');
        const tabResetBtn = container.querySelector('#tabResetBtn');

        const contentBio = container.querySelector('#tabBioContent');
        const contentAddProject = container.querySelector('#tabAddProjectContent');
        const contentReset = container.querySelector('#tabResetContent');

        const switchTab = (activeBtn, activeContent) => {
            [tabBioBtn, tabAddProjectBtn, tabResetBtn].forEach(b => b.classList.remove('active'));
            [contentBio, contentAddProject, contentReset].forEach(c => c.style.display = 'none');

            activeBtn.classList.add('active');
            activeContent.style.display = 'block';
        };

        tabBioBtn.addEventListener('click', () => switchTab(tabBioBtn, contentBio));
        tabAddProjectBtn.addEventListener('click', () => switchTab(tabAddProjectBtn, contentAddProject));
        tabResetBtn.addEventListener('click', () => switchTab(tabResetBtn, contentReset));
    }

    /**
     * 자기소개 로컬스토리지 저장
     */
    saveBio(container) {
        const name = container.querySelector('#editBioName').value;
        const subtitle = container.querySelector('#editBioSubtitle').value;
        const bioSummary = container.querySelector('#editBioSummary').value;

        const currentBio = JSON.parse(localStorage.getItem('portfolio_bio') || '{}');
        const updatedBio = {
            ...currentBio,
            name,
            subtitle,
            bioSummary
        };

        localStorage.setItem('portfolio_bio', JSON.stringify(updatedBio));

        if (this.onDataUpdated) this.onDataUpdated('bio');
        alert('✨ 자기소개 정보가 LocalStorage에 성공적으로 저장되었습니다!');
    }

    /**
     * 새 프로젝트 추가 로컬스토리지 저장
     */
    addProject(container) {
        const title = container.querySelector('#newProjTitle').value;
        const category = container.querySelector('#newProjCategory').value;
        const summary = container.querySelector('#newProjSummary').value;
        const demoUrl = container.querySelector('#newProjDemoUrl').value || '#';
        const vibeStory = container.querySelector('#newProjVibeStory').value;

        if (!title || !summary) {
            alert('프로젝트 제목과 한 줄 요약은 필수 입력 사항입니다.');
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
            tags: ['Vibe Coding', 'Custom Added'],
            vibeStory: vibeStory || '관리자 페이지에서 추가한 새 바이브코딩 작업물입니다.',
            features: ['신규 등록 프로젝트', '인터랙티브 기능 탑재']
        };

        const storedProjects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
        const updatedProjects = [newProj, ...storedProjects];

        localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));

        if (this.onDataUpdated) this.onDataUpdated('projects');
        alert('🚀 새로운 작업물이 LocalStorage에 정상 추가되었습니다!');
        this.close();
    }

    /**
     * 기초 JSON 데이터로 복원
     */
    resetData() {
        if (confirm('모든 로컬스토리지 수정 데이터를 지우고 기초 JSON 데이터로 되돌리시겠습니까?')) {
            localStorage.removeItem('portfolio_bio');
            localStorage.removeItem('portfolio_projects');
            if (this.onDataUpdated) this.onDataUpdated('all');
            alert('🔄 데이터가 초기 상태로 정상 복원되었습니다.');
            this.close();
        }
    }
}
