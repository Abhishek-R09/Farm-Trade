import { getSession } from "next-auth/react"
import { addCrop } from "../../../controllers/crops"

const handler = async (req, res) => {
  try {
    const session = await getSession({ req })
    if (session) {
      if (req.method === "POST") {
        const cropAddMsg = await addCrop({
          ...req.body
        })
        if (cropAddMsg.err) {
          res.status(cropAddMsg.code).json({
            error: true,
            msg: cropAddMsg.message
          })
          return
        }
        res.status(200).json({ cropAddMsg })
      } else {
        res.status(404).json({ error: true, msg: "Not found" })
      }
    } else {
      res.status(401).json({ error: true, msg: "Session Expired" })
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err })
  }
}

export default handler