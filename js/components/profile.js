/**
 * 프로필(Profile) 히어로 섹션 렌더러 모듈
 * bio.json 데이터셋을 로드하여 히어로 카드를 동적으로 조합하고 렌더링합니다.
 */
import { Badge } from './Badge.js';

/**
 * 프로필 히어로 섹션 DOM 렌더링 함수
 * @param {HTMLElement} containerEl - 프로필이 렌더링될 부모 컨테이너
 */
export async function renderProfile(containerEl) {
    try {
        // bio.json 데이터 로드
        const response = await fetch('js/data/bio.json');
        const bioData = await response.json();

        // 학부 브랜드 뱃지(Badge) 생성
        const univBadgeHtml = new Badge({
            text: `${bioData.university} • ${bioData.department}`,
            variant: 'blue',
            icon: '🎓'
        }).render().outerHTML;

        // 스킬 칩 목록 HTML 조합
        const skillsHtml = bioData.skills.map(skill => `
            <div class="skill-chip">
                <span class="skill-icon">${skill.icon}</span>
                <div>
                    <div class="skill-title">${skill.name}</div>
                    <div class="skill-desc">${skill.desc}</div>
                </div>
            </div>
        `).join('');

        containerEl.innerHTML = `
            <div class="card hero-card animate-fade-in">
                <div class="hero-avatar-wrapper">
                    <img src="${bioData.avatar}" alt="${bioData.name}" class="hero-avatar-img" />
                </div>
                <div class="hero-info-group">
                    <div>${univBadgeHtml}</div>
                    <h1 class="hero-name">${bioData.name} <span style="font-size: 1.1rem; color: var(--text-muted); font-weight: 500;">(${bioData.englishName})</span></h1>
                    <p class="hero-subtitle">${bioData.subtitle}</p>
                    
                    <div class="bio-summary-box">
                        "${bioData.bioSummary}"
                    </div>

                    <div class="skills-grid">
                        ${skillsHtml}
                    </div>
                </div>
            </div>
        `;
    } catch (e) {
        console.error('프로필 데이터를 불러오는데 실패했습니다:', e);
        containerEl.innerHTML = `<p style="color: red;">프로필 데이터를 불러오는데 실패했습니다.</p>`;
    }
}
