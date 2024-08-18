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
            keywords: ['blog', 'medium', 'posts', 'artigo', 'articles'],
            icon: '/static/icons/svg/blog.svg',
            perform: () => (window.location.pathname = '/pt-br/blog/')
        },
        {
            id: 'entregas',
            name: 'Entregas',
            shortcut: ['d'],
            keywords: ['delivery', 'entregas', 'company', 'clt', 'trabalhos'],
            icon: '/static/icons/svg/code.svg',
            perform: () => (window.location.pathname = '/pt-br/entregas/')
        },
        {
            id: 'github',
            name: 'GitHub',
            shortcut: ['g', 'h'],
            keywords: ['github', 'code', 'desenvolvimento', 'dev', 'js', 'javascript'],
            icon: '/static/icons/svg/github.svg',
            perform: () => (window.open('https://github.com/robsongajunior/', '_blank'))
        },
        {
            id: 'sobre',
            name: 'Sobre',
            shortcut: ['s'],
            keywords: ['sobre', 'robson junior', 'about', 'biografia', 'about'],
            icon: '/static/icons/svg/about.svg',
            perform: () => (window.location.pathname = '/pt-br/sobre/')
        },
        {
            id: 'palestras',
            name: 'Palestras',
            shortcut: ['t'],
            keywords: ['talks', 'palestras', 'apresentações', 'slides'],
            icon: '/static/icons/svg/speaker.svg',
            perform: () => (window.location.pathname = '/pt-br/palestras/')
        }
    ],

    en: [
        // {
        //     id: 'blog',
        //     name: 'Blog',
        //     shortcut: ['b'],
        //     keywords: ['blog', 'medium', 'posts'],
        //     icon: '/static/icons/svg/blog.svg',
        //     perform: () => (window.location.pathname = '/en/blog/')
        // },
        // {
        //     id: 'deliveries',
        //     name: 'Deliveries',
        //     shortcut: ['d'],
        //     keywords: ['delivery', 'deliveries', 'company', 'jobs', 'work'],
        //     icon: '/static/icons/svg/code.svg',
        //     perform: () => (window.location.pathname = '/en/deliveries/')
        // },
        {
            id: 'about',
            name: 'About',
            shortcut: ['a', 'me'],
            keywords: ['about', 'robson junior', 'me'],
            icon: '/static/icons/svg/about.svg',
            perform: () => (window.location.pathname = '/en/about/')
        },
        {
            id: 'github',
            name: 'GitHub',
            shortcut: ['g', 'h'],
            keywords: ['github', 'code', 'developing', 'dev'],
            icon: '/static/icons/svg/github.svg',
            perform: () => (window.open('https://github.com/robsongajunior/', '_blank'))
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
                        style={{background: active ? "var(--dark)" : "transparent"}}>

                        <span>
                            <img
                                src={ item.icon }
                                alt={ item.name }
                                width="24"
                                height="24"
                            />
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
        <div
            style={{
                position: 'relative',
                zIndex: '999'
            }}
        >
            <KBarProvider actions={actions[(props['lang'] === 'en') ? 'en' : 'ptbr']}>
                <KBarPortal>
                    <KBarPositioner className='kbarPositioner'>
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
        </div>
    )
}
