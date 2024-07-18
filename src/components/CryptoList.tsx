import { set20UpdatesApi, setSelectedCrypto } from "@/store/selectedCryptoSlice";
import { closeModal, imageMap, useAppDispatch, useAppSelector } from "@/utils/utils";
import React from "react";
import Loader from "./Loader";

interface ChildProps {
    id: string,
}

const CryptoList: React.FC<ChildProps> = ({ id }) => {

    const loading = useAppSelector(state => state.coinList.loading)
    const cryptoList = useAppSelector(state => state.coinList.coins)
    const dispatch = useAppDispatch()

    return (
        <div className="overflow-x-auto">
            <h3 className="font-bold text-lg mb-3">Select Crypto</h3>
            <table className="table table-zebra">
                <tbody>
                    <tr>
                        <td>
                            {loading && <Loader />}
                        </td>
                    </tr>
                    {
                        cryptoList.map((item, index) => {
                            return (
                                <tr key={index} onClick={() => {
                                    dispatch(setSelectedCrypto(item))
                                    dispatch(set20UpdatesApi(item.id))
                                    closeModal(id)
                                }}>
                                    <td>
                                        <div className="flex items-center justify-start gap-3 btn btn-ghost">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={imageMap[item.id]}
                                                        alt={item.name} />
                                                </div>
                                            </div>
                                            <div className="grid  grid-cols-3 gap-4">
                                                <span className="font-bold uppercase">{item.name}</span>
                                                <span className="text-sm opacity-50">USD {item.current_price}</span>
                                                <span className="text-sm opacity-50">{item.price_change_percentage_24h} %</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default CryptoList;