import './PresaleForm.css'
import { Web3Button } from "@web3modal/react";

import { useAccount, useContractRead, useBalance, useContractReads, useNetwork,useContractWrite, useDisconnect,
         usePrepareContractWrite, useWaitForTransaction,useSwitchNetwork,erc20ABI as ERC20_ABI, useConnect } from "wagmi";

import { BigNumber, utils } from 'ethers';

import { useRef, useState,useEffect } from 'react';

import PRESALE_ABI from './PRESALE_ABI.json';

import {
  tokenDecimal,
  ETHChainId,
  tokenAddress,
  presaleAddress,

} from './config.js';

const PHASES = [
  {
    "name":"Phase1-OG",
    "hardcap":150,
    "price":0.0000045,
    "time":5*3600
  },
  {
    "name":"Phase1-OG",
    "hardcap":150,
    "price":0.0000045,
    "time":5*3600
  },
  {
    "name":"Phase2-Frens",
    "hardcap":150,
    "price":0.0000065,
    "time":12*3600
  },
  {
    "name":"Phase3-Public",
    "hardcap":444,
    "price":0.00001,
    "time":96*3600
  }
]

const PresaleForm = () => {
  const [amount, setAmount] = useState('0.1');
  const [bandyAmount, setBANDYAmount] = useState('22222.22');

  const {  address : account, isConnecting, isDisconnected,isConnected } = useAccount()
  const { connect, connectors, isLoading, pendingConnector } = useConnect()
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()

  const toBN = (amount, decimal) => {
    if (amount === '') {
      return 0
    } else {
      return utils.parseUnits(amount, decimal)
    }
  }

  const { data: balanceToken } = useContractRead({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    enabled: !!account, 
    args: [account],
    watch: true,
    chainId : ETHChainId
  })
  console.log("token balance", balanceToken)

  const { data: startTime } = useContractRead({
    address: presaleAddress,
    abi: PRESALE_ABI,
    functionName: "startTime",
    enabled: true, 
    watch: true,
    chainId : ETHChainId
  })

  console.log("start time = ", startTime)
  
  let currentPhase = 0
  const { data: phase } = useContractRead({
    address: presaleAddress,
    abi: PRESALE_ABI,
    functionName: "getCurrentPhase",
    enabled: true, 
    watch: true,
    chainId : ETHChainId
  })

  if (phase != undefined) {
    currentPhase = phase
  }
  // const currentPhase = 3;
  console.log("current phase = ", currentPhase)

  const { data: balanceETH, isError } = useBalance({
    address: presaleAddress,
    chainId: ETHChainId,
    enabled: true
  })

  const { data: walletBalance } = useBalance({
    address: account,
    chainId: ETHChainId,
    enabled: !!account
  })

  console.log("wallet balance = ", walletBalance?.formatted)

  const { config: buyWithEth, isLoading: loading_ } = usePrepareContractWrite({
    address: presaleAddress,
    abi: PRESALE_ABI,
    functionName: "buyTokensWithETH",
    overrides: { value: amount && utils.parseUnits(amount, 18) },
    enabled: !!account && chain?.id == ETHChainId
  })
  
  console.log("value", utils.parseUnits(amount, 18).toString())
  console.log("loading...", loading_)
  console.log("Is connected ? ", isConnected)
  
  const { data: buyWithEthData, write: buyWithEthFn, reset : buyWithEthReset } = useContractWrite(
    buyWithEth
  )
  console.log("write", buyWithEthFn)
  const { status: buyWithEthStatus } = useWaitForTransaction({
    hash: buyWithEthData?.hash
  })

  console.log("status = ", buyWithEthStatus)
  useEffect(() => {
    if (buyWithEthStatus == "success") {
      buyWithEthReset()
    } else if(buyWithEthStatus == "loading"){
    }
  }, [buyWithEthStatus])

  useEffect(() => {
    setBANDYAmount(Math.round(amount / PHASES[currentPhase].price));
  }, [amount])

  useEffect(() => {
    if (!!account ) {
      if(chain?.id != ETHChainId){
        switchNetwork?.(ETHChainId)
      }
    }
  }, [])

  useEffect(() => {
    if (!!account ) {
      if(chain?.id != ETHChainId){
        switchNetwork?.(ETHChainId)
      }
    }
  }, [chain?.id])

  const [countdown, setCountdown] = useState({
      alive: true,
      // days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
  })

  const getCountdown = (deadline) => {
      const now = Date.now() / 1000;
      const total = deadline - now;
      const seconds = Math.floor((total) % 60);
      const minutes = Math.floor((total / 60) % 60);
      const hours = Math.floor((total / (60 * 60)));
      // const days = Math.floor(total / (60 * 60 * 24));

      return {
          total,
          // days,
          hours,
          minutes,
          seconds
      };
  }

  useEffect(() => {
      const interval = setInterval(() => {
        let deadline = Number(startTime);

        for (let index = 1; index <= currentPhase; index++) {
          deadline += PHASES[index].time;
        }

        console.log("deadline", deadline)

          try {
              const data = getCountdown(deadline)
              setCountdown({
                  alive: data.total > 0,
                  // days: data.days,
                  hours: data.hours,
                  minutes: data.minutes,
                  seconds: data.seconds
              })
          } catch (err) {
              console.log(err);
          }
      }, 1000);

      return () => clearInterval(interval);
  }, [])

  function maxInput () {
    Math.min(10, )
    const formattedEth = (Number(walletBalance?.formatted) - 0.005).toFixed(3)
    if (formattedEth < 0) {
      setAmount('0')
    } else {
      setAmount(formattedEth)
    }
  }

  return <div className="presaleform">
    <div className='presaleform__form'>
      <h3 id='earlybirdround'>{PHASES[currentPhase].name}</h3>

      <div className="presaleform__form-pwrapper">
        <div className="presaleform__bar">
          <span className='presaleform__bar-progress' style={{width: `${parseInt(Number(balanceETH?.formatted) / PHASES[currentPhase].hardcap)}%`}}></span>
          {/* <span className={`presaleform__bar-progress w-[${parseInt(Number(balanceETH?.formatted) / PHASES[currentPhase].hardcap)}%]`}></span> */}
          <div className='presaleform__bar-label'>{parseInt(Number(balanceETH?.formatted) / PHASES[currentPhase].hardcap)}%</div>
        </div>
        <p className='presaleform__p-bold'>{`${Number(balanceETH?.formatted)?.toFixed(2)} / 150 ETH`}</p>

        {countdown.alive &&
        <h2 style={{textAlign: "center", color: "red", fontSize: "24px"}}>
          {`${countdown.hours} Hours, ${countdown.minutes} Mins & ${countdown.seconds} Secs`}
        </h2>
        }
      </div>
      
      <p className='presaleform__p-bold'>{`Your Purchased $BANDY = ${balanceToken && utils.formatUnits(balanceToken, tokenDecimal)}`}</p>
      {/* <p id='fr-disclaimer'>*First round ETH only*</p> */}
      <p id='priceoutof1'>1 BANDY = {PHASES[currentPhase].price} ETH</p>

      <div className="presaleform__form-inputwrapper">
        <div className="presaleform__fullinput">
          <input type='number' className='presaleform__input' name="usdc-input" onChange={(e) => {setAmount(e.target.value)}} value={amount}></input>
          <label className='presaleform__min' onClick={() => {setAmount("0.1")}}>MIN</label>
          <label className='presaleform__max' onClick={() => {maxInput()}}>MAX</label>
          <label className='presaleform__label' htmlFor="usdc-input">ETH</label>
        </div>

        <div className="presaleform__fullinput">
          <input id='bandy-input' disabled type='number' className='presaleform__input' name="bandy-input" value={bandyAmount}></input>
          <label className='presaleform__label' htmlFor="bandy-input">BANDY</label>
        </div>
      </div>

      <div className="presaleform__form-pwrapper">
        <p className='presaleform__p-bold'>**Min Buy: 0.1 ETH, Max Buy: 10 ETH**</p>
        {amount > walletBalance?.formatted &&
          <p className='presaleform__p-bold text-yellow-300 pt-3 font-light'>You don't have enough ETH</p>
        }
      </div>

      {!account ? (
        <>
          <Web3Button className="web3button" icon='hide' label='Connect Wallet' balance='hide'/>
        </>
      ) : (
        <>
          <button
            type="button"
            disabled={!buyWithEthFn}
            className="presaleform__buynowbtn btn-3"
            onClick={() => buyWithEthFn()}
          >
            BUY $BANDY

            &nbsp;
            {buyWithEthStatus == "loading" &&
            <svg
            aria-hidden="true"
            role="status"
            className="inline w-6 h-6 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
            }

        </button>
        </>
      )}
    </div>
  </div>;
};

export default PresaleForm;
