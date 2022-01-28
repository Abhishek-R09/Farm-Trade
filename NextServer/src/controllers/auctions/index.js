import Auction from "../../model/auction.model";
import User from "../../model/user.model";
import dbConnect from "./../../lib/dbconnect";

export const getauctionwithid = async (payload) => {
  try {
    await dbConnect();
    const auctionDetails = await Auction.findOne({
      _id: payload.auctionId,
    })
      .populate("crop")
      .exec();
    if (!auctionDetails) {
      return { error: true, code: 404, message: "Auction Id Invalid." };
    }

    return auctionDetails;
  } catch (err) {
    return { error: true, code: 500, msg: err };
  }
};

export const getAuctionBids = async (payload) => {
  try {
    await dbConnect();
    const bids = await Auction.findOne(
      {
        _id: payload.auctionId,
      },
      "bids"
    )
      .populate({
        path: "bids",
        populate: {
          path: "bidby",
          model: "User",
          select: "firstname lastname username",
        },
      })
      .exec();

    // console.log("auctionDetails", auctionDetails)
    if (!bids) {
      return { error: true, code: 404, message: "Auction Id Invalid." };
    }

    return bids;
  } catch (err) {
    return { error: true, code: 500, msg: err };
  }
};

export const getFullAuctionDetailsWithId = async (payload) => {
  try {
    await dbConnect();
    const auctionDetails = await Auction.findOne({
      _id: payload.auctionId,
    })
      .populate("crop")
      .populate("owner", "firstname lastname")
      .populate({
        path: "bids",
        populate: {
          path: "bidby",
          model: "User",
          select: "firstname lastname username",
        },
      })
      .exec();

    // console.log("auctionDetails", auctionDetails)
    if (!auctionDetails) {
      return { error: true, code: 404, message: "Auction Id Invalid." };
    }

    return auctionDetails;
  } catch (err) {
    return { error: true, code: 500, msg: err };
  }
};

export const addNewBid = async (payload) => {
  const auctionid = payload.auctionid;
  // console.log(auctionid + " is the auctionid");

  try {
    const updateRes = await Auction.updateOne(
      { _id: auctionid },
      {
        $push: {
          bids: {
            $each: [
              {
                bidby: payload.userid,
                bidprice: payload.bidprice,
                time: payload.time,
              },
            ],
            $sort: { bidprice: -1 },
            $slice: 10,
          },
        },
      }
    );

    if (!updateRes) {
      return { err: true, code: 404, message: "Auction not found!" };
    }

    // .then(() => {
    // console.log("bid added to auction successfully in a sorted manner ");
    let flag = false;
    const user = await User.findById(payload.userid);

    if (!user) {
      return { err: true, code: 401, message: "Unauthorized" };
    }

    // then((user) => {
    user.auctionsParticipated.forEach((element) => {
      // console.log(element + " is the element " + auctionid);
      if (element == auctionid) {
        flag = true;
      }
    });
    if (!flag) {
      user.auctionsParticipated.push(auctionid);
      user.save();
    }
    return { message: "bid added to auctionn successfully." };
    // });
    // })
    // .catch((err) => {
    // res.status(404).send("Auction not found");
    // });
  } catch (err) {
    return { err: true, code: 500, message: err };
  }
};

export const getpresentauctions = async () => {
  const timenow = Math.floor(Date.now() / 1000);
  try {
    await dbConnect();
    const auctions = await Auction.find({ startdate: { $lt: timenow } })
      .populate("crop")
      .populate("owner", "username firstname lastname")
      .exec();

    let mypresent = [];
    for (const doc of auctions) {
      if (timenow < doc.startdate + doc.duration * 60) {
        mypresent.push(doc);
      }
    }
    return mypresent;
  } catch (err) {
    return { error: true, code: 500, message: "Something went wrong!" };
  }
};

export const getcompletedauctions = async () => {
  const timenow = Math.floor(Date.now() / 1000);
  try {
    await dbConnect();
    const auctions = await Auction.find({ startdate: { $lt: timenow } })
      .populate("crop")
      .populate("owner", "username firstname lastname")
      .exec();

    let mypast = [];
    for (const doc of auctions) {
      if (timenow > doc.startdate + doc.duration * 60) {
        mypast.push(doc);
      }
    }
    return mypast;
  } catch (err) {
    return { error: true, code: 500, message: "Something went wrong!" };
  }
};

export const getfutureauctions = async () => {
  const timenow = Math.floor(Date.now() / 1000);
  try {
    await dbConnect();
    const auctions = await Auction.find({ startdate: { $gt: timenow } })
      .populate("crop")
      .populate("owner", "username firstname lastname")
      .exec();

    let myfuture = [];
    for (const doc of auctions) {
      if (timenow < doc.startdate) {
        myfuture.push(doc);
      }
    }
    return myfuture;
  } catch (err) {
    return { error: true, code: 500, message: "Something went wrong!" };
  }
};

const toUnixTime = (date) => {
  const dateArr = date.split("T");
  const dateArr2 = dateArr[0].split("-");
  const timeArr = dateArr[1].split(":");
  const year = parseInt(dateArr2[0]);
  const month = parseInt(dateArr2[1]);
  const day = parseInt(dateArr2[2]);
  const hour = parseInt(timeArr[0]);
  const minute = parseInt(timeArr[1]);
  return new Date(year, month - 1, day, hour, minute).getTime() / 1000;
};

export const createNewAuction = async (payload) => {
  const auctionid = Math.random().toString(36).substring(2, 15);
  // console.log(toUnixTime(req.body.startdate));
  // console.log("controller/createnewauction", payload);

  const auction = new Auction({
    startdate: toUnixTime(payload.startdate), // send unix timestamp
    duration: payload.duration, // sen durations in minutes
    harvestdate: payload.harvestdate, // send as recieved from frontend
    crop: payload.crop.id, //  send crop id
    quantity: Number(payload.quantity), // send as integer
    owner: payload.userid,
    description: payload.description,
    startprice: Number(payload.startprice), // send as number
    bids: [
      {
        bidby: payload.userid,
        bidprice: Number(payload.startprice), // send as number
        time: toUnixTime(payload.startdate), //  send unix timestamp
      },
    ],
    tempId: auctionid,
  });

  // console.log("auction created", auction);
  try {
    const auctionDoc = await auction.save();

    const user = await User.findById(payload.userid);
    // console.log("controller", user);
    user.auctionsParticipated.push(auctionDoc._id);
    await user.save();
    // console.log("saved auction and user");
    return true;
  } catch (err) {
    console.log(err);
    return { err: true, code: 500, message: err };
  }
  // const auctionDoc = await auction.save((err, auctiondoc) => {
  //   if (err) {
  //     // res.status(500).send({ message: err });
  //     return { err: true, code: 500, message: err };
  //   }
  //   // console.log("Auction is sccheduled by farmer and added to datbase");
  //   // console.log("auction id is" + auctiondoc._id);
  //   User.findById(req.userid).then((user) => {
  //     user.auctionsParticipated.push(auctiondoc._id);
  //     user.save();
  //   });

  //   res.status(200).send({ message: "Auction was added successfully" });
  // });
};
