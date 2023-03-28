import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing"

import { MsgIssueDenom, MsgMintNFT } from "./generated/myChain/tx"

export const typeUrlMsgIssueDenom = "/irismod.nft.MsgIssueDenom"
export const typeUrlMsgMintNFT = "/irismod.nft.MsgMintNFT"

export const nftTypes: ReadonlyArray<[string, GeneratedType]> = [
    [typeUrlMsgIssueDenom, MsgIssueDenom],
    [typeUrlMsgMintNFT, MsgMintNFT],
]