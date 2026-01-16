/* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { revalidatePath } from "next/cache";
// import {  User } from "./models";
// import { connectToDB } from "./utils";
// import { redirect } from "next/navigation";
// import bcrypt from "bcryptjs";
// import { signIn } from "../auth";

// export const addUser = async (formData) => {
//   const { name, email, password } =
//     Object.fromEntries(formData);

//   try {
//     connectToDB();

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword
      
//     });
//      // phone
//       // address
//       // isAdmin
//       // isActive
//     await newUser.save();
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to create user!");
//   }

//   revalidatePath("/dashboard/users");
//   redirect("/dashboard/users");
// };

// export const updateUser = async (formData) => {
//   const { id, username, email, password, phone, address, isAdmin, isActive } =
//     Object.fromEntries(formData);

//   try {
//     connectToDB();

//     const updateFields = {
//       username,
//       email,
//       password,
//       phone,
//       address,
//       isAdmin,
//       isActive,
//     };

//     Object.keys(updateFields).forEach(
//       (key) =>
//         (updateFields[key] === "" || undefined) && delete updateFields[key]
//     );

//     await User.findByIdAndUpdate(id, updateFields);
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to update user!");
//   }

//   revalidatePath("/dashboard/users");
//   redirect("/dashboard/users");
// };

// export const addProduct = async (formData) => {
//   const { title, desc, price, stock, color, size } =
//     Object.fromEntries(formData);

//   try {
//     connectToDB();

//     const newProduct = new Product({
//       title,
//       desc,
//       price,
//       stock,
//       color,
//       size,
//     });

//     await newProduct.save();
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to create product!");
//   }

//   revalidatePath("/dashboard/products");
//   redirect("/dashboard/products");
// };

// export const updateProduct = async (formData) => {
//   const { id, title, desc, price, stock, color, size } =
//     Object.fromEntries(formData);

//   try {
//     connectToDB();

//     const updateFields = {
//       title,
//       desc,
//       price,
//       stock,
//       color,
//       size,
//     };

//     Object.keys(updateFields).forEach(
//       (key) =>
//         (updateFields[key] === "" || undefined) && delete updateFields[key]
//     );

//     await Product.findByIdAndUpdate(id, updateFields);
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to update product!");
//   }

//   revalidatePath("/dashboard/products");
//   redirect("/dashboard/products");
// };

// export const deleteUser = async (formData) => {
//   const { id } = Object.fromEntries(formData);

//   try {
//     connectToDB();
//     await User.findByIdAndDelete(id);
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to delete user!");
//   }

//   revalidatePath("/dashboard/products");
// };

// export const deleteProduct = async (formData) => {
//   const { id } = Object.fromEntries(formData);

//   try {
//     connectToDB();
//     await Product.findByIdAndDelete(id);
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to delete product!");
//   }

//   revalidatePath("/dashboard/products");
// };

// export const authenticate = async (prevState, formData) => {
//   const { username, password } = Object.fromEntries(formData);

//   try {
//     await signIn("credentials", { username, password });
//   } catch (err) {
//     if (err.message.includes("CredentialsSignin")) {
//       return "Wrong Credentials";
//     }
//     throw err;
//   }
// };

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

import { User, Product } from "./models";
import { connectToDB } from "./utils";
import { signIn } from "next-auth/react"

/* ================= ADD USER ================= */

export const addUser = async (formData: FormData) => {
  const { name, email, password } = Object.fromEntries(formData) as {
    name: string;
    email: string;
    password: string;
  };

  try {
    await connectToDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
  } catch (error) {
    console.error("addUser error:", error);
    throw new Error("Failed to create user");
  }

  revalidatePath("/admin/dashboard/users");
  redirect("/admin/dashboard/users");
};

/* ================= UPDATE USER ================= */

export const updateUser = async (formData: FormData) => {
  const {
    id,
    username,
    email,
    password,
    phone,
    address,
    isAdmin,
    isActive,
  } = Object.fromEntries(formData) as Record<string, string>;

  try {
    await connectToDB();

    const updateFields: any = {
      username,
      email,
      phone,
      address,
      isAdmin,
      isActive,
    };

    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    Object.keys(updateFields).forEach(
      (key) => updateFields[key] === "" && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.error("updateUser error:", error);
    throw new Error("Failed to update user");
  }

  revalidatePath("/admin/dashboard/users");
  redirect("/admin/dashboard/users");
};

/* ================= DELETE USER ================= */

export const deleteUser = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData) as { id: string };

  try {
    await connectToDB();
    await User.findByIdAndDelete(id);
  } catch (error) {
    console.error("deleteUser error:", error);
    throw new Error("Failed to delete user");
  }

  revalidatePath("/admin/dashboard/users");
};

/* ================= ADD PRODUCT ================= */

export const addProduct = async (formData: FormData) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData) as Record<string, string>;

  try {
    await connectToDB();

    const newProduct = new Product({
      title,
      desc,
      price,
      stock,
      color,
      size,
    });

    await newProduct.save();
  } catch (error) {
    console.error("addProduct error:", error);
    throw new Error("Failed to create product");
  }

  revalidatePath("/admin/dashboard/products");
  redirect("/admin/dashboard/products");
};

/* ================= UPDATE PRODUCT ================= */

export const updateProduct = async (formData: FormData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData) as Record<string, string>;

  try {
    await connectToDB();

    const updateFields: any = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) => updateFields[key] === "" && delete updateFields[key]
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.error("updateProduct error:", error);
    throw new Error("Failed to update product");
  }

  revalidatePath("/admin/dashboard/products");
  redirect("/admin/dashboard/products");
};

/* ================= DELETE PRODUCT ================= */

export const deleteProduct = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData) as { id: string };

  try {
    await connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (error) {
    console.error("deleteProduct error:", error);
    throw new Error("Failed to delete product");
  }

  revalidatePath("/admin/dashboard/products");
};

/* ================= LOGIN ================= */

export const authenticate = async (
  _prevState: string | undefined,
  formData: FormData
) => {
  const { username, password } = Object.fromEntries(formData) as {
    username: string;
    password: string;
  };

  try {
    await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    return "success";
  } catch (error: any) {
    if (error?.message?.includes("CredentialsSignin")) {
      return "Wrong credentials";
    }
    throw error;
  }
};
