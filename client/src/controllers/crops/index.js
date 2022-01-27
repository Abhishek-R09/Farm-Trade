import User from "../../model/user.model"
import Farmer from "../../model/farmer.model"
import Crop from "../../model/crop.model"
import dbConnect from './../../lib/dbconnect';

export const getAllCrops = async (payload) => {
  try {
    await dbConnect()

    const user = await User.findOne({
      username: payload.username,
    }).exec()

    if (!user) {
      return { err: true, code: 401, message: "Unauthorized!" };
    }

    let userid = user._id;
    const farmer = await Farmer.findOne({ id: userid }, "crops")
      .populate("crops")
      .exec()

    if (!farmer) {
      return { err: true, code: 401, message: "Unauthorized!" };
    }
    return farmer

  } catch (err) {
    return { err: true, code: 500, message: err }
  }
};