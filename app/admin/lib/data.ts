// import { Product, User } from "./models";
// import { connectToDB } from "./utils";

// export const fetchUsers = async (q, page) => {
//   const regex = new RegExp(q, "i");

//   const ITEM_PER_PAGE = 2;

//   try {
//     connectToDB();
//     const count = await User.find({ username: { $regex: regex } }).count();
//     const users = await User.find({ username: { $regex: regex } })
//       .limit(ITEM_PER_PAGE)
//       .skip(ITEM_PER_PAGE * (page - 1));
//     return { count, users };
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch users!");
//   }
// };

// export const fetchUser = async (id) => {
//   console.log(id);
//   try {
//     connectToDB();
//     const user = await User.findById(id);
//     return user;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch user!");
//   }
// };

// export const fetchProducts = async (q, page) => {
//   console.log(q);
//   const regex = new RegExp(q, "i");

//   const ITEM_PER_PAGE = 2;

//   try {
//     connectToDB();
//     const count = await Product.find({ title: { $regex: regex } }).count();
//     const products = await Product.find({ title: { $regex: regex } })
//       .limit(ITEM_PER_PAGE)
//       .skip(ITEM_PER_PAGE * (page - 1));
//     return { count, products };
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch products!");
//   }
// };

// export const fetchProduct = async (id) => {
//   try {
//     connectToDB();
//     const product = await Product.findById(id);
//     return product;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch product!");
//   }
// };

// // DUMMY DATA

// export const cards = [
//   {
//     id: 1,
//     title: "Total Users",
//     number: 10.928,
//     change: 12,
//   },
//   {
//     id: 2,
//     title: "Stock",
//     number: 8.236,
//     change: -2,
//   },
//   {
//     id: 3,
//     title: "Revenue",
//     number: 6.642,
//     change: 18,
//   },
// ];
import { Product, User } from "./models";
import  {connectToDB}  from "./utils";
import mongoose from "mongoose";

const ITEM_PER_PAGE = 2;

/* ================= USERS ================= */

export const fetchUsers = async (q: string = "", page: number = 1) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDB();

    const count = await User.countDocuments({
      username: { $regex: regex },
    });

    const users = await User.find({
      username: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean(); // 🔥 IMPORTANT

    return { count, users };
  } catch (error) {
    console.error("fetchUsers error:", error);
    throw new Error("Failed to fetch users");
  }
};

export const fetchUser = async (id: string) => {
  try {
    await connectToDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID");
    }

    const user = await User.findById(id).lean();

    return user;
  } catch (error) {
    console.error("fetchUser error:", error);
    throw new Error("Failed to fetch user");
  }
};

/* ================= PRODUCTS ================= */

export const fetchProducts = async (q: string = "", page: number = 1) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDB();

    const count = await Product.countDocuments({
      title: { $regex: regex },
    });

    const products = await Product.find({
      title: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean(); // 🔥 IMPORTANT

    return { count, products };
  } catch (error) {
    console.error("fetchProducts error:", error);
    throw new Error("Failed to fetch products");
  }
};

export const fetchProduct = async (id: string) => {
  try {
    await connectToDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid product ID");
    }

    const product = await Product.findById(id).lean();

    return product;
  } catch (error) {
    console.error("fetchProduct error:", error);
    throw new Error("Failed to fetch product");
  }
};

/* ================= DASHBOARD CARDS ================= */

export const cards = [
  {
    id: 1,
    title: "Total Users",
    number: 10928,
    change: 12,
  },
  {
    id: 2,
    title: "Stock",
    number: 8236,
    change: -2,
  },
  {
    id: 3,
    title: "Revenue",
    number: 6642,
    change: 18,
  },
];
