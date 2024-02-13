import './kbar.scss';
import {
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
    KBarResults,
    useMatches
} from 'kbar';

const actions = {
    ptbr: [
        {
            id: 'blog',
            name: 'Blog',
            shortcut: ['b'],
            keywords: ['blog', 'medium', 'posts'],
            icon: '/static/icons/svg/blog.svg',
            perform: () => (window.location.pathname = '/pt-br/blog/')
        },
        {
            id: 'github',
            name: 'GitHub',
            shortcut: ['g', 'h'],
            keywords: ['github', 'code', 'desenvolvimento', 'dev'],
            icon: '/static/icons/svg/github.svg',
            perform: () => (window.open('https://github.com/robsongajunior/', '_blank'))
        },
        {
            id: 'sobre',
            name: 'Sobre',
            shortcut: ['s'],
            keywords: ['sobre', 'robson junior', 'about'],
            icon: '/static/icons/svg/about.svg',
            perform: () => (window.location.pathname = '/pt-br/sobre/')
        }
    ],

    en: [
        {
            id: 'blog',
            name: 'Blog',
            shortcut: ['b'],
            keywords: ['blog', 'medium', 'posts'],
            icon: '/static/icons/svg/blog.svg',
            perform: () => (window.location.pathname = '/en/blog/')
        },
        {
            id: 'github',
            name: 'GitHub',
            shortcut: ['g', 'h'],
            keywords: ['github', 'code', 'developing', 'dev'],
            icon: '/static/icons/svg/github.svg',
            perform: () => (window.open('https://github.com/robsongajunior/', '_blank'))
        },
        {
            id: 'about',
            name: 'About',
            shortcut: ['a', 'me'],
            keywords: ['about', 'robson junior', 'me'],
            icon: '/static/icons/svg/about.svg',
            perform: () => (window.location.pathname = '/en/about/')
        }
    ],
};

function KbarRenderResults() {
    const { results } = useMatches();

    return (
        <KBarResults
            items={results}
            onRender={ ({ item, active }) =>
                typeof item === "string" ? (
                    <div className="kbar-item">
                        { item }
                    </div>
                ) : (
                    <div
                        className="kbar-item"
                        style={{background: active ? "#07070A" : "transparent"}}>

                        <span>
                            <img src={ item.icon } alt={ item.name } width="24" height="24"/>
                            { item.name }
                        </span>
                        <i style={{ display: active ? "block" : "none" }}>→</i>
                    </div>
                )
            }
        />
    );
}

export default function Kbar(props) {
    return (
        <>
            <KBarProvider actions={actions[(props[':lang'] === 'en') ? 'en' : 'ptbr']}>
                <KBarPortal>
                    <KBarPositioner>
                        <KBarAnimator>
                            <div className="kbar-search-content">
                                <KBarSearch />
                            </div>
                            <div className="kbar-results-content">
                                <KbarRenderResults />
                            </div>
                        </KBarAnimator>
                    </KBarPositioner>
                </KBarPortal>
            </KBarProvider>
        </>
    )
}
