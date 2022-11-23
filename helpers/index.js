import  ethers  from "ethers"
export const helper ={
   connect(){
    const provider = new ethers.providers.JsonRpcProvider('https://bsctestapi.terminet.io/rpc');
   }
}