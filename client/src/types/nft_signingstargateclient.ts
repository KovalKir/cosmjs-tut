import {
    defaultRegistryTypes,
    DeliverTxResponse,
    QueryClient,
    SigningStargateClient,
    SigningStargateClientOptions,
    StdFee,
} from "@cosmjs/stargate"
import { Tendermint34Client } from "@cosmjs/tendermint-rpc"
import { GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing"
import { nftTypes } from "./messages"


export const checkersDefaultRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
    ...defaultRegistryTypes,
    ...nftTypes,
]

function createDefaultRegistry(): Registry {
    return new Registry(checkersDefaultRegistryTypes)
}

export class nftSigningStargateClient extends SigningStargateClient {


    public static async connectWithSigner(
        endpoint: string,
        signer: OfflineSigner,
        options: SigningStargateClientOptions = {},
    ): Promise<nftSigningStargateClient> {
        const tmClient = await Tendermint34Client.connect(endpoint)
        return new nftSigningStargateClient(tmClient, signer, {
            registry: createDefaultRegistry(),
            ...options,
        })
    }

    protected constructor(
        tmClient: Tendermint34Client | undefined,
        signer: OfflineSigner,
        options: SigningStargateClientOptions,
    ) {
        super(tmClient, signer, options)
        
    }
}

