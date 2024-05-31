import { createContext, useEffect, useState } from "react";
import OnlineVoting from "../artifacts/contracts/OnlineVoting.sol/OnlineVoting.json"
import { ethers } from "ethers"
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const [adminAccount, setAdminAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [connected, setConnected] = useState(false)
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const connectAccount = () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const loadProvider = async () => {
                if (provider) {
                    window.ethereum.on("chainChanged", () => {
                        window.location.reload();
                    });

                    window.ethereum.on("accountsChanged", () => {
                        window.location.reload();
                    });

                    await provider.send("eth_requestAccounts", [])
                    const signer = provider.getSigner();
                    const address = await signer.getAddress();
                    setAccount(address);
                    let contractAddress = "0xcC4358E502c270F325559380A21f8351FC2eeF39";

                    const contract = new ethers.Contract(
                        contractAddress, OnlineVoting.abi, signer
                    )
                    // get all candidates;
                    // console.log(contract)
                    const ownerSigner = contract.connect(provider.getSigner());
                    const admin = await ownerSigner.getOwner();
                    console.log("owner", admin);
                    setAdminAccount(admin);
                    setContract(contract);
                    setProvider(provider)
                    setConnected(true);
                } else {
                    console.error("Metamask is not connected!");
                }
            }

            provider && loadProvider();
        }
        connectAccount();
    }, [])

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user)
        });

        return () => {
            unsub();
        };
    }, []);


    return (
        <AuthContext.Provider value={{ connected, contract, account, provider, adminAccount, setCurrentUser, currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};