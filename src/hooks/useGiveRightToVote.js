import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { isAddress } from "ethers";
import { getProvider } from "../constants/providers";
import { getProposalsContract } from "../constants/contracts";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useToast } from "../components/ui/use-toast";

const useGiveRightToVote = (address) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { toast } = useToast();

  return useCallback(async () => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    if (!isAddress(address)) return console.error("Invalid address");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getProposalsContract(signer);

    try {
      const estimatedGas = await contract.giveRightToVote.estimateGas(address);
      // console.log("estimatedGas: ", estimatedGas);

      // const feeData = await readWriteProvider.getFeeData();

      // console.log("feeData: ", feeData);

      // const gasFee = estimatedGas * feeData.gasPrice;

      // console.log("estimated: ", gasFee);

      const transaction = await contract.giveRightToVote(address, {
        gasLimit: estimatedGas,
      });
      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();

      console.log("receipt: ", receipt);

      if (receipt.status) {
        toast({
          description: "giveRightToVote successfull!",
        });
        return console.log("giveRightToVote successfull!");
      }

      console.log("giveRightToVote failed!");
      toast({
        description: "giveRightToVote failed!",
        variant: "destructive",
      });
    } catch (error) {
      console.error("error: ", error);
      toast({
        description: error,
        variant: "destructive",
      });
    }
  }, [address, chainId, walletProvider]);
};

export default useGiveRightToVote;
