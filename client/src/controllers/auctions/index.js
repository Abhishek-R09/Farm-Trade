import User from "../../model/user.model"
import Auction from "../../model/auction.model"
import dbConnect from './../../lib/dbconnect';

export const getauctionwithid = async (payload) => {
  try {
    await dbConnect()
    // console.log(payload);
    const auctionDetails = await Auction.findOne({
      _id: payload.auctionId,
    }).populate("crop").exec();
    // console.log("get auction by id", auctionDetails);
    if (!auctionDetails) {
      return { error: true, code: 404, message: "Auction Id Invalid." };
    }

    return auctionDetails

  } catch (err) {
    return { error: true, code: 500, msg: err }
  }
  // Auction.findOne({
  //   _id: payload.auctionId,
  // }).populate("crop").exec((err, auction) => {
  //   if (err) {
  //     res.status(500).send({ message: err });
  //     return;
  //   }
  //   if (!auction) {
  //     return res.status(404).send({ message: "Auction Not found." });
  //   }
  //   auction.bids = undefined;
  //   auction = JSON.parse(JSON.stringify(auction));
  //   // console.log(auction);
  //   res.status(200).send(auction);
  // })

};