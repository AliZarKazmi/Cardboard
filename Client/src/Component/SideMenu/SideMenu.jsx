import React, { useEffect, useRef, useState } from 'react'; // Import useState
import { MdPhotoSizeSelectSmall, MdOutlineStyle } from 'react-icons/md';
import { FaBrush } from 'react-icons/fa6';
import { FaCalculator, FaBoxOpen } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { selectDesign } from '../../Store/slices/designSelection';
import { setSideMenuSelection } from '../../Store/slices/sideMenuSelection';
import '../componantsStyle.css';

const iconColor = "#15807a";

const arrObj1 = [
  {
    icon: <MdPhotoSizeSelectSmall style={{ color: iconColor }} />,
    name: 'size',
  },
  {
    icon: <MdOutlineStyle style={{ color: iconColor }} />,
    name: 'material',
  },
  {
    icon: <FaBrush style={{ color: iconColor }} />,
    name: 'design',
  },
  {
    icon: <FaCalculator style={{ color: iconColor }} />,
    name: 'quantity',
  },
  {
    icon: <FaBoxOpen style={{ color: iconColor }} />,
    name: 'products',
  },
];

const arrObj2 = [
  {
    icon: <MdPhotoSizeSelectSmall style={{ color: iconColor }} />,
    name: 'size',
  },
  {
    icon: <FaBrush style={{ color: iconColor }} />,
    name: 'design',
  },
  {
    icon: <FaCalculator style={{ color: iconColor }} />,
    name: 'quantity',
  },
  {
    icon: <FaBoxOpen style={{ color: iconColor }} />,
    name: 'products',
  },
];

const SideMenu = ({boxType}) => {
  const clickRef = useRef();
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState('size'); // State to track the active item
  const [menuIcons, setMenuIcons] = useState(arrObj1);

  const setSelection = (s) => {
    if (s === 'design') {
      dispatch(selectDesign(true));
    }
    else{
      dispatch(selectDesign(false));
    }
  };

  const handleClick = (n) => {
    setSelection(n);
    dispatch(setSideMenuSelection(n));
    setActiveItem(n);
  };

  useEffect(() => {
    handleClick('size');
    if(boxType === 'Mailer Box'){
        setMenuIcons(arrObj1)
    } else{
      setMenuIcons(arrObj2)
    }
  }, [])


  return (
    <>
      <div className="d-flex flex-column flex-shrink-0 bg-light rounded-end shadow" style={{ width: '5.5rem' }}>
        <ul className="nav nav-flush flex-column mb-auto text-center vh-100">
          {menuIcons.map((item, index) => (
            <li
              key={index}
              ref={item.name === 'size' ? clickRef : null}
              className={`menuItem nav-item d-flex justify-content-center align-content-center flex-column ${activeItem === item.name ? 'active' : ''
                }`}
              onClick={() => handleClick(item.name)}
            >
              <span className=" nav-link p-1 py-3 border-bottom fs-2 rounded-end d-flex justify-content-center align-items-center flex-column" style={{ color: '#F7744F' }}>
                {item.icon}
                <span className='itemSpan py-1 text-uppercase' style={{ color: "#aeaeae" }} >
                  {item.name}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideMenu;
