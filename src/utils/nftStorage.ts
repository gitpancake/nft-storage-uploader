import { NFTStorage, File } from "nft.storage";
import mime from "mime";
import dotenv from "dotenv";

import { NFTProps } from "../types/NFTProps";

dotenv.config();

export const storeNFT = async ({ imageBase, name, description }: NFTProps) => {
  const { NFT_STORAGE_KEY } = process.env;

  const image = new File([Buffer.from(imageBase, "base64")], name, {
    type: mime.getType(imageBase) || "image/*",
  });

  if (!image || !NFT_STORAGE_KEY) {
    return;
  }

  const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  return nftStorage.store({
    image,
    name,
    description,
  });
};
