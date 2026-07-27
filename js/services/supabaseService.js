/**
 * Supabase 데이터베이스 서비스 모듈 (js/services/supabaseService.js)
 * 자기소개(bio) 및 프로젝트(projects) 데이터를 Supabase Cloud DB와 실시간 동기화합니다.
 * 인터넷 연결 미비나 테이블 미생성 시 LocalStorage 및 기본 JSON으로 안전하게 자동 폴백(Fallback)합니다.
 * 모든 주석은 한글로 작성되었습니다.
 */
import { supabase } from '../utils/supabaseClient.js';

export const supabaseService = {
    /**
     * 1. 자기소개 데이터 가져오기 (Supabase -> LocalStorage -> bio.json 순)
     * @returns {Promise<Object>} 자기소개 정보 객체
     */
    async fetchBio() {
        try {
            // Supabase bio 테이블 데이터 조회
            const { data, error } = await supabase
                .from('bio')
                .select('*')
                .limit(1)
                .single();

            if (!error && data) {
                // Supabase 스키마 필드를 프론트엔드 포맷으로 매핑
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

                // LocalStorage에도 동기화 캐싱
                localStorage.setItem('portfolio_bio', JSON.stringify(mappedBio));
                return mappedBio;
            }
        } catch (err) {
            console.warn('Supabase DB 조회 미작동, 로컬 백업으로 진행합니다:', err);
        }

        // 폴백: LocalStorage 체크
        const storedBio = localStorage.getItem('portfolio_bio');
        if (storedBio) return JSON.parse(storedBio);

        // 폴백: bio.json 파일 로드
        const res = await fetch('js/data/bio.json');
        return await res.json();
    },

    /**
     * 2. 자기소개 데이터 저장 (Supabase DB 저장 + LocalStorage 백업)
     * @param {Object} bioData - 수정한 자기소개 객체
     */
    async saveBio(bioData) {
        // LocalStorage 즉시 보관
        localStorage.setItem('portfolio_bio', JSON.stringify(bioData));

        try {
            // Supabase bio 테이블 데이터 수정 (upsert)
            const { error } = await supabase
                .from('bio')
                .upsert({
                    id: '00000000-0000-0000-0000-000000000001',
                    name: bioData.name,
                    english_name: bioData.englishName || 'Minseo Kim',
                    subtitle: bioData.subtitle,
                    bio_summary: bioData.bioSummary,
                    updated_at: new Date().toISOString()
                });

            if (error) {
                console.warn('Supabase bio 저장 오류 (테이블 미생성 시):', error.message);
            }
        } catch (err) {
            console.warn('Supabase 저장 실패, LocalStorage로 처리됨:', err);
        }
    },

    /**
     * 3. 프로젝트 목록 데이터 가져오기 (Supabase DB -> LocalStorage -> projects.json 순)
     * @returns {Promise<Array>} 프로젝트 배열
     */
    async fetchProjects() {
        try {
            // Supabase projects 테이블 데이터 조회
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data && data.length > 0) {
                const mappedProjects = data.map(p => ({
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
        } catch (err) {
            console.warn('Supabase projects DB 조회 미작동, 로컬 백업으로 진행합니다:', err);
        }

        // 폴백: LocalStorage 커스텀 추가 프로젝트 확인
        const storedProjects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
        const res = await fetch('js/data/projects.json');
        const defaultProjects = await res.json();

        return [...storedProjects, ...defaultProjects];
    },

    /**
     * 4. 새 작업물 추가 (Supabase DB 추가 + LocalStorage 백업)
     * @param {Object} projectData - 추가할 새 프로젝트 객체
     */
    async addProject(projectData) {
        // 1. LocalStorage 백업 저장
        const storedProjects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
        localStorage.setItem('portfolio_projects', JSON.stringify([projectData, ...storedProjects]));

        // 2. Supabase DB 추가
        try {
            const { error } = await supabase
                .from('projects')
                .insert([{
                    id: projectData.id,
                    title: projectData.title,
                    category: projectData.category,
                    category_label: projectData.categoryLabel,
                    summary: projectData.summary,
                    thumbnail: projectData.thumbnail,
                    demo_url: projectData.demoUrl,
                    github_url: projectData.githubUrl,
                    tags: projectData.tags,
                    vibe_story: projectData.vibeStory,
                    features: projectData.features,
                    created_at: new Date().toISOString()
                }]);

            if (error) {
                console.warn('Supabase projects insert 오류:', error.message);
            }
        } catch (err) {
            console.warn('Supabase DB 등록 실패, LocalStorage로 저장됨:', err);
        }
    }
};
