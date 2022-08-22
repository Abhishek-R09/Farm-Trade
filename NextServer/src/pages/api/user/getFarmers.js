import { getSession } from "next-auth/react";
import { getFarmers } from "../../../controllers/users";
// import { getauctionwithid } from "../../../controllers/auctions";

const handler = async (req, res) => {
  try {
    const session = await getSession({ req });
    // session.user.user.
    // console.log("api call", session);
    if (session) {
      // Signed in

      const users = await getFarmers();
      //   console.log(users);
      // console.log("getauctions", auctions);
      if (users.err) {
        // console.log(users.err);
        res.status(users.code).json({ message: users.message });
        return;
      }
      const result = users.filter((user) => user.roles.length > 0);
      res.status(200).json({ result });
      return;
    } else {
      // Not Signed in
      res.status(401).json({ error: true, msg: "Session Expired" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
  // res.end()
};

export default handler;
