-- ==========================================================================
-- Supabase 데이터베이스 테이블 생성 및 초기 데이터 SQL 스크립트
-- Supabase 대시보드 > SQL Editor 에서 이 전체 코드를 복사하여 실행(Run)하세요.
-- ==========================================================================

-- 1. 자기소개 (bio) 테이블 생성
CREATE TABLE IF NOT EXISTS public.bio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL DEFAULT '김민서',
    english_name TEXT DEFAULT 'Minseo Kim',
    title TEXT DEFAULT 'Language & AI 융합 개발자',
    subtitle TEXT DEFAULT '언어공학과 인공지능을 융합하고, 바이브코딩으로 아이디어를 현실로 만듭니다.',
    university TEXT DEFAULT '한국외국어대학교 (서울)',
    department TEXT DEFAULT 'Language & AI 융합학부',
    bio_summary TEXT DEFAULT '언어에 대한 깊은 이해와 최신 LLM/AI 트렌드를 결합하여 사용자가 바로 체감할 수 있는 유용한 웹서비스와 앱을 구축합니다.',
    avatar TEXT DEFAULT 'assets/images/profile_avatar.svg',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. 작업물 (projects) 테이블 생성
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    category_label TEXT NOT NULL,
    summary TEXT NOT NULL,
    thumbnail TEXT DEFAULT 'assets/images/project_radar.svg',
    demo_url TEXT DEFAULT '#',
    github_url TEXT DEFAULT 'https://github.com',
    tags TEXT[] DEFAULT '{}',
    vibe_story TEXT,
    features TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Row Level Security (RLS) 읽기/쓰기 권한 허용 설정
ALTER TABLE public.bio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 익명(Anon) 사용자의 SELECT (조회) 권한 허용
CREATE POLICY "Allow public read bio" ON public.bio FOR SELECT USING (true);
CREATE POLICY "Allow public read projects" ON public.projects FOR SELECT USING (true);

-- 익명(Anon) 사용자의 INSERT / UPDATE / DELETE 권한 허용 (관리자 기능 수행)
CREATE POLICY "Allow public insert bio" ON public.bio FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update bio" ON public.bio FOR UPDATE USING (true);

CREATE POLICY "Allow public insert projects" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update projects" ON public.projects FOR UPDATE USING (true);
CREATE POLICY "Allow public delete projects" ON public.projects FOR DELETE USING (true);

-- 4. 초기 기본 자기소개 데이터 삽입 (없을 경우에만)
INSERT INTO public.bio (id, name, english_name, subtitle, university, department, bio_summary)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    '김민서',
    'Minseo Kim',
    '언어공학과 인공지능을 융합하고, 바이브코딩으로 아이디어를 현실로 만듭니다.',
    '한국외국어대학교 (서울)',
    'Language & AI 융합학부',
    '언어에 대한 깊은 이해와 최신 LLM/AI 트렌드를 결합하여 사용자가 바로 체감할 수 있는 유용한 웹서비스와 앱을 구축합니다.'
)
ON CONFLICT (id) DO NOTHING;

-- 5. 초기 프로젝트 작업물 샘플 데이터 삽입
INSERT INTO public.projects (id, title, category, category_label, summary, thumbnail, demo_url, github_url, tags, vibe_story, features)
VALUES 
(
    'mystic-fortune-cookie',
    '신비로운 포춘쿠키 (Mystic Fortune Cookie)',
    'llm',
    '🤖 LLM / AI 웹앱',
    '3D 쪼개짐 애니메이션과 사운드 효과가 결합된 인터랙티브 운세 및 긍정 메시지 웹앱',
    'assets/images/project_fortune.svg',
    '../fortune-cookie-app/index.html',
    'https://github.com',
    ARRAY['Vanilla JS', 'Web Audio API', 'Canvas Particles', 'CSS 3D Transforms'],
    '바이브코딩 기법을 도입하여 디자인 시스템 구축부터 Web Audio API 사운드 합성기, 캔버스 파티클 엔진까지 1시간 만에 완성한 고품질 인터랙티브 웹 앱 프로젝트입니다.',
    ARRAY['실감나는 포춘쿠키 3D 균열 및 분리 애니메이션', 'Web Audio API로 자체 합성한 효과음', '운세 보관함 & 복사 기능']
),
(
    'language-ai-summarizer',
    'LangAI - 다국어 학술 논문 AI 요약기',
    'nlp',
    '🗣️ Language & NLP',
    '언어학적 구조 분석과 LLM RAG 기술을 결합하여 복잡한 다국어 논문을 핵심만 3줄 요약해주는 플랫폼',
    'assets/images/project_nlp.svg',
    '#',
    'https://github.com',
    ARRAY['Language & AI', 'Gemini API', 'Python', 'NLP Pipeline'],
    'Language & AI 융합학부의 전공 지식을 살려 텍스트의 구문 구조 파악과 LLM 요약을 파이프라인으로 엮었습니다.',
    ARRAY['다국어 문맥 보존 요약', '핵심 키워드 매핑 및 용어집 자동 생성']
),
(
    'vibe-prompt-studio',
    'Vibe Prompt Studio - 바이브코딩 프롬프트 생성기',
    'vibe',
    '⚡ 바이브코딩 실험실',
    '자연어로 원하는 앱 아이디어만 입력하면 바이브코딩에 최적화된 PRD와 구조화된 시스템 프롬프트를 자동 생성',
    'assets/images/project_vibe.svg',
    '#',
    'https://github.com',
    ARRAY['Vibe Coding', 'Prompt Engineering', 'Claude 3.7', 'FastAPI'],
    '개발 생산성을 10배 끌어올리는 바이브코딩(Vibe Coding)을 누구나 쉽게 경험할 수 있도록 돕는 프롬프트 생성기입니다.',
    ARRAY['초보자용 PRD 자동 작성', '컴포넌트 프롬프트 템플릿 생성']
)
ON CONFLICT (id) DO NOTHING;
