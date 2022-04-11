import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { storeNFT } from "./utils/nftStorage";
import { NFTProps } from "./types/NFTProps";

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.post(
  "/upload",
  async (req: express.Request<{}, {}, NFTProps>, res: express.Response) => {
    const { imageBase, name, description } = req.body;

    if (!imageBase || !name || !description) {
      return res.status(400).send({
        message: "Invalid Params. Expected imageBase, name, description ",
        params: req.body,
      });
    }
    const uploadedNFT = await storeNFT({
      imageBase,
      name,
      description,
    });

    if (uploadedNFT) {
      console.log(uploadedNFT);

      return res.status(201).send({ message: "Created" });
    } else {
      return res.status(400).send({ message: "Not Created", uploadedNFT });
    }
  }
);

app.listen(8080, () => {
  console.log("Listening on 8080...");
});
