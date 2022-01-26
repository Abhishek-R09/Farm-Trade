import { getSession } from "next-auth/react"
import { getParticipatedAuctions } from "../../../controllers/users"
import { getauctionwithid } from "../../../controllers/auctions"
// import dbConnect from './../../../lib/dbconnect';
const db = require("../../../model")

const handler = async (req, res) => {
  try {
    const session = await getSession({ req })
    // session.user.user.
    // console.log("api call", session);
    if (session) {
      // Signed in

      const auctions = await getParticipatedAuctions({ username: session.user.user.username });
      // console.log("getauctions", auctions);
      if (auctions.err) {
        res.status(auctions.code).json({ message: auctions.message })
        return;
      }

      const updatedAuctions = await Promise.all(auctions.auctionsParticipated.map(async (auction) => {
        try {
          const auctionDetails = await getauctionwithid({ auctionId: auction._id })
          return auctionDetails
        } catch (err) {
          return null
        }
      }))

      const result = updatedAuctions.filter(auction => auction !== null)
      // console.log("result", result);
      res.status(200).json({ auctions: result })
      return;
    } else {
      // Not Signed in
      res.status(401).json({ error: true, msg: "Session Expired" })
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err })
  }
  // res.end()
}

export default handler