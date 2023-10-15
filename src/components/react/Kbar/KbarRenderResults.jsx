import { KBarResults, useMatches, useKBar } from "kbar";

export default function KbarRenderResults() {
    const { results } = useMatches();
    // const { query, disabled } = useKBar(state => ({
    //     disabled: state.disabled
    // }));

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
