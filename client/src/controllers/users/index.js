import User from "../../model/user.model";
import dbConnect from "./../../lib/dbconnect";

export const getprofile = (req, res) => {
  User.findOne({
    username: req.params.username,
  })
    .populate("auctionsParticipated", "-__v")
    .populate("roles")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      let myobj = {};
      myobj.roles = user.roles;
      myobj.auctionsParticipated = user.auctionsParticipated;
      myobj._id = user._id;
      myobj.username = user.username;
      myobj.email = user.email;
      myobj.firstname = user.firstname;
      myobj.lastname = user.lastname;
      //TODO : send winner auction to frontend in case of buyer.
      res.status(200).send(myobj);
    });
};

export const getParticipatedAuctions = async (payload) => {
  try {
    await dbConnect();
    const auctions = await User.findOne(
      {
        username: payload.username,
      },
      "auctionsParticipated"
    )
      .populate("auctionsParticipated", "-__v")
      .exec();

    if (!auctions) {
      return { error: true, code: 401, message: "User Not found." };
    }

    return auctions;
  } catch (err) {
    return { error: true, code: 500, msg: err };
  }
};
