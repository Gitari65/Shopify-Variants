import React, { useState,useEffect } from "react";
import { doc,collection, setDoc ,deleteDoc,getDocs} from "firebase/firestore";
import firestore from '../config/firebase_Config';
import Products from "./Products";

const AddProduct = ({ setShowModal,fetchProducts,displayProductDetails }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  

  const saveNewProduct = async (title, description) => {
    const productRef = doc(firestore, "products", title);
    try {
      await setDoc(productRef, {
        title: title,
        description: description
      });
      setShowModal(false); // Close the modal when product is added successfully
      alert("Product added successfully!");
      fetchProducts();
      displayProductDetails(title,description);
      
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleCancel = () => {
    setShowModal(false); // Close the modal when Cancel button is clicked
  };

  return (
    <div className="add-product modal" style={{ display: 'block' }} id="add-product" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Add New Product</h2>
            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleCancel}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="productTitle" className="form-label">
                  Product Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter product title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productDescription" className="form-label">
                  Product Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter product description"
                />
              </div>

              <button type="button" onClick={() => saveNewProduct(title, description)
              } className="btn btn-submit">
                Save and continue
              </button>
              <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
function GetProducts({displayProductDetails}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestore, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsData = [];
        productsSnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      const productRef = doc(firestore, 'products', productId);
      await deleteDoc(productRef);
      setProducts(products.filter(product => product.id !== productId));
      console.log("Product deleted successfully!");
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="stored-products">
      <h2>Products</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>displayProductDetails(product.title,product.description)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});//[title,description
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const productsCollection = collection(firestore, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsData = [];
      productsSnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const displayModal = () => {
    setShowModal(!showModal);
    if(showProductDetails){
      setShowProductDetails(!showProductDetails);
    }
     // Toggle the showModal state
  }
  const displayProductDetails = (title,description) => {
    setShowProductDetails(!showProductDetails); // Toggle the showProductDetails state
    setSelectedProduct({title:title,description:description});

  }

  return (
    <div className="home">
      <button className="btn-addnew" onClick={displayModal}>+ Add new product</button>
     
      {showModal && <AddProduct setShowModal={setShowModal} fetchProducts={fetchProducts} displayProductDetails={displayProductDetails}  />} {/* Pass setShowModal as a prop */}
  {showProductDetails?(<Products setShowProductDetails={setShowProductDetails}
    selectedProduct={selectedProduct}/>):(<GetProducts displayProductDetails={displayProductDetails}/>)}
    </div>
  );
}

export default Home;
