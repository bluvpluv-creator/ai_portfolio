/**
 * 재사용 가능한 Navbar 스티키 네비게이션 컴포넌트 클래스
 */
import { Badge } from './Badge.js';

export class Navbar {
    /**
     * @param {Object} options
     * @param {string} options.brandName - 브랜드 상호명
     * @param {string} options.badgeText - 브랜드 뱃지 문구
     * @param {Array<{label: string, href: string}>} options.links - 메뉴 링크 목록
     */
    constructor(options = {}) {
        this.brandName = options.brandName || 'Minseo Kim';
        this.badgeText = options.badgeText || 'Language & AI';
        this.links = options.links || [
            { label: '자기소개', href: '#profileSection' },
            { label: '작업물', href: '#projects' },
            { label: '연락처', href: '#contact' }
        ];
    }

    /**
     * Navbar DOM 엘리먼트 반환
     * @returns {HTMLElement}
     */
    render() {
        const navEl = document.createElement('nav');
        navEl.className = 'navbar';

        const badgeHtml = new Badge({
            text: this.badgeText,
            variant: 'blue'
        }).render().outerHTML;

        const linksHtml = this.links.map(link => `
            <li><a href="${link.href}" class="nav-link">${link.label}</a></li>
        `).join('');

        navEl.innerHTML = `
            <div class="nav-container">
                <a href="#" class="nav-logo">
                    <span>${this.brandName}</span>
                    ${badgeHtml}
                </a>
                <ul class="nav-links">
                    ${linksHtml}
                </ul>
            </div>
        `;

        return navEl;
    }
}
