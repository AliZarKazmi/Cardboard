import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, setTotalPrice } from "../../Pages/ShoppingCart/CartSlice";
import { setSize } from "../../Store/slices/sizeSlice";

const ItemCard = ({ boxType, products, materials }) => {

    const dispatch = useDispatch();

    const materialName = useSelector((state) => {
        return state.materialChanged
    });

    const quantityValue = useSelector((state) => {
        return state.quantityChanged
    });


    const dimenstionsValue = useSelector((state) => {
        return state.sizeChanged
    });

    const sideImages = useSelector((state) => {
        return state.imagesConainer
    });

    // for new designed boxes
    const canvasExported = useSelector((state) => { 
        return state.canvasAsImg;
      })
    ////////////////////////////

    const [product, setProduct] = useState(null);

    useEffect(() => {
        products?.map((p) => {
            p?.cardboardname === boxType && setProduct(p);
        })
    }, [products])

    const [material, setMaterial] = useState(null);
    const [price, setPrice] = useState(0);

    const priceCalculator = () => {
        if (dimenstionsValue.length && dimenstionsValue.width && quantityValue) {
            const pricePerSheet =
                (((dimenstionsValue.length * dimenstionsValue.width * 210) / 15500) *
                    material?.paperRate) /
                100;
            const pricePerRoll =
                (dimenstionsValue.width * material?.rollRate) /
                (2400 / dimenstionsValue.length);

            const pricePerPiece = Number.parseFloat(
                (pricePerSheet + pricePerRoll + 14 + 5 + 2).toFixed(0)
            );
            setPrice(pricePerPiece);
        }
    }

    useEffect(()=>{
        priceCalculator()
    })

    useEffect(() => {
        setMaterial(materials?.find((m) => m.materailName === materialName))
    }, [materials])

    useEffect(() => {
        setMaterial(materials?.find((m) => m.materailName === materialName))
    }, [materialName])

    useEffect(() => {
        priceCalculator();
    }, [dimenstionsValue, materialName, quantityValue]);

    const [orderState, setOrderState] = useState();

    const handleCheckOut = () => {
        setOrderState(
            {
                id: Date.now(),
                ThreeD: true,
                name: product.cardboardname,
                img: '/img/cardboard_header_image.png',
                material: materialName,
                quantity: Number(quantityValue),
                pricePerPiece: price,
                dimension: dimenstionsValue,
                price: Number(price * quantityValue),
                sides_design: boxType !== "Mailer Box" ? canvasExported : sideImages,
                printedSides: 4,
                thickness: 3,
            }
        );
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        if (orderState) {
            dispatch(addToCart(orderState));
            dispatch(setTotalPrice());
        }
    }, [orderState])
    

    return (
        <>
            <div className=" d-flex justify-content-between align-items-center">
                <div className="card mt-2 shadow">
                    <div className="cardHead card-body">
                        <h5 className="card-title" style={{ color: '#15807a' }}>{product?.cardboardname}</h5>
                        <div className=" paraDiv">
                            <p className="card-text text-secondary">{product?.description}</p>
                        </div>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center flex-row fs-6 fw-bold pt-3 pb-3">
                            <span className=" text-secondary">Size</span>
                            <span>{`${dimenstionsValue.length}" x ${dimenstionsValue.width}" x ${dimenstionsValue.depth}"`}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center flex-row fs-6 fw-bold pt-3 pb-3">
                            <span className=" text-secondary">Material</span>
                            <span>{materialName}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center flex-row fs-6 fw-bold pt-2 pb-2">
                            <span className=" text-secondary w-50">Quantity</span>
                            <span style={{ width: 35 + "%" }} >
                                <input className="form-control form-control-lg" type="number" aria-label=".form-control-lg" value={quantityValue} disabled />
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center flex-row fs-6 fw-bold pt-3 pb-3">
                            <span className=" text-secondary">Unit price</span>
                            <span>Rs. {price}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center flex-row fs-6 fw-bold pt-3 pb-3"
                            style={{ backgroundColor: "#F3F3F3" }}
                        >
                            <span className=" text-secondary">Subtotal</span>
                            <span style={{ color: '#15807a' }}>Rs. {price * quantityValue}</span>
                        </li>
                    </ul>
                    <div className="card-body p-0 m-0 rounded-bottom" style={{ height: 4 + "rem" }}>
                        <button type="button"
                            className="btn btn-lg h-100 w-100 rounded-bottom text-white"
                            style={{ borderRadius: 0 + 'px', background: "#15807a", border: '2px solid #15807a' }}
                            onClick={handleCheckOut}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemCard