/**
 * 서버리스 API 엔드포인트: 작업물 관리 (/api/projects)
 * 브라우저에 Supabase API 키를 노출하지 않고 서버측에서 보관 및 처리합니다.
 * 모든 주석은 한글로 작성되었습니다.
 */
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 서버 환경변수에서 Supabase 접속 정보 로드
    const supabaseUrl = process.env.SUPABASE_URL || 'https://elzmyeinhhivaaxhcmrq.supabase.co';
    const supabaseKey = process.env.SUPABASE_KEY || 'sb_publishable_AcZs0B_C84HnG0xisdgwxA_JH1kVVj2';

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        if (req.method === 'GET') {
            // 1. 작업물 목록 서버측 조회
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return res.status(200).json({ success: true, data });
        } else if (req.method === 'POST') {
            // 2. 신규 작업물 서버측 등록
            const p = req.body;
            const { data, error } = await supabase
                .from('projects')
                .insert([{
                    id: p.id,
                    title: p.title,
                    category: p.category,
                    category_label: p.categoryLabel,
                    summary: p.summary,
                    thumbnail: p.thumbnail,
                    demo_url: p.demoUrl,
                    github_url: p.githubUrl,
                    tags: p.tags,
                    vibe_story: p.vibeStory,
                    features: p.features,
                    created_at: new Date().toISOString()
                }])
                .select();

            if (error) throw error;
            return res.status(200).json({ success: true, data });
        } else {
            return res.status(405).json({ error: '허용되지 않는 메쏘드입니다.' });
        }
    } catch (err) {
        console.error('API /api/projects 처리 실패:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
}
