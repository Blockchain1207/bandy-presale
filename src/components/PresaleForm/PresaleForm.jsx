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


const PresaleForm = () => {
  const [amount, setAmount] = useState('0.1');
  const [soonAmount, setBANDYAmount] = useState('22222.22');

  const [buyMethod, setBuyMethod] = useState("eth")
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

  const { config: buyWithEth } = usePrepareContractWrite({
    address: presaleAddress,
    abi: PRESALE_ABI,
    functionName: "buyTokensWithETH",
    overrides: { value: amount },
    enabled: !!account && chain?.id == ETHChainId && !!amount
  })

  const { data: buyWithEthData, write: buyWithEthFn, reset : buyWithEthReset } = useContractWrite(
    buyWithEth
  )

  const { status: buyWithEthStatus } = useWaitForTransaction({
    hash: buyWithEthData?.hash
  })

  const handleInput = (e) => {
    // console.log("target value", e.target.value);
    let v = e.target.value;

    setAmount(v);
    if (v) {
      setBANDYAmount(Math.round(v / 0.00001));
    } else {
      setBANDYAmount(v);
    }

  }

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

  // console.log("ACC", account);
  // console.log("A_ETH", allowanceUsdc);
  // console.log("P_TOKEN", balanceToken?.toString());
  console.log("F_ETH", balanceETH?.formatted);
  // console.log("%%%", parseInt(utils.formatUnits(balanceETH, usdcDecimal-2) / 10504441))

  return <div className="presaleform">
    <div className='presaleform__form'>
      <h3 id='earlybirdround'>Phase 1 (OG)</h3>

      <div className="presaleform__form-pwrapper">
        <div className="presaleform__bar">
          {/* <span className={`presaleform__bar-progress w-[${balanceETH && parseInt(utils.formatUnits(balanceETH, usdcDecimal-2) / 10504441)}%]`}></span> */}
          <span className={`presaleform__bar-progress w-[40%]`}></span>
          <div className='presaleform__bar-label'>40%</div>
        </div>
        <p className='presaleform__p-bold'>{`${Number(balanceETH?.formatted)?.toFixed(2)} / 150 ETH`}</p>
      </div>
      
      <p className='presaleform__p-bold'>{`Your Purchased $BANDY = ${balanceToken && utils.formatUnits(balanceToken, tokenDecimal)}`}</p>
      {/* <p id='fr-disclaimer'>*First round ETH only*</p> */}
      <p id='priceoutof1'>1 BANDY = 0.0000045 ETH</p>

      <div className="presaleform__form-inputwrapper">
        <div className="presaleform__fullinput">
          <input type='number' className='presaleform__input' name="usdc-input" onChange={handleInput} value={amount}></input>
          <label className='presaleform__min' htmlFor="usdc-input">MIN</label>
          <label className='presaleform__max' htmlFor="usdc-input">MAX</label>
          <label className='presaleform__label' htmlFor="usdc-input">ETH</label>
        </div>

        <div className="presaleform__fullinput">
          <input id='soon-input' disabled type='number' className='presaleform__input' name="soon-input" value={soonAmount}></input>
          <label className='presaleform__label' htmlFor="soon-input">BANDY</label>
        </div>
      </div>

      <div className="presaleform__form-pwrapper">
        <p className='presaleform__p-bold'>**Min Buy: 0.1 ETH, Max Buy: 10 ETH**</p>
        <p className='presaleform__p-bold'>LIMITED TO FIRST 100 SPOTS</p>
      </div>

      {!account ? (
        <>
          <Web3Button className="web3button" icon='hide' label='Connect Wallet' balance='hide'/>
        </>
      ) : (
        <>
          {buyMethod == "eth" && (
            <button
            type="button"
            className="presaleform__buynowbtn"
            onClick={() => buyWithEthFn()}
            >
            BUY $BANDY
          </button>
          )}
        </>
      )}
    </div>
  </div>;
};

export default PresaleForm;
