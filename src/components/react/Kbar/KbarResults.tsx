import { KBarResults, useMatches } from "kbar";

export default function RenderResults() {
    const { results } = useMatches();

    return (
        <KBarResults
            items={results}
            onRender={ ({ item, active }) =>
                typeof item === "string" ? (
                    <div className="kbar-item">
                        {item}
                    </div>
                ) : (
                    <div className="kbar-item"
                        style={{background: active ? "#07070A" : "transparent"}}
                    >
                        {item.name}
                    </div>
                )
            }
        />
    );
}
