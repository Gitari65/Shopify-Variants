import React from 'react';
//dashboard, orders, customers, products, settings icons from fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faUsers, faBox, faCog } from '@fortawesome/free-solid-svg-icons';
import shopify_logo from '../Assets/images/shopify_logo.png';


const homeIcon = <FontAwesomeIcon icon={faHome} />;
const ordersIcon = <FontAwesomeIcon icon={faShoppingCart} />;
const customersIcon = <FontAwesomeIcon icon={faUsers} />;
const productsIcon = <FontAwesomeIcon icon={faBox} />;
const settingsIcon = <FontAwesomeIcon icon={faCog} />;

function SideMenu() {
    return (
        <div className="side-menu">
        <div className="logo">
        <img  src={shopify_logo} alt="Logo" />
      </div>
            <ul>
                <li>
                    <a href="#">
                        {homeIcon}
                        <span>Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        {ordersIcon}
                        <span>Orders</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        {customersIcon}
                        <span>Customers</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        {productsIcon}
                        <span>Products</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        {settingsIcon}
                        <span>Settings</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default SideMenu;
