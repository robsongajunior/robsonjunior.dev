import { KBarProvider, KBarPortal, KBarPositioner, KBarAnimator, KBarSearch, KBarResults, useMatches, useKBar } from 'kbar';
import './kbar.scss';


const actions = [
    {
        id: 'blog',
        name: 'Blog',
        shortcut: ['b'],
        keywords: 'blog',
        icon: '/static/icons/svg/blog.svg',
        perform: () => (window.open('https://robsongajunior.medium.com/', '_blank'))
    },
    {
        id: 'github',
        name: 'GitHub',
        shortcut: ['g', 'h'],
        keywords: 'GitHub profile',
        icon: '/static/icons/svg/github.svg',
        perform: () => (window.open('https://github.com/robsongajunior/', '_blank'))
    },
    {
        id: 'sobre',
        name: 'Sobre',
        shortcut: ['s'],
        keywords: 'sobre',
        icon: '/static/icons/svg/about.svg',
        perform: () => (window.location.pathname = '/sobre/')
    }
];

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

export default function Kbar() {
    return (
        <>
            <KBarProvider actions={actions}>
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
