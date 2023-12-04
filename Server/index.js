const express = require("express");
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');
const multer  = require('multer');
const cors = require("cors");
const ProductModel = require("./Models/ProductsItems");
const OrderModel = require("./Models/Orders");
const CostsModel = require("./Models/Costs");
const MaterialModel = require("./Models/MaterailEntity");
const RollsModel = require("./Models/Rolls");
const ReelsModel = require("./Models/Reels");
const loginRouter = require("./loginRouter");
const app = express();
app.use(cors()); //sever side to frontend
app.use(express.json()); // conversion
app.use("/", loginRouter);
mongoose
  .connect(
    "mongodb+srv://ammarzafar4372:GYVIHzXkqKB6Z1X4@cluster0.pksbjud.mongodb.net/Cardboard",
    {
      serverSelectionTimeoutMS: 5000,
    }
  )
  .then((res) => {
    console.log("Mongo DB Connected");
  })
  .catch((err) => console.log(err));

const reelQuantity = async (req, res, next) => {
  const result = await ReelsModel.aggregate([
    { $match: { Type: req.body.type } },
    { $unwind: "$Sizes" },
    { $unwind: "$Sizes.Weight" },
    { $group: { _id: "", quantity: { $sum: 1 } } },
  ]);

  await ReelsModel.updateOne(
    {
      Type: req.body.type,
    },
    { Quantity: result.quantity }
  );
  res.status(201).json({ data: req.data });
};
const rollQuantity = async (req, res, next) => {
  const result = await RollsModel.aggregate([
    { $match: { Type: req.body.type } },
    { $unwind: "$Sizes" },
    { $group: { _id: "", quantity: { $sum: "$Sizes.Quantity" } } },
  ]);

  await RollsModel.updateOne(
    {
      Type: req.body.type,
    },
    { Quantity: result.quantity }
  );
  res.status(201).json({ data: req.data });
};

//Carboard Box EndpointS
app.get("/", (req, res) => {
  ProductModel.find({})
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

//cardboard design image upload code here

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.join(__dirname, "../Client/public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-canvasCut.png`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("imageData"), (req, res) => {
  res.json(req.file.filename);
});

app.post('/save-image', (req, res) => {
  const { dataURL, imgName } = req.body;

  // Remove header from base64 encoded image
  const base64Data = dataURL.replace(/^data:image\/png;base64,/, '');

  // Save the image to a specific folder (create the folder if it doesn't exist)
  const uploadsFolder = path.join(__dirname,"../Client/public/uploads")
  const imagePath = `${uploadsFolder}/${imgName}`; // Change this path to your desired folder

  fs.writeFile(imagePath, base64Data, 'base64', (error) => {
    if (error) {
      res.status(500).json({ error: 'Failed to save the image' });
    } else {
      res.json({ message: 'Image saved successfully' });
    }
  });
});

// cardboard design image upload end here

//Get Single Item
app.get("/cardboard/getItem/:id", (req, res) => {
  const id = req.params.id;
  ProductModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});
// Modify/Update the specific data in db
app.put("/updateItems/:id", (req, res) => {
  const id = req.params.id;
  ProductModel.findByIdAndUpdate(
    { _id: id },
    {
      cardboardname: req.body.cardboardname,
      length: req.body.length,
      width: req.body.width,
      depth: req.body.depth,
      quatity: req.body.quatity,
      rate: req.body.rate,
    }
  )
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

// adding data to the db
app.post("/orderDetails", (req, res) => {
  OrderModel.create(req.body)
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

app.get("/orders", (req, res) => {
  OrderModel.find({})
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});
app.get("/orderDetails/:id", (req, res) => {
  const id = req.params.id;

  OrderModel.findById({ _id: id })
    .then((users) => {
      res.json(users);
    })
    .catch((error) => res.json(error));
});

app.get("/cost-Info", (req, res) => {
  CostsModel.find({})
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

app.get("/costprice/:id", (req, res) => {
  const id = req.params.id;

  CostsModel.findById({ _id: id })
    .then((users) => {
      res.json(users);
    })
    .catch((error) => res.json(error));
});

app.put("/update-Cost-Price/:id", (req, res) => {
  const id = req.params.id;
  CostsModel.findByIdAndUpdate(
    { _id: id },
    {
      labor: req.body.labor,
      rent: req.body.rent,
      printedSides: req.body.printedSides,
    }
  )
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

app.get("/material-details", (req, res) => {
  MaterialModel.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});

app.get("/material-Cost-Price/:id", (req, res) => {
  const id = req.params.id;

  MaterialModel.findById({ _id: id })
    .then((users) => {
      res.json(users);
    })
    .catch((error) => res.json(error));
});
app.put("/update-material-Cost-Price/:id", (req, res) => {
  const id = req.params.id;
  MaterialModel.findByIdAndUpdate(
    { _id: id },
    {
      materailName: req.body.materailName,
      paperRate: req.body.paperRate,
      rollRate: req.body.rollRate,
      gamrige: req.body.gamrige,
    }
  )
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

// Cardboard : Rolls EndpointS

//Endpoint#1 : Getting all Rolls Data
app.get("/rolls", (req, res) => {
  RollsModel.find({ Type: { $not: /Thin/ } })
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

//Endpoint#2: Getting Single Roll Data by its Name to get its size for Stock data
app.get("/singleroll/:typename", (req, res) => {
  const typename = req.params.typename;

  RollsModel.find({ Type: typename })
    .select({ "Sizes.Size": 1 })
    .limit(1)
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      res.json(err);
    });
});
//Endpoint#1: Getting Single Roll Data by its ID
app.get("/roll/:id", (req, res) => {
  const id = req.params.id;
  RollsModel.findOne({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

//filter Quantity on the basis of Size and id
app.get("/singleroll/:id/:size", (req, res) => {
  const id = req.params.id;
  const size = req.params.size;
  RollsModel.findOne({ _id: id, "Sizes.Size": size })
    .select({ Sizes: 1 })
    .exec()
    .then((data) => {
      const Size = data.Sizes.filter((obj) => obj.Size == size)[0];

      res.json(Size);
    })
    .catch((error) => res.json(error));
});

//Adding New Quantity stocks in the actual avalaible stock
app.put(
  "/add-roll-stock",
  async (req, res, next) => {
    const { type, size, quantity } = req.body;

    try {
      const roll = await RollsModel.findOne({ Type: type });

      if (roll) {
        const sizeData = roll.Sizes.find((obj) => obj.Size == size);

        if (sizeData) {
          sizeData.Quantity += quantity;
          await roll.save();
          next();
        } else {
          res.status(404).json({ error: "Size not found" });
        }
      } else {
        res.status(404).json({ error: "Type not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  rollQuantity
);

//Reducing Stock Quantity
app.put(
  "/reduce-roll-stock",
  async (req, res, next) => {
    const { type, size, quantity } = req.body;

    try {
      const roll = await RollsModel.findOne({ Type: type });

      if (roll) {
        const sizeData = roll.Sizes.find((obj) => obj.Size == size);

        if (sizeData) {
          sizeData.Quantity -= quantity;
          await roll.save();
          next();
        } else {
          res.status(404).json({ error: "Size not found" });
        }
      } else {
        res.status(404).json({ error: "Type not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  rollQuantity
);
//Update Rate of Rolls
app.put("/updaterolls/:id", async (req, res) => {
  const id = req.params.id;
  const { Rate, size, Quantity } = req.body;

  try {
    const rollObj = await RollsModel.findOne({ _id: id, "Sizes.Size": size });

    if (rollObj) {
      // Update Rate and Quantity
      rollObj.Rate = Rate;
      rollObj.Sizes.find((obj) => obj.Size == size).Quantity = Quantity;

      // Save the updated roll
      await rollObj.save();
    } else {
      throw new Error("Roll not found");
    }

    res.json({ rollObj });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Cardboard : Reels EndpointS
app.get("/reels", (req, res) => {
  ReelsModel.find({})
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

//stock in reel get data
app.get("/stock-in-singlereel/:type", (req, res) => {
  // const id = req.params.id;
  const typeName = req.params.type;

  // res.json(typeName);
  ReelsModel.findOne({ Type: typeName })
    .select({ "Sizes.Size": 1 })
    .exec()
    .then((data) => {
      const sizes = data.Sizes.map((obj) => obj.Size);

      res.json(sizes);
    })
    .catch((error) => res.json(error));
});
app.get("/reels/:id", (req, res) => {
  const id = req.params.id;
  ReelsModel.findOne({ _id: id })
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});
app.get("/singlereel/:id/:size", (req, res) => {
  const id = req.params.id;
  const size = req.params.size;

  ReelsModel.findOne({ _id: id, "Sizes.Size": size })
    .select({ Sizes: 1 })
    .exec()
    .then((data) => {
      const Size = data.Sizes.filter((obj) => obj.Size == size)[0];

      res.json(Size);
    })
    .catch((error) => res.json(error));
});

//adding reel data in db
app.post(
  "/add-reel",
  async (req, res, next) => {
    const data = await ReelsModel.updateOne(
      {
        Type: req.body.type,
        "Sizes.Size": req.body.size,
      },
      { $push: { "Sizes.$.Weight": req.body.weightData } }
    );
    req.data = data;
    next();
  },
  reelQuantity
);

//geting details of Reels across type and size
app.get("/details-reels-data/:type/:size", async (req, res) => {
  const { type, size } = req.params;

  ReelsModel.findOne({
    Type: type,
    "Sizes.Size": size,
  })
    .select({ Sizes: 1 })
    .exec()
    .then((data) => {
      const selectedSize = data.Sizes.filter((obj) => obj.Size == size)[0];
      res.json({ weight: selectedSize.Weight });
    })
    .catch((error) => res.json(error));
});

//Updating Rate of Reels across Weight and its vendor

app.put("/updatereels/:id", (req, res) => {
  const id = req.params.id;
  const { Rate, size, vendorId } = req.body;
  try {
    ReelsModel.findOne({ _id: id, "Sizes.Size": size })
      .select({ Sizes: 1 })
      .exec()
      .then((data) => {
        const selectedSize = data.Sizes.filter((obj) => obj.Size == size)[0];

        const weightObj = selectedSize.Weight.filter(
          (obj) => obj._id == vendorId
        )[0];

        weightObj.Rate = Rate;

        data.save();

        return res.json({ chunk });
      })
      .catch((error) => res.json(error));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//deleting specific reel across vender

app.delete(
  "/delete-reel/:id",
  async (req, res, next) => {
    let id = req.params.id;

    const data = await ReelsModel.updateOne(
      {
        Type: req.query.type,
        "Sizes.Size": req.query.size,
      },
      { $pull: { "Sizes.$.Weight": { _id: id } } }
    );
    req.data = data;
    next();
  },
  reelQuantity
);

//run server
app.listen(3001, () => {
  console.log("server is running on 3001");
});
