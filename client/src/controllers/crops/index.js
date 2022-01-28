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

export const addCrop = async (payload) => {

  try {
    await dbConnect()

    const user = await User.findOne({
      username: payload.username,
    }).exec()

    if (!user) {
      return { err: true, code: 404, message: "User not found" };
    }

    if (user.status !== "Active") {
      return { err: true, code: 401, message: "Pending account. Please verify your email!!" };
    }

    const objId = user._id;
    const farmeruser = await Farmer.findOne({ id: objId }).exec()

    if (!farmeruser) {
      return { err: true, code: 404, message: "Farmer User not found" };
    }

    const crop = new Crop({
      name: payload.cropName,
      image: "",
      rating: payload.rating,
    });

    const cropdoc = await crop.save()

    // console.log("farmeruser's id is");
    // console.log(farmeruser._id);
    farmeruser.crops.push(cropdoc._id);

    const _ = await farmeruser.save()

    // console.log("farmer saved successfully.");
    /*db.farmer.update(
                    {_id: farmeruser._id},
                    {$push: {crops: cropdoc._id}}
                );*/
    // console.log("crop added.");
    // console.log(cropdoc);
    return { message: "Crop was added successfully" };

  } catch (err) {
    return { err: true, code: 500, message: err }
  }
}