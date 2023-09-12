import {
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch
} from "kbar";
import RenderResults from './KbarResults.tsx';

const actions = [
    {
        id: "blog",
        name: "Blog",
        shortcut: ["b"],
        keywords: "writing words",
        perform: () => (window.location.pathname = "blog")
    },
    {
        id: "contact",
        name: "Contact",
        shortcut: ["c"],
        keywords: "email",
        perform: () => (window.location.pathname = "contact")
    }
];

export default function Kbar() {
    return (
        <KBarProvider actions={actions}>
            <KBarPortal>
                <KBarPositioner>
                    <KBarAnimator>
                        <KBarSearch />
                        <RenderResults />
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
        </KBarProvider>
    )
}
