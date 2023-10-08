import { useKbar } from "kbar";

export default function KbarButtonHook() {
  const { query, disabled } = useKbar(state => ({
    disabled: state.disabled
  }));

  return <button onClick={() => query.disable(!disabled)}>{disabled ? "Disabled" : "Disable"}</button>
}
