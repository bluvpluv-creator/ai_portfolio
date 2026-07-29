/**
 * 보안 서버 API 연동 데이터 서비스 모듈 (js/services/supabaseService.js)
 * 브라우저에 Supabase API 키를 노출하지 않고 백엔드 서버 API(/api/bio, /api/projects)를 통해 데이터를 안전하게 교환합니다.
 * 모든 주석은 한글로 작성되었습니다.
 */

export const supabaseService = {
    /**
     * 1. 자기소개 데이터 가져오기 (서버 API /api/bio 호출 -> LocalStorage -> bio.json 순 폴백)
     * @returns {Promise<Object>} 자기소개 객체
     */
    async fetchBio() {
        try {
            // 보안 서버 API 호출 (API 키 노출 차단)
            const res = await fetch('/api/bio');
            if (res.ok) {
                const result = await res.json();
                if (result.success && result.data) {
                    const data = result.data;
                    const mappedBio = {
                        name: data.name || '김민서',
                        englishName: data.english_name || 'Minseo Kim',
                        title: data.title || 'Language & AI 융합 개발자',
                        subtitle: data.subtitle || '언어공학과 인공지능을 융합하고, 바이브코딩으로 아이디어를 현실로 만듭니다.',
                        university: data.university || '한국외국어대학교 (서울)',
                        department: data.department || 'Language & AI 융합학부',
                        bioSummary: data.bio_summary || '언어에 대한 깊은 이해와 최신 LLM/AI 트렌드를 결합하여 사용자가 바로 체감할 수 있는 유용한 웹서비스와 앱을 구축합니다.',
                        avatar: data.avatar || 'assets/images/profile_avatar.svg',
                        skills: [
                            { name: "Language & AI 융합", icon: "🗣️", desc: "NLP, 자연어 이해, 프롬프트 엔지니어링" },
                            { name: "AI 트렌드 & 바이브코딩", icon: "⚡", desc: "LLM API 활용, 빠른 프로토타이핑 & 애자일 개발" },
                            { name: "웹 & 앱 서비스 구축", icon: "💻", desc: "Full-stack Web, Interactive UI/UX, REST API" }
                        ]
                    };
                    localStorage.setItem('portfolio_bio', JSON.stringify(mappedBio));
                    return mappedBio;
                }
            }
        } catch (err) {
            console.warn('서버 API /api/bio 호출 미작동, 로컬 데이터로 대체합니다:', err);
        }

        // 로컬스토리지 백업 체크
        const storedBio = localStorage.getItem('portfolio_bio');
        if (storedBio) return JSON.parse(storedBio);

        // 기본 bio.json 로드
        const res = await fetch('js/data/bio.json');
        return await res.json();
    },

    /**
     * 2. 자기소개 데이터 저장 (서버 API /api/bio POST 호출)
     * @param {Object} bioData - 수정한 자기소개 객체
     */
    async saveBio(bioData) {
        localStorage.setItem('portfolio_bio', JSON.stringify(bioData));

        try {
            const res = await fetch('/api/bio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bioData)
            });
            if (!res.ok) console.warn('서버 API /api/bio 응답 경고');
        } catch (err) {
            console.warn('서버 API /api/bio 저장 실패, 로컬에 저장됨:', err);
        }
    },

    /**
     * 3. 프로젝트 목록 데이터 가져오기 (서버 API /api/projects 호출 -> LocalStorage -> projects.json 순 폴백)
     * @returns {Promise<Array>} 프로젝트 목록
     */
    async fetchProjects() {
        try {
            const res = await fetch('/api/projects');
            if (res.ok) {
                const result = await res.json();
                if (result.success && result.data && result.data.length > 0) {
                    const mappedProjects = result.data.map(p => ({
                        id: p.id,
                        title: p.title,
                        category: p.category,
                        categoryLabel: p.category_label,
                        summary: p.summary,
                        thumbnail: p.thumbnail || 'assets/images/project_radar.svg',
                        demoUrl: p.demo_url || '#',
                        githubUrl: p.github_url || 'https://github.com',
                        tags: p.tags || ['Vibe Coding'],
                        vibeStory: p.vibe_story || '',
                        features: p.features || []
                    }));

                    localStorage.setItem('portfolio_projects_cache', JSON.stringify(mappedProjects));
                    return mappedProjects;
                }
            }
        } catch (err) {
            console.warn('서버 API /api/projects 호출 미작동, 로컬 데이터로 대체합니다:', err);
        }

        const storedProjects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
        const res = await fetch('js/data/projects.json');
        const defaultProjects = await res.json();

        return [...storedProjects, ...defaultProjects];
    },

    /**
     * 4. 새 작업물 등록 (서버 API /api/projects POST 호출)
     * @param {Object} projectData - 추가할 새 프로젝트 객체
     */
    async addProject(projectData) {
        const storedProjects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
        localStorage.setItem('portfolio_projects', JSON.stringify([projectData, ...storedProjects]));

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData)
            });
            if (!res.ok) console.warn('서버 API /api/projects 응답 경고');
        } catch (err) {
            console.warn('서버 API /api/projects 저장 실패, 로컬에 저장됨:', err);
        }
    }
};
