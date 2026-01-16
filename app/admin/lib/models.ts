// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       min: 3,
//       max: 20,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     img: {
//       type: String,
//     },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     phone: {
//       type: String,
//     },
//     address: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// // );

 import mongoose, { Document, model, Model, models, Schema } from "mongoose";

// interface IUser extends Document {
//   name: string;
//   email: string;
//   password?: string;
//   id: string;
// }

// const userSchema: Schema<IUser> = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: false,
//   },
// });

// const User: Model<IUser> =
//   mongoose.models.User || mongoose.model<IUser>("User", userSchema);

// export default User;




export interface IUser {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  img?: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User =
  models.User || model<IUser>("User", userSchema);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    img: {
      type: String,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
  },
  { timestamps: true }
);

// export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
