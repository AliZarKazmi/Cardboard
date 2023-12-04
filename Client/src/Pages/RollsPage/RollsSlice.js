import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getRolls = createAsyncThunk("Rolls/getRolls", async (thunkApi) => {
  const res = await fetch("http://localhost:3001/rolls").then((data) =>
    data.json()
  );
  return res;
});
export const getRollById = createAsyncThunk(
  "Rolls/getRollsByID",
  async (id, thunkApi) => {
    const res = await fetch(`http://localhost:3001/roll/${id}`)
      .then((data) => data.json())
      .catch((e) => {
        console.log(e);
      });
    return res;
  }
);
const RollsSlice = createSlice({
  name: "Rolls",
  initialState: {
    Config: {
      item: {},
      quantity: "",
      pricePerPiece: 0,
      totalPrice: 0,
      type: "",
      size: "",
    },
    Rolls: [],
    RollById: {},
  },
  reducers: {
    setRollQuantity(state, action) {
      if (action.payload > 0) {
        state.Config.quantity = Number.parseInt(action.payload);
      } else {
        state.Config.quantity = 0;
      }
    },

    setRoll(state, action) {
      state.Config.item = action.payload;
    },
    setSize(state, action) {
      state.Config.size = Number.parseInt(action.payload);
    },
    setType(state, action) {
      state.Config.type = action.payload;
    },
    setRollPrice(state, action) {
      state.Config.totalPrice = action.payload.price;
      state.Config.pricePerPiece = action.payload.pricePerPiece;
    },
    resetRollConfig(state, action) {
      state.Config = {
        item: "",
        quantity: "",
        pricePerPiece: 0,
        totalPrice: 0,
        size: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRolls.fulfilled, (state, action) => {
      state.Rolls = action.payload;
    });
    builder.addCase(getRollById.fulfilled, (state, action) => {
      state.RollById = action.payload;
    });
  },
});
export const selectRolls = (state) => {
  return state.RollsSlice.Rolls;
};
export const selectRollById = (state) => {
  return state.RollsSlice.RollById;
};
export const selectRollConfig = (state) => {
  return state.RollsSlice.Config;
};
export const {
  setRollQuantity,
  setRoll,
  resetRollConfig,
  setRollPrice,
  setSize,
  setType,
} = RollsSlice.actions;
export default RollsSlice.reducer;
