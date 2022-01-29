import dbConnect from "../../lib/dbconnect";
import User from "../../model/user.model";
import Role from "../../model/role.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendConfirmationEmail } from "../../lib/nodemailer.config";

export const signup = async (payload) => {
  try {
    await dbConnect();

    const confirmtoken = jwt.sign(
      { email: payload.email },
      process.env.CONFIRM_SECRET
    );
    const hashedPass = await bcrypt.hash(payload.password, 8);

    const newUser = new User({
      username: payload.username,
      email: payload.email,
      password: hashedPass,
      firstname: payload.firstName,
      lastname: payload.lastName,
      confirmationCode: confirmtoken,
    });

    const user = await newUser.save();
    console.log("added user");
    if (payload.roles[0] === "Farmer") {
      const farmeruser = new Farmer({
        id: user._id,
        crop: [],
      });
      await farmeruser.save();
      console.log("added farmer");
    }

    if (payload.roles) {
      const roles = await Role.find({
        name: { $in: payload.roles },
      });

      user.roles = roles.map((role) => role._id);
      await user.save();
      console.log("added roles");
      await sendConfirmationEmail(
        user.username,
        user.email,
        user.confirmationCode
      );
      console.log("sent email");
      return { message: "User was registered successfully!" };
    } else {
      const role = await Role.findOne({ name: "Buyer" });
      user.roles = [role._id];
      await user.save();
      await sendConfirmationEmail(
        user.username,
        user.email,
        user.confirmationCode
      );
      return { message: "Buyer was registered successfully!" };
    }
  } catch (err) {
    console.log("Signup error", err);
    return {
      err: true,
      code: 500,
      message: "Something went wrong!",
      error: err,
    };
  }
};

export const verifyUser = async (payload) => {
  try {
    await dbConnect();

    const user = await User.findOne({
      confirmationCode: payload.confirmationCode,
    });

    if (!user) {
      return { err: true, code: 404, message: "User Not found." };
    }

    user.status = "Active";
    await user.save();

    return { message: "Email verified!! You can login now." };
  } catch (err) {
    return {
      err: true,
      code: 500,
      message: "Something went wrong!",
      error: err,
    };
  }
};
