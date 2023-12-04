import { useEffect } from "react"
import CanvasContainer from "./CanvasContainer/CanvasContainer"
import ItemCard from "./ItemCard/ItemCard"
import Design from "./MenuDetails/Design"
import Material from "./MenuDetails/Material"
import Quantity from "./MenuDetails/Quantity"
import Size from "./MenuDetails/Size"
import SideMenu from "./SideMenu/SideMenu"
import Products from './MenuDetails/Products'

import { useDispatch, useSelector } from 'react-redux';
import { selectDesign } from "../Store/slices/designSelection"
import { setSize } from "../Store/slices/sizeSlice"
import { changeMaterial } from "../Store/slices/materialSlice"
import { setQuantity } from "../Store/slices/quantitySlice"
import { imagesCollector } from "../Store/slices/imagesContainerSlice"

const Container3DBox = ({ products, materials }) => {
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
        dispatch(imagesCollector({
            front: '',
            left: '',
            right: '',
            back:'',
            bottom:''
        }))
    }, [])



    return (
        <>
            <div className=" manipulator container-fluid ps-0">
                <div className="row">
                    <div className="col-1">
                        <SideMenu boxType={'Mailer Box'} />
                    </div>
                    <div className={designOption ? "col-4 rounded" : "col-2 rounded"} style={{ backgroundColor: "#F3F3F3" }}>
                        {sideMenuSelection === 'size' && <Size products={products} boxType={'Mailer Box'} />}
                        {sideMenuSelection === 'design' && <Design />}
                        {sideMenuSelection === 'material' && <Material />}
                        {sideMenuSelection === 'quantity' && <Quantity />}
                        {sideMenuSelection === 'products' && <Products />}
                    </div>
                    <div className={!designOption ? "col-6" : 'col-4'} >
                        <CanvasContainer />
                    </div>
                    <div className="col-3">
                        <ItemCard boxType={'Mailer Box'} products={products} materials={materials} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Container3DBox