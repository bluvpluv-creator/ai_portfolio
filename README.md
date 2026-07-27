# 🥠 ai_portfolio

> **김민서 (Minseo Kim) - Language & AI 융합 개발자 개인 포트폴리오**  
> 언어공학과 인공지능을 융합하고, 바이브코딩(Vibe Coding)으로 아이디어를 현실로 만듭니다.

---

## 🌟 주요 특징

- 🎓 **Language & AI 융합 및 바이브코딩 브랜딩**: 한국외대(서울) Language & AI 융합학부 전공 역량 강조
- 🎨 **Interactive Modern Clean 디자인 시스템**: `Inter` + `Noto Sans KR` 폰트, `Sharp Elegant` 모서리 스타일 및 `Soft Subdued Glow` 입체감
- 🧩 **모듈화된 UI 컴포넌트**: `Button`, `Badge`, `Card`, `ModalComponent`, `Toast`, `Navbar` 등 독립 컴포넌트 아키텍처
- 📝 **JSON 데이터 기반 유지보수**: `js/data/bio.json` 및 `js/data/projects.json` 파일 수정만으로 웹사이트 내용 즉시 업데이트
- 🧪 **컴포넌트 연구소 쇼케이스 (`demo.html`)**: 컴포넌트별 라이브 테스트 페이지 제공

---

## 📁 프로젝트 구조

```
ai_portfolio/
├── index.html                    # 포트폴리오 메인 웹페이지
├── demo.html                     # UI 컴포넌트 데모 연구소 쇼케이스
├── style.css                     # Master CSS 로더 (@import)
├── docs/                         # 기획 및 디자인 문서 (prd.md, design.md)
├── assets/images/                # SVG 이미지 리소스
├── css/                          # 디자인 시스템 & 컴포넌트 스타일
└── js/                           # 메인 앱, 컴포넌트 모듈 & JSON 데이터
```

---

## 🚀 로컬 실행 방법

별도의 복잡한 빌드 과정 없이 정적 웹 서버나 브라우저에서 바로 실행하실 수 있습니다.

```bash
# Python 내장 HTTP 서버 실행
python -m http.server 8081
```

브라우저 주소창에 `http://localhost:8081` 을 입력하여 접속합니다.
