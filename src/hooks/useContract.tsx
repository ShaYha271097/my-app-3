
import { getContract } from "../utils";
import { useMemo } from "react";

import { Contract } from "@ethersproject/contracts";
import { MULTICALL_ABI, MULTICALL_NETWORKS } from "../constants/multicall";

//
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React as useWeb3ReactCore } from "@web3-react/core";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
// import { NetworkContextName } from "../constants";
import { useActiveWeb3React } from "./index";
import { useWeb3React } from '@web3-react/core'
// returns null on errors
function useContract(
    address: string | undefined,
    ABI: any,
    withSignerIfPossible = true
): Contract | null {
    const { library, account } = useActiveWeb3React();
    return useMemo(() => {
        if (!address || !ABI || !library) return null;
        try {
            return getContract(
                address,
                ABI,
                library,
                withSignerIfPossible && account ? account : undefined
            );
        } catch (error) {
            console.error("Failed to get contract", error);
            return null;
        }
    }, [address, ABI, library, withSignerIfPossible, account]);
}
export function useMulticallContract(): Contract | null {
    const { chainId } = useActiveWeb3React();
    return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI);
}
