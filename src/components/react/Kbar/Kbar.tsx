import {
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch
} from "kbar";
import RenderResults from './KbarResults.tsx';
import './kbar.scss';

const actions = [
    {
        id: "blog",
        name: "Blog",
        shortcut: ["b"],
        keywords: "blog",
        perform: () => (window.location.href = "https://robsongajunior.medium.com/")
    },
    {
        id: "github",
        name: "Github",
        shortcut: ['g'],
        keywords: "github",
        perform: () => (window.location.href = "https://github.com/robsongajunior")
    },
    {
        id: "sobre",
        name: "Sobre",
        shortcut: ["s"],
        keywords: "sobre",
        perform: () => (window.location.pathname = "sobre/")
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
                            <RenderResults />
                        </div>
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
        </KBarProvider>
    )
}
