import { getSession } from "next-auth/react";
import { getfutureauctions } from "../../../controllers/auctions";

const handler = async (req, res) => {
  try {
    const session = await getSession({ req });
    // session.user.user.
    // console.log("api call", session);
    if (session) {
      // Signed in
      const auctions = await getfutureauctions();

      if (auctions.err) {
        res.status(auctions.code).json({ error: true, msg: auctions.message });
        return;
      }

      res.status(200).json({ auctions });
    } else {
      // Not Signed in
      res.status(401).json({ error: true, msg: "Session Expired" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

export default handler;
