# 🎨 [Design Guide] 개인 AI 포트폴리오 UI/UX 디자인 가이드

> **프로젝트명**: 김민서(Minseo Kim) - Language & AI 융합 포트폴리오  
> **문서 버전**: v1.0  
> **작성자**: UI/UX 디자인 전문가 & 프론트엔드 아키텍트  
> **연관 문서**: `@prd.md`  
> **저장 위치**: `portfolio/design.md`  

---

## 1. 🌟 디자인 컨셉 및 방향성 (Design Concept)

### 1.1 브랜딩 컨셉: **Interactive Modern Clean**
* **키워드**: `글로벌 테크`, `언어 & AI 융합`, `정돈된 엘레강스`, `부드러운 입체감`
* **방향성**: 업계 관계자가 방문했을 때 가독성을 저해하는 무거운 다크모드나 과도한 특수효과 대신, **스노우 화이트 배경 기반의 명확한 정보 전달력**과 **슬레이트 블루 Accent**, 그리고 **정돈된 모서리(Sharp Elegant Style)**로 세련되고 신뢰감 있는 인상을 전달합니다.

---

## 2. 🎨 컬러 시스템 (Color Palette System)

### 2.1 메인 테마 컬러 (Primary Theme Colors)
| 역할 | 컬러명 | HEX Code | 사용처 |
| :--- | :--- | :--- | :--- |
| **Primary Main** | Electric Blue | `#3B82F6` | 메인 버튼, 활성 카테고리 탭, 주요 링크, 핵심 강조 |
| **Primary Dark** | Deep Blue | `#2563EB` | 메인 버튼 Hover 상태, 강조 텍스트 |
| **Primary Indigo**| Tech Indigo | `#6366F1` | 학부 브랜드 뱃지, 바이브코딩 강조 박스, 서브 버튼 |

### 2.2 서브 & 포인트 컬러 (Secondary & Accent Colors)
| 역할 | 컬러명 | HEX Code | 사용처 |
| :--- | :--- | :--- | :--- |
| **Accent Purple** | Violet Ray | `#8B5CF6` | AI 트렌드 및 프롬프트 관련 태그 강조 |
| **Accent Emerald**| Success Emerald | `#10B981` | 라이브 데모 접속 가능 상태 표시, 성공 알림 |
| **Accent Amber**  | Amber Warmth | `#F59E0B` | 포춘쿠키 및 이모지 하이라이트 |

### 2.3 뉴트럴 & 배경 컬러 (Neutral Background & Text)
| 역할 | 컬러명 | HEX Code | 사용처 |
| :--- | :--- | :--- | :--- |
| **App Background**| Snow White | `#F8FAFC` | 전체 앱 기본 배경색 |
| **Card Surface**  | Pure White | `#FFFFFF` | 히어로 카운터, 프로젝트 카드, 모달 표면 |
| **Border Line**   | Slate Border | `#E2E8F0` | 카드 테두리, 구분선 |
| **Text Primary**  | Slate Dark | `#0F172A` | 메인 헤드라인, 프로젝트 제목 |
| **Text Secondary**| Slate Gray | `#475569` | 서브 텍스트, 설명 문구, 부제목 |
| **Text Muted**    | Slate Muted | `#94A3B8` | 날짜, 비활성 아이콘, 캡션 |

---

## 3. ✍️ 타이포그래피 가이드 (Typography Guide)

### 3.1 폰트 패밀리 (Font Family)
* **글로벌 영문 / 숫자 / 코드**: `Inter`, sans-serif (모던 테크 스타일)
* **한글본문 / 헤드라인**: `Noto Sans KR`, sans-serif (높은 한글 가독성)

### 3.2 폰트 스케일 & 계층 구조 (Type Hierarchy)

```css
/* Typography Design Tokens */
--font-h1: 800 2.25rem / 1.25 "Inter", "Noto Sans KR", sans-serif;   /* 36px - Hero Title */
--font-h2: 800 1.75rem / 1.3  "Inter", "Noto Sans KR", sans-serif;   /* 28px - Section Title */
--font-h3: 700 1.25rem / 1.4  "Inter", "Noto Sans KR", sans-serif;   /* 20px - Card Title */
--font-subtitle: 500 1.05rem / 1.5 "Inter", "Noto Sans KR", sans-serif;/* 16.8px - Subtitle */
--font-body: 400 0.95rem / 1.6   "Noto Sans KR", sans-serif;        /* 15.2px - Body Text */
--font-caption: 500 0.8rem / 1.4  "Inter", "Noto Sans KR", sans-serif; /* 12.8px - Tags/Badges */
```

---

## 4. 🔘 버튼 시스템 가이드 (Button System Specifications)

### 4.1 모서리 곡률 (Border Radius): **Sharp Elegant Style**
* **기본 버튼 / 뱃지**: `border-radius: 8px` (정돈되고 절제된 명확한 테크 스타일)
* **카드 / 모달 컨테이너**: `border-radius: 16px`
* **카테고리 필터 탭 / 토스트**: `border-radius: 30px` (캡슐 스타일)

### 4.2 버튼 크기 명세 (Button Sizes & Padding)

| 규격 (Size) | 높이 (Min Height) | 좌우 패딩 (Padding) | 폰트 크기 | 굵기 | 사용처 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Large (LG)** | `48px` | `top/bottom: 14px, left/right: 28px` | `1rem (16px)` | `700 (Bold)` | 메인 CTA, 모달 라이브 접속 |
| **Medium (MD)**| `40px` | `top/bottom: 10px, left/right: 20px` | `0.88rem (14px)` | `600 (SemiBold)` | 프로젝트 카드 action 버튼 |
| **Small (SM)** | `32px` | `top/bottom: 6px, left/right: 12px` | `0.78rem (12.5px)`| `600 (SemiBold)` | 태그, 이메일 복사 칩 |

### 4.3 버튼 상태별 스타일 (Button States)

```css
/* Primary Button */
.btn-primary {
  background-color: #3B82F6;
  color: #FFFFFF;
  border: 1px solid #3B82F6;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-primary:hover {
  background-color: #2563EB;
  border-color: #2563EB;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px -4px rgba(59, 130, 246, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
}

/* Secondary Ghost Button */
.btn-secondary {
  background-color: #FFFFFF;
  color: #0F172A;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  transition: all 0.25s ease;
}

.btn-secondary:hover {
  background-color: #F8FAFC;
  border-color: #3B82F6;
  color: #3B82F6;
  transform: translateY(-2px);
}
```

---

## 5. 🧱 주요 컴포넌트 규격 (Component Specifications)

### 5.1 프로필 히어로 카드 (Hero Bio Card)
* **배경**: Pure White (`#FFFFFF`), Border (`1px solid #E2E8F0`)
* **그림자**: `box-shadow: 0 10px 30px -4px rgba(15, 23, 42, 0.08)`
* **아바타 이미지**: `180px x 180px` 정원형, `4px solid #F8FAFC` 테두리
* **학부 뱃지**: `background: rgba(59, 130, 246, 0.08)`, `color: #3B82F6`, `border-radius: 20px`

### 5.2 프로젝트 카드 Grid & Hover (Project Card)
* **카드 비율**: 썸네일 `16:9` 비율 (높이 `180px`), 카드 본문 `padding: 24px`
* **호버 모션 (Soft Subdued Glow)**:
  * `transform: translateY(-6px)`
  * `border-color: rgba(59, 130, 246, 0.4)`
  * `box-shadow: 0 20px 40px -6px rgba(59, 130, 246, 0.15)`

### 5.3 상세 설명 모달 (Project Detail Modal)
* **오버레이 딤(Dim)**: `rgba(15, 23, 42, 0.6)`, `backdrop-filter: blur(10px)`
* **모달 윈도우**: 최대 너비 `680px`, `border-radius: 16px`
* **등장 애니메이션**: Scale Up `0.9 -> 1.0`, Fade In (`0.3s cubic-bezier(0.34, 1.56, 0.64, 1)`)

---

## 6. 🪄 그림자 & 모션 가이드 (Shadow & Motion Tokens)

```css
/* Elevation Shadows */
--shadow-subtle: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
--shadow-card: 0 10px 30px -4px rgba(15, 23, 42, 0.08);
--shadow-hover: 0 20px 40px -6px rgba(59, 130, 246, 0.15);
--glow-blue: 0 0 25px rgba(59, 130, 246, 0.25);

/* Timing & Easing */
--ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--duration-fast: 150ms;
--duration-normal: 300ms;
```

---

## 7. 💻 개발자 적용용 CSS 코드 변수 가이드

현재 프로젝트의 `css/main.css` 및 `css/components.css`에 위 디자인 규격이 정확히 매핑되어 있어, 필요 시 디자인 규격을 수정하는 것만으로 전체 포트폴리오 웹사이트의 비주얼 톤을 일관되게 제어할 수 있습니다.

> 본 디자인 가이드 문서는 `portfolio/design.md`로 정상 생성되었습니다.
