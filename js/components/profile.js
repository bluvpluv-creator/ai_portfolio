/**
 * 프로필(Profile) 히어로 섹션 렌더러 모듈
 * Supabase DB(또나 LocalStorage/JSON)에서 자기소개 데이터를 연동 받아 렌더링합니다.
 * 모든 주석은 한글로 작성되었습니다.
 */
import { Badge } from './Badge.js';
import { supabaseService } from '../services/supabaseService.js';

/**
 * 프로필 히어로 섹션 DOM 렌더링 함수
 * @param {HTMLElement} containerEl - 프로필이 렌더링될 부모 컨테이너
 */
export async function renderProfile(containerEl) {
    try {
        // Supabase DB / LocalStorage 연동 데이터 가져오기
        const bioData = await supabaseService.fetchBio();

        // 학부 브랜드 뱃지(Badge) 생성
        const univBadgeHtml = new Badge({
            text: `${bioData.university || '한국외국어대학교 (서울)'} • ${bioData.department || 'Language & AI 융합학부'}`,
            variant: 'blue',
            icon: '🎓'
        }).render().outerHTML;

        // 스킬 칩 목록 HTML 조합
        const skillsHtml = (bioData.skills || []).map(skill => `
            <div class="skill-chip">
                <span class="skill-icon">${skill.icon || '⚡'}</span>
                <div>
                    <div class="skill-title">${skill.name}</div>
                    <div class="skill-desc">${skill.desc}</div>
                </div>
            </div>
        `).join('');

        containerEl.innerHTML = `
            <div class="card hero-card animate-fade-in">
                <div class="hero-avatar-wrapper">
                    <img src="${bioData.avatar || 'assets/images/profile_avatar.svg'}" alt="${bioData.name}" class="hero-avatar-img" />
                </div>
                <div class="hero-info-group">
                    <div>${univBadgeHtml}</div>
                    <h1 class="hero-name">${bioData.name} <span style="font-size: 1.1rem; color: var(--text-muted); font-weight: 500;">(${bioData.englishName || 'Minseo Kim'})</span></h1>
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
