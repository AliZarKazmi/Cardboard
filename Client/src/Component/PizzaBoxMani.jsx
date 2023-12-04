import { useEffect } from "react"
import CanvasContainer from "./CanvasContainer/CanvasContainer"
import ItemCard from "./ItemCard/ItemCard"
import Design from "./PizzaBox/Design"
import Material from "./MenuDetails/Material"
import Quantity from "./MenuDetails/Quantity"
import Size from "./MenuDetails/Size"
import SideMenu from "./SideMenu/SideMenu"
import Scene from './PizzaBox/Scene';
import Products from './MenuDetails/Products'

import { useDispatch, useSelector } from 'react-redux';
import { selectDesign } from "../Store/slices/designSelection"
import { setSize } from "../Store/slices/sizeSlice"
import { changeMaterial } from "../Store/slices/materialSlice"
import { setQuantity } from "../Store/slices/quantitySlice"

const PizzaBoxMani = ({ products, materials }) => {
    const dispatch = useDispatch();
    const designOption = useSelector((state) => {
        return state.designSelected
    });

    const sideMenuSelection = useSelector((state) => {
        return state.sideMenuSelectedItem
    });

    useEffect(() => {
        dispatch(selectDesign(false));

        dispatch(setSize({
            length: 10,
            width: 10,
            depth: 10,
        }));

        dispatch(changeMaterial('Kraft'));
        dispatch(setQuantity(500));

    }, [])

    return (
        <>
            <div className=" manipulator container-fluid ps-0">
                <div className="row">
                    <div className="col-1">
                        <SideMenu boxType={'Pizza Box'} />
                    </div>
                    <div className={designOption ? "col-4 rounded" : "col-2 rounded"} style={{ backgroundColor: "#F3F3F3" }}>
                        {sideMenuSelection === 'size' && <Size products={products} boxType={'Pizza Box'} />}
                        {sideMenuSelection === 'design' && <Design />}
                        {sideMenuSelection === 'material' && <Material />}
                        {sideMenuSelection === 'quantity' && <Quantity />}
                        {sideMenuSelection === 'products' && <Products />}
                    </div>
                    <div className={!designOption ? "col-6" : 'col-4'} >
                        <Scene />
                    </div>
                    <div className="col-3">
                        <ItemCard boxType={'Pizza Box'} products={products} materials={materials} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PizzaBoxMani