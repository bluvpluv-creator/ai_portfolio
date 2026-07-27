/**
 * Supabase 클라이언트 초기화 모듈 (js/utils/supabaseClient.js)
 * CDN 브라우저 전용 @supabase/supabase-js ES 모듈을 사용하여 데이터베이스에 실시간 연결합니다.
 * 모든 주석은 한글로 작성되었습니다.
 */
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// 사용자가 제공한 Supabase 접속 정보
export const SUPABASE_URL = 'https://elzmyeinhhivaaxhcmrq.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_AcZs0B_C84HnG0xisdgwxA_JH1kVVj2';

// Supabase 클라이언트 인스턴스 생성
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
