import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/dbconnect";
import User from "../../../model/user.model";
import Role from "../../../model/role.model";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        await dbConnect();

        const { username, password } = credentials;

        // let user = null;
        try {
          const user = await User.findOne({
            username,
          }).populate("roles", "-__v");
          if (!user) {
            return null;
            // return res.status(404).send({ message: "User Not found." });
          }
          // console.log("[...nextauth]", user);
          if (user.status != "Active") {
            return null;
            // return res.status(401).send({
            //   message: "Pending account. Please verify your email!!",
            // });
          }

          var passwordIsValid = await bcrypt.compare(
            password,
            // req.body.password,
            user.password
          );
          // console.log("checking password");
          if (!passwordIsValid) {
            return null;
            // return res.status(401).send({
            //   accessToken: null,
            //   message: "Invalid Password!",
            // });
          }
          // let time = 86400 * 30;
          // var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          //   expiresIn: time, // 24 hours
          // });

          // console.log("token is " + token);

          var authorities = [];

          for (let i = 0; i < user.roles.length; i++) {
            authorities.push(user.roles[i].name);
          }

          // res.status(200).send({
          //   id: user._id,
          //   username: user.username,
          //   email: user.email,
          //   roles: authorities,
          //   accessToken: token,
          //   firstName: user.firstname,
          //   lastName: user.lastname,
          //   status: user.status,
          //   auctionsParticipated: user.auctionsParticipated,
          // });
          // console.log("response set");
          console.log(user);

          return {
            id: user._id,
            user: {
              id: user._id,
              status: user.status,
              roles: user.roles,
              username: user.username,
              email: user.email,
              firstName: user.firstname,
              lastName: user.lastname,
            },
          };
          // username: user.username, email: user.email, roles: authorities }
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user, account, profile }) => {
      // console.log("jwt ", token, user, account, profile);
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      // console.log("session ", session, token);
      session.user = token.user;
      return session;
    },
  },
});
