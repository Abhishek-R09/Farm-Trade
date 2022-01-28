import { getSession } from "next-auth/react";
import { getAllCrops } from "../../../controllers/crops";

const handler = async (req, res) => {
  try {
    const session = await getSession({ req });
    if (session) {
      const crops = await getAllCrops({ username: session.user.user.username });
      if (crops.err) {
        res.status(crops.code).json({ error: true, msg: crops.message });
        return;
      }
      res.status(200).json({ crops });
    } else {
      res.status(401).json({ error: true, msg: "Session Expired" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

export default handler;
