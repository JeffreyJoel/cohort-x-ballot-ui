import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getProposalsContract } from "../constants/contracts";
import { getProvider } from "../constants/providers";
import { isSupportedChain } from "../utils";
import { useToast } from "../components/ui/use-toast"

const useVote = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { toast } = useToast();

  return async (id) => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getProposalsContract(signer);

    try {
      const transaction = await contract.vote(id);
      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();

      console.log("receipt: ", receipt);

      if (receipt.status) {
        toast({
          description: "Vote successfull!",
        });
        return console.log("vote successfull!");
      }

      console.log("vote failed!");
    } catch (error) {
      console.log(error);
      let errorText;
      if (error.reason === "Has no right to vote") {
        errorText = "You have not right to vote";
      } else if (error.reason === "Already voted.") {
        errorText = "You have already voted";
      } else {
        errorText = "An unknown error occured";
      }

      console.error("error: ", errorText);
      toast({
        variant: "destructive",
        description: errorText,
      });
    }
  };
};

export default useVote;
