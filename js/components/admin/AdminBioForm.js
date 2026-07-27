/**
 * 관리자 자기소개 편집 폼 컴포넌트 (js/components/admin/AdminBioForm.js)
 * 이름, 서브타이틀, 한 줄 소개 실시간 편집 및 LocalStorage 저장
 * 모든 주석은 한글로 작성되었습니다.
 */
import { Button } from '../Button.js';

export class AdminBioForm {
    /**
     * @param {Function} onSave - 저장 완료 시 콜백 함수
     */
    constructor(onSave) {
        this.onSave = onSave;
    }

    /**
     * 자기소개 수정 폼 DOM 엘리먼트 반환
     * @returns {HTMLElement}
     */
    render() {
        // 기존 LocalStorage 자기소개 데이터 가져오기
        const currentBio = JSON.parse(localStorage.getItem('portfolio_bio') || '{}');

        const wrapper = document.createElement('div');
        wrapper.className = 'admin-bio-form-wrapper';

        wrapper.innerHTML = `
            <div class="admin-form-group">
                <label class="admin-form-label">이름 (Name)</label>
                <input type="text" id="editBioName" class="admin-form-input" value="${currentBio.name || '김민서'}" />
            </div>

            <div class="admin-form-group">
                <label class="admin-form-label">서브타이틀 (Subtitle)</label>
                <input type="text" id="editBioSubtitle" class="admin-form-input" value="${currentBio.subtitle || '언어공학과 인공지능을 융합하고, 바이브코딩으로 아이디어를 현실로 만듭니다.'}" />
            </div>

            <div class="admin-form-group">
                <label class="admin-form-label">한 줄 소개 (Bio Summary)</label>
                <textarea id="editBioSummary" class="admin-form-textarea" rows="3">${currentBio.bioSummary || '언어에 대한 깊은 이해와 최신 LLM/AI 트렌드를 결합하여 사용자가 바로 체감할 수 있는 유용한 웹서비스와 앱을 구축합니다.'}</textarea>
            </div>

            <div id="saveBioBtnBox" style="margin-top: 16px;"></div>
        `;

        // 저장 버튼 조립
        const btnBox = wrapper.querySelector('#saveBioBtnBox');
        const saveBtn = new Button({
            text: '💾 자기소개 저장하기',
            variant: 'primary',
            size: 'md',
            onClick: () => this.handleSave(wrapper)
        }).render();

        btnBox.appendChild(saveBtn);

        return wrapper;
    }

    /**
     * 자기소개 저장 처리
     */
    handleSave(wrapper) {
        const name = wrapper.querySelector('#editBioName').value;
        const subtitle = wrapper.querySelector('#editBioSubtitle').value;
        const bioSummary = wrapper.querySelector('#editBioSummary').value;

        const currentBio = JSON.parse(localStorage.getItem('portfolio_bio') || '{}');
        const updatedBio = {
            ...currentBio,
            name,
            subtitle,
            bioSummary
        };

        localStorage.setItem('portfolio_bio', JSON.stringify(updatedBio));

        if (this.onSave) this.onSave();
    }
}
