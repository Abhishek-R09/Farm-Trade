import { getSession } from "next-auth/react"
import { createNewAuction } from "../../../controllers/auctions"


const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const session = await getSession({ req })
      // session.user.user.
      console.log("api call", session.user.user);
      if (session) {
        // Signed in
        // console.log("api/createauction", req.body);
        const newAuctionMsg = await createNewAuction({ ...req.body, userid: session.user.user.id })

        if (newAuctionMsg.err) {
          res.status(newAuctionMsg.code).json({ error: true, msg: newAuctionMsg.message })
          return
        }

        res.status(200).json({ msg: "Successfully created an auction" })
      } else {
        // Not Signed in
        res.status(401).json({ error: true, msg: "Session Expired" })
        return;
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ err })
    }
  } else {
    res.status(404).json({ err: true, message: "Requested resource not found!" })
  }
}

export default handler