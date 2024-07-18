import { get20updates, set20UpdatesApi } from "@/store/selectedCryptoSlice";
import { useAppDispatch, useAppSelector, valueOfCrypto } from "@/utils/utils";
import { useEffect } from "react";
import Loader from "./Loader";

const Table = () => {

    const id = useAppSelector(state => state.selectedCrypto.id)
    const updates20 = useAppSelector(get20updates);
    const dispatch = useAppDispatch()
    const loading = useAppSelector(state => state.selectedCrypto.loading)

    useEffect(() => {
        dispatch(set20UpdatesApi(id))
        setInterval(function call() {
            dispatch(set20UpdatesApi(id))
        }, 60 * 1000)
    }, [])

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Time</th>
                        <th>in USD</th>
                        <th>in INR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {loading && <Loader />}
                        </td>
                    </tr>
                    {updates20.map((item: valueOfCrypto, index: number) => {
                        const date = new Date(item.createdAt)
                        return (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{date.toLocaleTimeString()}</td>
                                <td>{item.usd}</td>
                                <td>{item.inr}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table;