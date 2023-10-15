import { useKBar } from 'kbar';

export default function KbarButtonHook() {
    const { query, disabled } = useKBar(state => ({
        disabled: state.disabled
    }));

    return <button onClick={() => query.disable(!disabled)}>{disabled ? "Disabled" : "Disable"}</button>
}
