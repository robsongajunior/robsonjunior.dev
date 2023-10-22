import { useKBar } from 'kbar';

export default function KbarButton() {
    const { query } = useKBar()
    // const [mounted, setMounted] = useState(false);
    // const { results, query } = useMatches();

    // console.log(query);
    // console.log(results);

    // useEffect(() => {
    //     setMounted(true)
    // }, [])

    return (
        <>
            <button onClick={() => console.log(query) }>
                kbar
            </button>
        </>
    )
};

