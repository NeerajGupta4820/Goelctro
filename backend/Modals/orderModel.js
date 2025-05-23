import mongoose from "mongoose"
const schema = new mongoose.Schema(
  {
    shippingInfo: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pinCode: { type: Number, required: true },
    },
    user: { 
      type: mongoose.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    subtotal: { 
      type: Number,
      required: true 
    },
    tax: { 
      type: Number, 
      required: true 
    },
    shippingCharges: { 
      type: Number, 
      required: true 
    },
    discount: { 
      type: Number, 
      required: true 
    },
    total: { 
      type: Number, 
      required: true 
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered"],
      default: "Processing",
    },
    orderItems: [
      {
        name: String,
        photo: String,
        price: Number,
        quantity: Number,
        productId: { type: mongoose.Types.ObjectId, ref: "Product" },
      },
    ],
    paymentDetails: {
      razorpayOrderId: { type: String, required: true },
      amount: { type: Number, required: true },
      currency: { type: String, required: true },
      status: { type: String, default: "Pending" },
      paymentId: { type: String },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", schema);
export default Order;
