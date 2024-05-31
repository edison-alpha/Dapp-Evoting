import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import img from "../img/Poll.gif"
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VoteArea = () => {
  const { provider, contract } = useContext(AuthContext);
  const [candidates, setCandidates] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCandidates = async () => {
      try {
        const signer = contract.connect(provider.getSigner());
        const cand = await signer.getCandidate();
        // console.log(cand);
        setCandidates(cand);
      } catch (error) {
        console.log(error)
      }
    }
    getCandidates();
  }, [])


  const addYourVote = async (candidate_id) => {
    try {
      setIsLoading(true);
      const signer = contract.connect(provider.getSigner());
      const res = await signer.addVote(candidate_id);
      setIsLoading(false);
      toast.success('You casted your vote !', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.data.message, {
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

  return (
    <div>
      <ToastContainer />
      {isLoading && <Loader />}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Voting is live now!</h1>
            <p className="mt-2 text-sm text-gray-700">
              Click on vote button and caste your vote, Choose your leader wisely.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 p-5'>
          {
            candidates?.map((item, i) => {
              return (
                <div className='flex flex-row justify-between items-center px-12 py-5 bg-gray-100 drop-shadow-xl rounded-[10px]'>
                  <div className=''>
                    <img className='h-24 rounded-[50px]' src={`https://ipfs.io/ipfs/${item.candidate_img}`} alt="" />
                  </div>
                  <div className=''>
                    <div className='mt-2'>
                      <p><span className='text-xs'>Name : </span> <span className='font-semibold'>{item.candidate_name}</span> </p>
                      <p>
                        <span className='text-xs'>Party Name : </span>
                        <span className='font-semibold'>{item.candidate_partyName}</span>
                      </p>
                      <button
                        type="button"
                        onClick={() => addYourVote(item.candidate_id.toNumber())}
                        className="mt-5 inline-flex items-center rounded border border-transparent bg-white border-[#3ed0d9] px-5 py-1.5 text-xs font-medium text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3ed0d9] focus:ring-offset-2"
                      >
                        <span className='text-lg font-semibold'>Vote</span>
                        <img src={img} className="h-8" alt="" />
                      </button>
                    </div>
                  </div>

                  <img className='h-12 absolute bottom-[-10px] right-0 h-12 rounded-[50px]' src={`https://ipfs.io/ipfs/${item.candidate_partyLogo}`} alt="" />
                </div>
              )
            })
          }
          {candidates?.length == 0 && <p>Voting is not started !</p>}
        </div>
      </div>
    </div >
  )
}

export default VoteArea
