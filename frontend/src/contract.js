import { ethers } from "ethers";

const contractAddress = "0xb588a8A3002DBeA51E9dF6A087C5F3DEA9C936Dd";

const abi = [
  "function recordStudy() public",
  "function recordWork() public",
  "function recordExercise() public",
  "function recordLeisure() public",
  "function studyCount() view returns(uint)",
  "function workCount() view returns(uint)",
  "function exerciseCount() view returns(uint)",
  "function leisureCount() view returns(uint)"
];

export async function getContract(){

  const provider = new ethers.BrowserProvider(window.ethereum);

  const signer = await provider.getSigner();

  const contract = new ethers.Contract(contractAddress, abi, signer);

  return contract;
}