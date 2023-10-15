import { useKBar } from 'kbar';

export default function KbarButtonHook() {
    const { query } = useKBar();

    return <button onClick={query.toogle}>toogle</button>
}
