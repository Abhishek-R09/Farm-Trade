import { getSession } from "next-auth/react";
import { verifyUser } from "../../../controllers/auth";

const handler = async (req, res) => {
  res.status(404).json({ err: true, message: "Requested resource not found!" });
  return;
  if (req.method === "POST") {
    try {
      const session = await getSession({ req });
      // session.user.user.
      if (!session) {
        const verifyMsg = await verifyUser({ ...req.body });
        if (verifyMsg.err) {
          res.status(verifyMsg.code).json({
            error: true,
            msg: verifyMsg.message,
            verbose: verifyMsg?.error,
          });
          return;
        }

        res.status(200).json({ msg: verifyMsg.message });
      } else {
        res.status(401).json({ error: true, msg: "Session Already Exists" });
        return;
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ err });
    }
  } else {
    res
      .status(404)
      .json({ err: true, message: "Requested resource not found!" });
  }
};

export default handler;
