import { get } from "mongoose";
import { cartModel } from "../models/CartModel.js";
import productModel from "../models/product.js";
import createHttpError from "http-errors";

//helper function to get a cart by userId or guestId

const getCart = async (userId, guestId) => {
  if (userId) {
    return await cartModel.findOne({ userId });
  } else if (guestId) {
    return await cartModel.findOne({ guestId });
  }
  return null;
};

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity, sizes, userId, guestId } = req.body;

    const product = await productModel.findById(productId);

    if (!product) {
      return next(createHttpError(404, "Product not found"));
    }

    //   determin if the user is loggedin or guest
    const cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId && p.sizes === sizes,
      );

      if (productIndex > -1) {
        // if the product alreadt exist
        cart.products[productIndex].quantity += 1;

      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          discountPrice: product.discountPrice,
          sizes: sizes,
          quantity,
        });
      }
      // recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (accu, item) => accu + item.discountPrice * item.quantity,
        0,
      );
      await cart.save();
      return res.status(200).json({ cart });
    } else {
      // create a new cart for guest or user
      const newCartItem = await cartModel.create({
        userId: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            discountPrice: product.discountPrice,
            sizes: sizes,
            quantity: quantity,
          },
        ],
        totalPrice: product.discountPrice * quantity,
      });
      return res.status(201).json(newCartItem);
    }
  } catch (err) {
    console.log(err);
    return next(createHttpError(500, "something went wrong"));
  }
};

const updateCart = async (req, res, next) => {
  const { productId, sizes, quantity, price, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);

    if (!cart) {
      return next(createHttpError(404, "Cart not found"));
    }
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId && p.sizes === sizes,
    );
    if (productIndex > -1) {
      //update the product quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); // it removes the product if the product quantity is zero
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.discountPrice * item.quantity,
        0,
      );

      await cart.save();

      return res.status(200).json({ cart });
    } else {
      return next(createHttpError(404, "product not found in cart"));
    }
  } catch (err) {
    console.log(err);
    return next(createHttpError(500, "failed to update product"));
  }
};

const deleteCartItem = async (req, res, next) => {
  const { productId, sizes, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);

    if (!cart) {
      return next(createHttpError(404, "Cart not found"));
    }
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId && p.sizes === sizes,
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      await cart.save();
      return res
        .status(200)
        .json({ cart, message: "Cart item removed sucessfully" });
    } else {
      return next(createHttpError(404, "Product not found in the cart"));
    }
  } catch (err) {
    console.log(err);
    return next(createHttpError(500, "failed to delete product"));
  }
};

const getCartItems = async (req, res, next) => {
  const { guestId, userId } = req.query;
  try {
    const cart = await getCart(userId, guestId);

    if (!cart) {
      return res.status(200).json({ cart: { products: [], totalPrice: 0 } });
    }

    return res.status(200).json({ cart });
  } catch (err) {
    console.log(err);
    return next(createHttpError(500, "failed to get cart items"));
  }
};

const mergeCarts = async (req, res, next) => {
  const { guestId } = req.body;

  try {
    const guestCart = await cartModel.findOne({ guestId });
    const userCart = await cartModel.findOne({ userId: req.user.userId });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" });
      }

      if (userCart) {
        //Merge guest cart into user cart
        guestCart.products.forEach((guestProduct) => {
          const productIndex = userCart.products.findIndex(
            (p) =>
              p.productId.toString() === guestProduct.productId.toString() &&
              p.sizes === guestProduct.sizes,
          );
          if (productIndex > -1) {
            // if the product already exists in user cart, update the quantity
            userCart.products[productIndex].quantity += guestProduct.quantity;
          } else {
            // if the product does not exist in user cart, add it
            userCart.products.push(guestProduct);
          }
        });

        // Recalculate total price
        userCart.totalPrice = userCart.products.reduce(
          (accu, item) => accu + item.price * item.quantity,
          0,
        );
        await userCart.save();
        // Delete guest cart
        try {
          await cartModel.deleteOne({ guestId });
          return res.status(200).json({ cart: userCart });
        } catch (err) {
          console.log(err);
          return next(createHttpError(500, "failed to delete guest cart"));
        }
      } else {
        // If user cart does not exist, assign guest cart to user
        guestCart.userId = req.user.userId;
        guestCart.guestId = undefined;
        await guestCart.save();
        return res.status(200).json({ cart: guestCart });
      }
    } else {
      if (userCart) {
        return res.status(200).json({ cart: userCart });
      }
      return res.status(400).json({ message: "No guest cart found" });
    }
  } catch (err) {
    console.log(err);
    return next(createHttpError(500, "failed to merge carts"));
  }
};

export { addToCart, updateCart, deleteCartItem, getCartItems, mergeCarts };
