import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from "buffer"
import { create as ipfsClient } from "ipfs-http-client"

const projectId = '2KKbUUpZwNEptMZKTCMn6DbRkbn';
const projectSecret = '62a1c456aa1126059720fa4ab67ce4a6';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

const AddCandidate = () => {
    const { contract, account, provider } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({
        name: "",
        partyName: "",
        age: "",
        cPic: "",
        pPic: "",
    })

    const fieldValidation = () => {
        if (!values.name || !values.partyName || !values.age) {
            toast.warn("Please fill all the fields!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return true;
        }

        return false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(values);
        if (fieldValidation()) {
            return;
        }
        try {
            setIsLoading(true);
            const signer = contract.connect(provider.getSigner());
            const res = await signer.addCandidate(values.name, values.age, values.partyName, values.pPic, values.cPic);
            // console.log(res)
            toast.success('Candidate added succesfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setIsLoading(false)
        } catch (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    const captureCandidateFile = async (e) => {
        const data = e.target.files[0]; //files array of files object
        setIsLoading(true);
        try {
            const add = await client.add(data);
            setValues(prev => ({ ...prev, cPic: add.path }))
            setIsLoading(false);
            toast.success('Candidate Photo Uploaded!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (e) {
            alert("Unable to upload image to Pinata");
            setIsLoading(false);
        }
    };

    const capturePartyLogo = async (e) => {
        const data = e.target.files[0]; //files array of files object
        setIsLoading(true);
        try {
            const add = await client.add(data);
            setValues(prev => ({ ...prev, pPic: add.path }))
            setIsLoading(false);
            toast.success('Party Logo Uploaded!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (e) {
            alert("Unable to upload image to IPFS");
            setIsLoading(false);
        }
    };

    return (
        <div>
            <ToastContainer />
            {isLoading && <Loader />}
            <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0 drop-shadow-lg ">
                <form action="#" method="POST">
                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                        <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Candidate Information</h3>
                                <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can recieve mail.</p>
                            </div>

                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        onChange={(e) => setValues(prev => ({ ...prev, name: e.target.value }))}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                        Party name
                                    </label>
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        onChange={(e) => setValues(prev => ({ ...prev, partyName: e.target.value }))}
                                    />
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                        Age
                                    </label>
                                    <input
                                        type="text"
                                        name="email-address"
                                        id="email-address"
                                        autoComplete="email"
                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        onChange={(e) => setValues(prev => ({ ...prev, age: e.target.value }))}
                                    />
                                </div>
                                <div className='col-span-12 sm:col-span-6'>
                                    <div className='mb-4'>
                                        <p className='italic text-xs'>Upload Candidate Image</p>
                                        <input onChange={captureCandidateFile} type="file" name="" id="" />
                                    </div>
                                    <div>
                                        <p className='italic text-xs'>Upload Party Logo</p>
                                        <input onChange={capturePartyLogo} type="file" name="" id="" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="inline-flex justify-center rounded-md border border-transparent bg-[#33c94a] py-2 px-4 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default AddCandidate
