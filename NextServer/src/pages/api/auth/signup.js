import { getSession } from "next-auth/react";
import { signup } from "../../../controllers/auth";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const session = await getSession({ req });
      // session.user.user.
      if (!session) {
        const signupMsg = await signup({ ...req.body });
        if (signupMsg.err) {
          res.status(signupMsg.code).json({
            error: true,
            msg: signupMsg.message,
            verbose: signupMsg?.error,
          });
          return;
        }

        res.status(200).json({ msg: signupMsg.message });
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
