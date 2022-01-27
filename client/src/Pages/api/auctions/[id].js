import { getSession } from "next-auth/react"
import { getFullAuctionDetailsWithId } from "../../../controllers/auctions"

const handler = async (req, res) => {
  try {
    const session = await getSession({ req })
    // session.user.user.
    if (session) {
      // Signed in
      const auctionDetails = await getFullAuctionDetailsWithId({ auctionId: req.query.id })
      if (auctionDetails.err) {
        res.status(auctionDetails.code).json({ error: true, msg: auctionDetails.message })
        return
      }

      res.status(200).json({ auctionDetails })

    } else {
      // Not Signed in
      res.status(401).json({ error: true, msg: "Session Expired" })
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err })
  }
}

export default handler