/**
 * 재사용 가능한 Badge 및 Tag 칩 컴포넌트 클래스
 * design.md 규격 기반: 학부 뱃지, 카테고리 뱃지, 기술 스택 태그 칩 생성
 */
export class Badge {
    /**
     * Badge 컴포넌트 생성자
     * @param {Object} options
     * @param {string} options.text - 뱃지 텍스트
     * @param {string} [options.variant='blue'] - 뱃지 테마 ('blue' | 'indigo' | 'purple' | 'emerald' | 'dark-glass')
     * @param {string} [options.icon=''] - 뱃지 아이콘/이모지
     */
    constructor(options = {}) {
        this.text = options.text || '';
        this.variant = options.variant || 'blue';
        this.icon = options.icon || '';
    }

    /**
     * 뱃지 DOM 엘리먼트 반환
     * @returns {HTMLElement}
     */
    render() {
        const el = document.createElement('span');
        el.className = `badge badge-${this.variant}`;
        
        const iconHtml = this.icon ? `<span class="badge-icon">${this.icon}</span>` : '';
        el.innerHTML = `${iconHtml}<span>${this.text}</span>`;
        
        return el;
    }

    /**
     * 기술 스택 전용 태그 칩 HTML 생성 헬퍼 함수
     * @param {string} text - 태그 텍스트
     * @returns {string} HTML 텍스트
     */
    static createTagHtml(text) {
        return `<span class="tag-chip">${text}</span>`;
    }
}
