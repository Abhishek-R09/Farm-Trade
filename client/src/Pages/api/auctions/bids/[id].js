import { getSession } from "next-auth/react"
import { getAuctionBids, addNewBid } from "../../../../controllers/auctions"

const handler = async (req, res) => {
  try {
    const session = await getSession({ req })
    // session.user.user.
    if (session) {
      // Signed in
      if (req.method === "GET") {
        const bids = await getAuctionBids({ auctionId: req.query.id })
        if (bids.err) {
          res.status(bids.code).json({ error: true, msg: bids.message })
          return
        }

        res.status(200).json({ bids })
      } else if (req.method === "PUT") {
        console.log("new bid", req.body);
        const addBid = await addNewBid({ auctionid: req.query.id, userid: session.user.user.id, ...req.body })
        if (addBid.err) {
          res.status(addBid.code).json({ error: true, msg: addBid.message })
          return
        }
        res.status(200).json({ addBid })
      } else {
        res.status(404).json({ error: true, msg: "Not found" })
      }
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