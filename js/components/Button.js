/**
 * 재사용 가능한 Button 컴포넌트 클래스
 * design.md 규격에 맞추어 다양한 크기(lg, md, sm) 및 스타일 바리에이션(primary, secondary, accent) 지원
 */
export class Button {
    /**
     * Button 옵션 정의
     * @param {Object} options 
     * @param {string} options.text - 버튼에 표시될 텍스트
     * @param {string} [options.variant='primary'] - 버튼 바리에이션 ('primary' | 'secondary' | 'accent' | 'ghost-dark')
     * @param {string} [options.size='md'] - 버튼 크기 ('lg' | 'md' | 'sm')
     * @param {string} [options.icon=''] - 버튼 좌측 이모지/아이콘
     * @param {string} [options.href=''] - 클릭 시 이동할 URL (지정 시 <a> 태그로 생성)
     * @param {Function} [options.onClick=null] - 클릭 이벤트 핸들러 콜백
     * @param {boolean} [options.disabled=false] - 비활성화 여부
     */
    constructor(options = {}) {
        this.text = options.text || '버튼';
        this.variant = options.variant || 'primary';
        this.size = options.size || 'md';
        this.icon = options.icon || '';
        this.href = options.href || '';
        this.onClick = options.onClick || null;
        this.disabled = options.disabled || false;
    }

    /**
     * DOM 엘리먼트 생성 및 반환
     * @returns {HTMLElement} 생성된 버튼 엘리먼트
     */
    render() {
        // href 옵션 유무에 따라 <a> 태그 또는 <button> 태그 생성
        const el = document.createElement(this.href ? 'a' : 'button');
        el.className = `btn btn-${this.variant} btn-${this.size}`;

        if (this.href) {
            el.href = this.href;
            el.target = '_blank';
            el.rel = 'noopener noreferrer';
        }

        if (this.disabled && !this.href) {
            el.disabled = true;
        }

        // 아이콘과 텍스트 조합 렌더링
        const iconHtml = this.icon ? `<span class="btn-icon">${this.icon}</span>` : '';
        el.innerHTML = `${iconHtml}<span>${this.text}</span>`;

        // 클릭 이벤트 핸들러 바인딩
        if (this.onClick && typeof this.onClick === 'function') {
            el.addEventListener('click', (e) => this.onClick(e));
        }

        return el;
    }
}
