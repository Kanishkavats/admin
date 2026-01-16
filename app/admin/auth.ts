/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import NextAuth from "next-auth";

// import CredentialsProvider from "next-auth/providers/credentials";
// import { authConfig } from "./authconfig";
// import { connectToDB } from "./lib/utils";
// import { User } from "./lib/models";
// import bcrypt from "bcryptjs";

// const login = async (credentials) => {
//   try {
//     connectToDB();
//     const user = await User.findOne({ username: credentials.username });

//     if (!user || !user.isAdmin) throw new Error("Wrong credentials!");

//     const isPasswordCorrect = await bcrypt.compare(
//       credentials.password,
//       user.password
//     );

//     if (!isPasswordCorrect) throw new Error("Wrong credentials!");

//     return user;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to login!");
//   }
// };

// export const { signIn, signOut, auth } = NextAuth({
//   ...authConfig,
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         try {
//           const user = await login(credentials);
//           return user;
//         } catch (err) {
//           return null;
//         }
//       },
//     }),
//   ],
//   // ADD ADDITIONAL INFORMATION TO SESSION
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.username = user.name;
        
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.name = token.username;
        
//       return session;
//     }
//   },
// });
/* eslint-disable @typescript-eslint/no-unused-vars */

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// import { authConfig } from "./authconfig";
// import { connectToDB } from "./lib/utils";
// import { User } from "./lib/models";

// /* ================= LOGIN HELPER ================= */

// const login = async (credentials: any) => {
//   try {
//     await connectToDB(); // 🔥 MUST await

//     const user = await User.findOne({
//       username: credentials.name,
//     }).lean();

//     // if (!user || !user.isAdmin) {
//     //   throw new Error("Wrong credentials");
//     // }

//     const isPasswordCorrect = await bcrypt.compare(
//       credentials.password,
//       user.password
//     );

//     if (!isPasswordCorrect) {
//       throw new Error("Wrong credentials");
//     }
//     return {
//     id: user._id.toString(), // ✅ IMPORTANT
//     name: user.name,
//     email: user.email,
//     // isAdmin: user.isAdmin ?? false,
//   };

//     // return user;
//   } catch (error) {
//     console.error("Login error:", error);
//     throw new Error("Failed to login");
//   }
// };

// /* ================= NEXTAUTH ================= */

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   ...authConfig,

//   providers: [
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         if (!credentials) return null;

//         try {
//           const user = await login(credentials);
//           return user;
//         } catch {
//           return null;
//         }
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user._id?.toString();
//         token.username = user.name;
       
//       }
//       return token;
//     },
//       // token.isAdmin = user.isAdmin;
//       //   token.img = user.img;
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.name = token.name as string;
        
//       }
//       return session;
//     },

//     // session.user.isAdmin = token.isAdmin as boolean;
//     //     session.user.img = token.img as string;
//   },
// });

// app/admin/auth.ts
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// import { authConfig } from "./authconfig";
// import { connectToDB } from "./lib/utils";
// import { User } from "./lib/models";

// /* ================= LOGIN ================= */

// const login = async (credentials: any) => {
//   await connectToDB();

//   const user = await User.findOne({
//     username: credentials.username,
//   });

//   if (!user) throw new Error("User not found");

//   const isPasswordCorrect = await bcrypt.compare(
//     credentials.password,
//     user.password
//   );

//   if (!isPasswordCorrect) {
//     throw new Error("Wrong credentials");
//   }

//   return {
//     id: user._id.toString(),
//     name: user.name,
//     email: user.email,
//     image: user.img || "/noavatar.png",
//   };
// };

// /* ================= NEXTAUTH ================= */

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   ...authConfig,

//   providers: [
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         if (!credentials) return null;
//         return await login(credentials);
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.name = token.name as string;
//       }
//       return session;
//     },
//   },
// });


/* eslint-disable @typescript-eslint/no-explicit-any */
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// import { authConfig } from "./authconfig";
// import { connectToDB } from "./lib/utils";
// import { User } from "./lib/models";

// const login = async (credentials: any) => {
//   await connectToDB();

//   const user = await User.findOne({ name: credentials.name });

//   if (!user || !user.isAdmin) {
//     throw new Error("Wrong credentials!");
//   }

//   const isPasswordCorrect = await bcrypt.compare(
//     credentials.password,
//     user.password
//   );

//   if (!isPasswordCorrect) {
//     throw new Error("Wrong credentials!");
//   }

//   return {
//     id: user._id.toString(),
//     name: user.name,
//     email: user.email,
//   };
// };

// export const { signIn, signOut, auth } = NextAuth({
//   ...authConfig,

//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         if (!credentials) return null;
//         return await login(credentials);
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.name = user.name;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (session.user && token.name) {
//         session.user.name = token.name as string;
//       }
//       return session;
//     },
//   },
// });

// app/admin/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { authConfig } from "./authconfig";
import { connectToDB } from "./lib/utils";
import { User } from "./lib/models";

export const authOptions = {
  ...authConfig,

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectToDB();

        const user = await User.findOne({
          username: credentials?.username,
        });

        // if (!user || !user.isAdmin) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email
          
        };
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
