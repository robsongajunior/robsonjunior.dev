import {
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch
} from 'kbar';
import KbarRenderResults from './KbarRenderResults.jsx';
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

export default function Kbar() {
    return (
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
    )
}
