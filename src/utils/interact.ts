// import "dotenv/config";
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import contractABI from '../contract/contract-abi.json';
import contractABIPg from '../contract/contract-abi-pg.json';
import { AbiItem } from 'web3-utils';
import { Connection, txParams } from './types';
const contractAddress = '0x02D1633645f0fadB7A0b1C53aa1Cfeb2887C4EAb';
const contractAddressPolygon = '0x8C2319bad5D82F1461915f49d2be4C6D855DF315';

// const alchemyKey = import.meta.env.FRONTEND_ALCHEMY_API_KEY;
const alchemyKey =
  'https://eth-goerli.g.alchemy.com/v2/xA6-RGq2eOLubzK16DYGYJ63yk7WEi4s';
// console.log(alchemyKey);
const alchemyKeyPolygon =
  'https://polygon-mumbai.g.alchemy.com/v2/XpVas9V1Hegscve3yzbeLkF_n2h8v8Mb';
const web3 = createAlchemyWeb3(alchemyKey!);

export const fileStorageContract = new web3.eth.Contract(
  contractABI as AbiItem[],
  contractAddress
);

export const loadCurrentFile = async (address: string, cid: string) => {
  const txParams: txParams = {
    to: contractAddressPolygon,
    from: address,
    data: fileStorageContract.methods.addFile(cid).encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams],
    });
    console.log(`https://goerli.etherscan.io/tx/${txHash}`);
  } catch (err: any) {
    console.log(err.message);
  }
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArr = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const obj: Connection = {
        status: 'Connected',
        address: addressArr[0],
      };
      return obj;
    } catch (error: any) {
      return {
        status: error.message,
        address: '',
      };
    }
  } else {
    return {
      status: 'You should install Metamask',
      address: '',
    };
  }
};
export const getCurrentWalletConnected = () => {};

export const walletListener = () => {};
