/* import NextAuthOptions from 'next-auth'; */
import GoogleProvider from "next-auth/providers/google";
import  NextAuth from 'next-auth';
import User from '@models/user';
import {connectToDB} from '@utils/database';
/* import { connect } from 'mongoose'; */

/* console.log( {clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,}
    ) */
   export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            
        })
    ],
callbacks: {
    async session({session}){
        const sessionUser = await User.findOne({
            email: session.user.email
        })
        
        session.user.id = sessionUser._id.toString();
        return session;
    },
    /* async jwt({ token, user, account, profile }) {
        if (user) {
          token.id = user.id; // Persisting user ID in the token
        }
        return token;
      }, */
      
    async signIn({ profile}){
        try{
            await connectToDB();

            //check if user already exists
            const userExists = await User.findOne({
                email: profile.email
            });
            //if not create user and save
            if (!userExists){
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture
                })
            }
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
}/* ,pages: {
    signIn: '/', // Custom sign-in page
    signOut: '/', // Custom sign-out page
    error: '/', // Error code passed in query string as ?error=
    verifyRequest: '/', // (used for check email message)
    newUser: null // If set, new users will be directed here on first sign in
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  */
 ,
  jwt: {
    secret: process.env.JWT_SECRET, // Use the JWT secret from environment variables
  }, 
   }

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }