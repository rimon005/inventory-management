const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");
// schema design

const stockSchema = new mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: [true, "Please provide a name for this product"],
      trim: true,
      lowercase: true,
      minLength: [3, "Name must be at least 3 Characters"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "liter", "pcs", "bag"],
        message: "unit value can't be {VALUE} , must be kg/liter/pcs/bag",
      },
    },

    imageURLs: [
      {
        type: String,
        required: true,
        validator: [validator.isURL, "Please provide a valid url"],
      },
    ],
    price: {
      type: Number,
      required: true,
      min: [0, "Product price can't be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Product quantity can't be negative"],
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-off-stock", "discontinued"],
        message: "status can't be {VALUE} ",
      },
    },
    store: {
      name: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Please provide a store name"],
        lowercase: true,
        enum: {
          values: [
            "dhaka",
            "chattogram",
            "rajshahi",
            "sylhet",
            "khulna",
            "barishal",
            "rangpur",
            "mymensingh",
          ],
          message: "{VALUE} is not a valid name",
        },
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },
    suppliedBy: {
      name: {
        type: String,
        trim: true,
        required: [true, " Please provide a supplier name"],
      },
      id: {
        type: ObjectId,
        ref: "Supplier",
      },
    },
    sellCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// mongoose middleware for saving data : pre / post

stockSchema.pre("save", function (next) {
  console.log("Before saving data");
  next();
});

stockSchema.post("save", function (doc, next) {
  console.log("After saving data");
  next();
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
