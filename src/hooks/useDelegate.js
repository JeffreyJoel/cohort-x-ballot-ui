import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getProposalsContract } from "../constants/contracts";
import { getProvider } from "../constants/providers";
import { isSupportedChain } from "../utils";
import { toast } from "../components/ui/use-toast";

const useDelegate = (to) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return async () => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getProposalsContract(signer);

    try {
      const transaction = await contract.delegate(to);
      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();

      console.log("receipt: ", receipt);

      if (receipt.status) {
        toast({
            description: "delegate successfull!",
          });
        return console.log("delegate successfull!");
        
      }

      console.log("delegate failed!");
      toast({
        description: "delegate failed!",
        variant: "destructive",
      });
    } catch (error) {
      console.log(error);

      let errorText;
      if (error.reason === "Self-delegation is disallowed") {
        errorText = "You cannot delegate yourself";
      } else if (error.reason === "Already voted.") {
        errorText = "You have already voted";
      } else if (error.reason === "Found loop in delegation.") {
        errorText = "We Found loop in delegation.";
      } else {
        errorText = "An unknown error occured";
      }
      console.log(errorText);
      toast({
        description: errorText,
        variant: "destructive",
      });
    }
  };
};

export default useDelegate;
