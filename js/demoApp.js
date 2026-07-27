/**
 * UI 컴포넌트 데모 쇼케이스 어플리케이션 (js/demoApp.js)
 * 독립적으로 모듈화된 UI 컴포넌트(Button, Badge, Card, ModalComponent, AdminModal, Toast)의 렌더링 및 인터랙션을 테스트합니다.
 * 모든 주석은 한글로 작성되었습니다.
 */
import { Button } from './components/Button.js';
import { Badge } from './components/Badge.js';
import { Card } from './components/Card.js';
import { ModalComponent } from './components/ModalComponent.js';
import { AdminModal } from './components/AdminModal.js';
import { Toast } from './components/Toast.js';

class DemoApp {
    constructor() {
        this.initModules();
        this.renderButtons();
        this.renderBadges();
        this.renderCards();
        this.renderInteractiveTriggers();
    }

    /**
     * 모달 및 관리자 모듈 참조 초기화
     */
    initModules() {
        const modalOverlay = document.getElementById('projectModalOverlay');
        if (modalOverlay) {
            this.modal = new ModalComponent(modalOverlay);
            this.adminModal = new AdminModal(modalOverlay, () => {
                if (this.toast) this.toast.show('✨ 관리자 페이지 데이터가 업데이트되었습니다.');
            });
        }

        const toastEl = document.getElementById('toastNotification');
        const toastMsgEl = document.getElementById('toastMessage');
        if (toastEl && toastMsgEl) {
            this.toast = new Toast(toastEl, toastMsgEl);
        }
    }

    /**
     * 1. 버튼 컴포넌트(Button.js) 바리에이션 및 크기 테스트 렌더링
     */
    renderButtons() {
        const btnPrimary = new Button({ text: 'Primary Button', variant: 'primary', icon: '🚀' }).render();
        const btnSecondary = new Button({ text: 'Secondary Button', variant: 'secondary', icon: '🔍' }).render();
        const btnAccent = new Button({ text: 'Accent Button', variant: 'accent', icon: '⚡' }).render();
        const btnGhostDark = new Button({ text: 'Ghost Dark Button', variant: 'ghost-dark', icon: '✉️' }).render();

        document.getElementById('btnVariantPrimary')?.appendChild(btnPrimary);
        document.getElementById('btnVariantSecondary')?.appendChild(btnSecondary);
        document.getElementById('btnVariantAccent')?.appendChild(btnAccent);
        document.getElementById('btnGhostDark')?.appendChild(btnGhostDark);

        const btnLg = new Button({ text: 'Large Size (48px)', variant: 'primary', size: 'lg' }).render();
        const btnMd = new Button({ text: 'Medium Size (40px)', variant: 'primary', size: 'md' }).render();
        const btnSm = new Button({ text: 'Small Size (32px)', variant: 'primary', size: 'sm' }).render();

        document.getElementById('btnSizeLg')?.appendChild(btnLg);
        document.getElementById('btnSizeMd')?.appendChild(btnMd);
        document.getElementById('btnSizeSm')?.appendChild(btnSm);

        let count = 0;
        const interactiveBtn = new Button({
            text: '클릭 수 카운터: 0',
            variant: 'accent',
            size: 'md',
            icon: '✨',
            onClick: (e) => {
                count++;
                e.currentTarget.querySelector('span:last-child').textContent = `클릭 수 카운터: ${count}`;
                if (this.toast) {
                    this.toast.show(`🎉 버튼을 ${count}회 클릭하셨습니다!`);
                }
            }
        }).render();

        document.getElementById('btnInteractive')?.appendChild(interactiveBtn);
    }

    /**
     * 2. 뱃지 및 태그 컴포넌트(Badge.js) 테스트 렌더링
     */
    renderBadges() {
        const badgeBlue = new Badge({ text: 'HUFS Language & AI', variant: 'blue', icon: '🎓' }).render();
        const badgeIndigo = new Badge({ text: 'Vibe Coding Lab', variant: 'indigo', icon: '⚡' }).render();
        const badgePurple = new Badge({ text: 'AI Trend Radar', variant: 'purple', icon: '🤖' }).render();
        const badgeEmerald = new Badge({ text: 'Live Demo Active', variant: 'emerald', icon: '🟢' }).render();

        document.getElementById('badgeBlue')?.appendChild(badgeBlue);
        document.getElementById('badgeIndigo')?.appendChild(badgeIndigo);
        document.getElementById('badgePurple')?.appendChild(badgePurple);
        document.getElementById('badgeEmerald')?.appendChild(badgeEmerald);

        const tags = ['Gemini API', 'Vibe Coding', 'Inter Font', 'Sharp Elegant Style', 'Canvas Particles'];
        const tagContainer = document.getElementById('techTagContainer');
        if (tagContainer) {
            tagContainer.innerHTML = tags.map(t => Badge.createTagHtml(t)).join('');
        }

        const filterContainer = document.getElementById('demoFilterPills');
        if (filterContainer) {
            filterContainer.innerHTML = `
                <button class="filter-pill active">✨ 전체 (All)</button>
                <button class="filter-pill">🤖 LLM / AI 웹앱</button>
                <button class="filter-pill">🗣️ Language & NLP</button>
            `;
        }
    }

    /**
     * 3. 카드 컴포넌트(Card.js) 샘플 렌더링
     */
    renderCards() {
        const sampleProject = {
            id: 'demo-fortune',
            title: '신비로운 포춘쿠키 (Mystic Fortune)',
            categoryLabel: '🤖 LLM / AI 웹앱',
            summary: '3D 쪼개짐 애니메이션과 사운드 효과가 결합된 인터랙티브 운세 웹앱',
            thumbnail: 'assets/images/project_fortune.svg',
            demoUrl: '../fortune-cookie-app/index.html',
            githubUrl: 'https://github.com',
            tags: ['Vanilla JS', 'Web Audio API', 'CSS 3D'],
            vibeStory: 'design.md 가이드 기반 컴포넌트 모듈화로 구축된 샘플 카드입니다.',
            features: ['3D 포춘쿠키 균열 및 분리 애니메이션', '합성 사운드 효과', '보관함 기능']
        };

        const cardContainer = document.getElementById('demoCardContainer');
        if (cardContainer) {
            const cardNode = Card.createProjectCard(sampleProject, (project) => {
                if (this.modal) this.modal.open(project);
            });
            cardContainer.appendChild(cardNode);
        }
    }

    /**
     * 4. 모달, 관리자 페이지 & 토스트 트리거 버튼 렌더링
     */
    renderInteractiveTriggers() {
        const modalTriggerBtn = new Button({
            text: '🪟 상세 모달 열기 테스트',
            variant: 'primary',
            size: 'lg',
            icon: '🔍',
            onClick: () => {
                if (this.modal) {
                    this.modal.open({
                        title: 'UI 디자인 시스템 모달 테스트',
                        categoryLabel: '✨ Component Modal',
                        summary: '모듈화된 ModalComponent가 정상적으로 구동되고 있습니다.',
                        thumbnail: 'assets/images/project_vibe.svg',
                        demoUrl: '#',
                        githubUrl: 'https://github.com',
                        vibeStory: 'design.md 디자인 토큰을 사용하여 구축된 독립 모달 팝업입니다.',
                        features: ['Esc 키 입력 시 닫기', '배경 클릭 시 닫기', '스크롤 방지 고정'],
                        tags: ['ModalComponent.js', 'Backdrop Blur', 'design.md']
                    });
                }
            }
        }).render();

        const adminTriggerBtn = new Button({
            text: '🔐 관리자 로그인 모달 테스트',
            variant: 'secondary',
            size: 'lg',
            icon: '⚙️',
            onClick: () => {
                if (this.adminModal) this.adminModal.open();
            }
        }).render();

        const toastTriggerBtn = new Button({
            text: '💬 토스트 알림 실행 테스트',
            variant: 'accent',
            size: 'lg',
            icon: '🔔',
            onClick: () => {
                if (this.toast) {
                    this.toast.show('✨ Toast.js 독립 컴포넌트가 활성화되었습니다!');
                }
            }
        }).render();

        document.getElementById('btnTriggerModal')?.appendChild(modalTriggerBtn);
        document.getElementById('btnTriggerAdmin')?.appendChild(adminTriggerBtn);
        document.getElementById('btnTriggerToast')?.appendChild(toastTriggerBtn);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.demoApp = new DemoApp();
});
