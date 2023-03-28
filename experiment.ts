import {  IndexedTx, StargateClient, SigningStargateClient  } from "@cosmjs/stargate"
import { DirectSecp256k1HdWallet, OfflineDirectSigner } from "@cosmjs/proto-signing"
import { defaultRegistryTypes } from "@cosmjs/stargate"

import { GeneratedType } from "@cosmjs/proto-signing"

import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx"
import { MsgIssueDenom } from "./client/src/types/generated/myChain/tx"

import { nftSigningStargateClient } from "./client/src/types/nft_signingstargateclient"



const rpc = 'http://34.80.93.133:26657';
const mnemonic = '' 

const getSignerFromMnemonic = async (): Promise<OfflineDirectSigner> => {
    return DirectSecp256k1HdWallet.fromMnemonic('expand forget silly cool uncover card sauce social close harvest medal learn', {
        prefix: "iaa",
    })
}

const runAll = async(): Promise<void> => {
    
    const sign: OfflineDirectSigner = await getSignerFromMnemonic()

    const addr = (await sign.getAccounts())[0].address

    console.log (addr)

    const cli = await nftSigningStargateClient.connectWithSigner(rpc, sign)


    // const result = await cli.signAndBroadcast(
    //     // the signerAddress
    //     'iaa1046np7yag468x8za9z3pjj5kx6ujalcm3695qk',
    //     // the message(s)
    //     [
    //         {
    //             typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    //             value: {
    //                 fromAddress: 'iaa1046np7yag468x8za9z3pjj5kx6ujalcm3695qk',
    //                 toAddress: 'iaa1lhwncj5q6eerftl9akh072cct8m6ahyahqj5ea',
    //                 amount: [
    //                     { denom: "uiris", amount: "100000" },
    //                 ],
    //             },
    //           },
    //     ],
    //     // the fee
    //     {
    //         amount: [{ denom: "uiris", amount: "10000" }],
    //         gas: "200000",
    //     },
    // )

    // const result = await cli.signAndBroadcast(
    //     // the signerAddress
    //     'iaa1046np7yag468x8za9z3pjj5kx6ujalcm3695qk',
    //     // the message(s)
    //     [
    //         {
    //             typeUrl: '/irismod.nft.MsgIssueDenom',
    //             value: {
    //                 id:"kir12345",
    //                 name:"testCollection1",
    //                 schema: '',
    //                 sender: addr,
    //             },
    //           },
    //     ],
    //     // the fee
    //     {
    //         amount: [{ denom: "uiris", amount: "10000" }],
    //         gas: "200000",
    //     },
    // )

    const result1 = await cli.signAndBroadcast(
        // the signerAddress
        'iaa1046np7yag468x8za9z3pjj5kx6ujalcm3695qk',
        // the message(s)
        [
            {
                typeUrl: "/irismod.nft.MsgMintNFT",
                value:{
                    id: "nft1",
                    denomId: "kir12345",
                    name: 'string',
                    uri: '',
                    data: '',
                    sender: addr,
                    recipient: addr,
                    uriHash: '',
                }
                
            },
        ],
        // the fee
        {
            amount: [{ denom: "uiris", amount: "10000" }],
            gas: "200000",
        },
    )

    
    
    // const client = await StargateClient.connect(rpc)
    // console.log("With client, chain id:", await client.getChainId(), ", height:", await client.getHeight())

    // console.log(
    //     "My balances:",
    //     await client.getAllBalances("iaa1046np7yag468x8za9z3pjj5kx6ujalcm3695qk"), // <-- replace with your generated address
    // )
    
    // const faucetTx: IndexedTx = (await client.getTx(
    //     "325FAF9E6A2AAAEDB9C1CB86F8F0C2B5F4A16EC3548AC370A191EBC52A7EE684",
    // ))!

    // console.log("Faucet Tx:", faucetTx)

    // const decodedTx: Tx = Tx.decode(faucetTx.tx)
    // console.log("DecodedTx:", decodedTx)

    // console.log("Decoded messages:", decodedTx.body!.messages)

}

runAll();