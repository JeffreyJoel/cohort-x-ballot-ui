import { Box, Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
// import { isSupportedChain } from "../utils";
// import { getProvider } from "../constants/providers";
// import { getProposalsContract } from "../constants/contracts";
// import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import useDelegate from "../hooks/useDelegate";

const DelegateVote = () => {
  const [address, setAddress] = useState("");

//   const { chainId } = useWeb3ModalAccount();
//   const { walletProvider } = useWeb3ModalProvider();


    const handleDelegate = useDelegate(address);


//   const handleDelegate = async (to) => {
//     if (!isSupportedChain(chainId)) return console.error("Wrong network");
//     const readWriteProvider = getProvider(walletProvider);
//     const signer = await readWriteProvider.getSigner();

//     const contract = getProposalsContract(signer);

//     try {
//         const transaction = await contract.delegate(to);
//         console.log("transaction: ", transaction);
//         const receipt = await transaction.wait();

//         console.log("receipt: ", receipt);

//         if (receipt.status) {
//             return console.log("delegate successfull!");
//         }

//         console.log("delegate failed!");
//     } catch (error) {
//         console.log(error);
//         // let errorText;
//         // if (error.reason === "Self-delegation is disallowed") {
//         //     errorText = "You cannot delegate yourself";
//         // } else if (error.reason === "Already voted.") {
//         //     errorText = "You have already voted";
//         // } else {
//         //     errorText = "An unknown error occured";
//         // }
// Found loop in delegation.
//         // console.error("error: ", errorText);
//     }
// };
  return (
    <Card size="2" style={{ width: 425 }}>
      <Flex gap="" align="center">
        <Box width={"100%"}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="4" className="text-xl" weight="bold">
                Delegate&apos;s Address
              </Text>
              <TextField.Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Delegate's Address"
              />
            </label>
            <Button className="rounded-2xl w-fit mt-4 bg-purple-600" onClick={handleDelegate}>Delegate vote</Button>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};

export default DelegateVote;
