const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const multer  = require('multer');
const cors = require("cors");
const ProductModel = require("./Models/ProductsItems");
const OrderModel = require("./Models/Orders");
const CostsModel = require("./Models/Costs");
const MaterialModel = require("./Models/MaterailEntity");
const RollsModel = require("./Models/Rolls");
const ReelsModel = require("./Models/Reels");
const app = express();
app.use(cors()); //sever side to frontend
app.use(express.json()); // conversion
mongoose.connect("mongodb://127.0.0.1:27017/Cardboard");

//Carboard Box APIS
app.get("/", (req, res) => {
  ProductModel.find({})
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

//cardboard design image upload code here

const storage = multer.diskStorage({
  destination: function (req, file, cb){
      return cb(null, path.join(__dirname,"../Client/public/uploads"))
  },
  filename: function (req, file, cb){
      cb(null, `${Date.now()}-canvasCut.png`);
  }
});

const upload = multer({ storage })

app.post('/upload', upload.single("imageData"), (req, res) => {
  res.json(req.file.filename);
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

// Cardboard : Rolls APIS

//API#1 : Getting all Rolls Data
app.get("/rolls", (req, res) => {
  RollsModel.find({})
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

//API#2: Getting Single Roll Data by its Name to get its size for Stock data
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
//API#1: Getting Single Roll Data by its ID
app.get("/singleroll/:id", (req, res) => {
  const id = req.params.id;
  RollsModel.findById({ _id: id })
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
app.put("/add-roll-stock", async (req, res) => {
  const { type, size, quantity } = req.body;

  try {
    const roll = await RollsModel.findOne({ Type: type });

    if (roll) {
      const sizeData = roll.Sizes.find((obj) => obj.Size == size);

      if (sizeData) {
        sizeData.Quantity += quantity;
        await roll.save();

        res.json({ message: "Stock updated successfully" });
      } else {
        res.status(404).json({ error: "Size not found" });
      }
    } else {
      res.status(404).json({ error: "Type not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Reducing Stock Quantity
app.put("/reduce-roll-stock", async (req, res) => {
  const { type, size, quantity } = req.body;

  try {
    const roll = await RollsModel.findOne({ Type: type });

    if (roll) {
      const sizeData = roll.Sizes.find((obj) => obj.Size == size);

      if (sizeData) {
        sizeData.Quantity -= quantity;
        await roll.save();

        res.json({ message: "Stock updated successfully" });
      } else {
        res.status(404).json({ error: "Size not found" });
      }
    } else {
      res.status(404).json({ error: "Type not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
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

// Cardboard : Reels APIS
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
app.post("/add-reel", async (req, res) => {
  const data = await ReelsModel.updateOne(
    {
      Type: req.body.type,
      "Sizes.Size": req.body.size,
    },
    { $push: { "Sizes.$.Weight": req.body.weightData } }
  );
  res.status(201).json({ data });
});

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

        console.log(data, selectedSize, weightObj);
        data.save();

        return res.json({ chunk });
      })
      .catch((error) => res.json(error));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//deleting specific reel across vender

app.delete("/delete-reel/:id", async (req, res) => {
  let id = req.params.id;

  const data = await ReelsModel.updateOne(
    {
      Type: req.query.type,
      "Sizes.Size": req.query.size,
    },
    { $pull: { "Sizes.$.Weight": { _id: id } } }
  ).then((data) => res.status(201).json({ data }));
});

//run server
app.listen(3001, () => {
  console.log("server is running on 3001");
});
