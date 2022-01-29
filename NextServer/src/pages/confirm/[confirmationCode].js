import React from "react";
import dbConnect from "../../lib/dbconnect";
import User from "../../model/user.model";

const VerifyUser = (props) => {
  // const [loading, setLoading] = useState(false)
  if (props.err) {
    console.log(props?.error);
    return (
      <div>
        <h1>Error Verifying the User!</h1>
        <p>{`${props.code} - ${props.message}`}</p>
      </div>
    );
  }
  return <h1>{props.message}</h1>;
};

export const getServerSideProps = async (context) => {
  // console.log(context);
  // console.log(context.query);
  const { confirmationCode } = context.query;
  try {
    await dbConnect();

    const user = await User.findOne({
      confirmationCode,
    });

    if (!user) {
      return { props: { err: true, code: 404, message: "User Not found." } };
    }

    if (user.status === "Active") {
      return { props: { message: "User Already Verified." } };
    }

    user.status = "Active";
    await user.save();

    return { props: { message: "Email verified!! You can login now." } };
  } catch (err) {
    return {
      props: {
        err: true,
        code: 500,
        message: "Something went wrong!",
        error: err,
      },
    };
  }
};

export default VerifyUser;
