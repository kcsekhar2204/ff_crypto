import { listOfCrypto } from "@/store/cryptoListSlice";
import { openModal, useAppDispatch, useAppSelector } from "@/utils/utils";
import Image from "next/image";

const Header = () => {

    const modal_id = "my_modal"
    const selectedCryptoImg = useAppSelector(state => state.selectedCrypto.image)
    const dispatch = useAppDispatch()

    return (
        <div className="navbar bg-base-100 lg:px-8">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">FF Crypto</a>
            </div>
            <div 
                role="button" 
                className="btn btn-ghost btn-circle avatar" 
                onClick={() => {
                        openModal(modal_id)
                        dispatch(listOfCrypto())
                    }
                }
            >
                <div className="w-10 rounded-full shadow shadow-base-content">
                    <Image
                        alt="Selected Crypto"
                        src={selectedCryptoImg}
                        width={40}
                        height={40}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header;