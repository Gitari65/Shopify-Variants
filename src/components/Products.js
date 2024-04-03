import React, { useState } from "react";
import { doc, setDoc,getDocs,collection,updateDoc } from "firebase/firestore"; // Import Firestore methods
import firestore from '../config/firebase_Config';
import { useEffect } from "react";
//back font awesome icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
//back arrow font awesome icon
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
//import grip dots font awesome icon
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
//import dustbin font awesome icon
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';




const backArrow = <FontAwesomeIcon icon={faArrowLeft} />;
const dustbin = <FontAwesomeIcon icon={faTrashAlt} />;
const gripDots = <FontAwesomeIcon icon={faGripVertical}/>



function UpdateOptions({setOptions, selectedProduct,selectedOption, handleCloseModal }) {
  const [updatedOptionName, setUpdatedOptionName] = useState(selectedOption.id);
  const [updatedValues, setUpdatedValues] = useState(selectedOption.values);

  const handleOptionNameChange = (event) => {
      setUpdatedOptionName(event.target.value);
  };

  const handleValueChange = (index, event) => {
      const newValues = [...updatedValues];
      newValues[index] = event.target.value;
      setUpdatedValues(newValues);
  };

  const addValueInput = () => {
      setUpdatedValues([...updatedValues, '']);
  };

  const handleUpdateOption = async () => {
    const productId = selectedProduct.title; // Assuming selectedProduct contains the product document ID
    const optionId = selectedOption.id; // Assuming selectedOption contains the option document ID
    const optionRef = doc(firestore, 'products', productId, 'options', optionId);
  
    try {
      await updateDoc(optionRef, {
        name: updatedOptionName,
        values: updatedValues
      });
      console.log("Option updated successfully!");
      const updatedOptions = await fetchOptionsFromFirestore(productId);
     setOptions(updatedOptions);
      handleCloseModal();
    } catch (error) {
      console.error("Error updating option:", error);
    }
  };
  


  return (
      <>
      {/* <AddProduct /> */}
          <div className="mb-3">
              <label htmlFor="optionNameInput" className="form-label">Option Name</label>
              <input
                  type="text"
                  className="form-control"
                  id="optionNameInput"
                  placeholder="Option Name"
                  value={updatedOptionName}
                  onChange={handleOptionNameChange}
              />
          </div>
          {updatedValues.map((value, index) => (
              <div key={index} className="mb-3">
                  <label htmlFor={`valueInput${index}`} className="form-label">Option Value</label>
                  <input
                      type="text"
                      className="form-control"
                      id={`valueInput${index}`}
                      placeholder="Option Value"
                      value={value}
                      onChange={(event) => handleValueChange(index, event)}
                  />
                  {index === updatedValues.length - 1 && (
                      <button
                          type="button"
                          className="btn btn-tertially"
                          onClick={addValueInput}
                      >
                          Add Another Value
                      </button>
                  )}
              </div>
          ))}
          <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleUpdateOption}
          >
              Done
          </button>
      </>
  );
}




export default function Products({setShowProductDetails,selectedProduct}) {
    const [showOptionComp, setShowOptionComp] = useState(false);
    const [options, setOptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showAddOption, setShowAddOption] = useState(false);


   useEffect(() => {
      if (selectedProduct) {
        setTitle(selectedProduct.title);
        setDescription(selectedProduct.description);
      }
    }, [selectedProduct]);
  
    const handleCheckboxChange = (event) => {
        setShowOptionComp(event.target.checked);
    };
    useEffect(() => {
        const fetchOptions = async () => {
            await fetchOptionsFromFirestore(selectedProduct.title).then((options) => {
                setOptions(options);// Handle options data
                console.log("tittle",selectedProduct.title);
            })
            .catch((error) => {
              console.error('Error fetching options:', error);
              console.log("tittle",selectedProduct.title);
            });;
          
        };
        
  
      fetchOptions();
    }, []);
    useEffect(() => {
      if (options.length > 0) {
          setShowOptionComp(true);
      } else {
          setShowOptionComp(false);
      }
  }, [options]);
  
 

    // const saveOptionsToFirebase = async (optionName, values) => {
    //     const optionsRef = doc(firestore, "options", optionName);

    //     try {
    //         await setDoc(optionsRef, { values });
    //         console.log("Option saved successfully!");
    //     } catch (error) {
    //         console.error("Error saving option:", error);
    //     }
    // };
    const saveOptionsToFirebase = async (title, optionName, values) => {
      const productRef = doc(firestore, "products", title);
      const optionsRef = collection(productRef, "options"); // Reference to the options subcollection
  
      try {
          // Add a new document to the options subcollection
          await setDoc(doc(optionsRef, optionName), { values });
          console.log("Option saved successfully!");
      } catch (error) {
          console.error("Error saving option:", error);
      }
  };
  
  

    const handleEditOption = (option) => {
      setSelectedOption(option);
      setShowModal(true);
  };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted");
        // Add logic to handle form submission
    };
    const displayOptionComp = () => {
      if (showOptionComp) {
          setShowOptionComp(false);
      }
      else {
          setShowOptionComp(true);
      }
  }
  const displayAddOption = () => {
    if (showAddOption) {
        setShowAddOption(false);
    }
    else {
        setShowAddOption(true);
    }
}

    return (
      <>
         <div className="product">
         <div className="product-header ">
         <div className="back" onClick={() => setShowProductDetails(false)}>
            {backArrow}
            </div>
            <h4>Edit Product</h4>
            </div>
    
            <form className="product-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Product Title</label>
                    <input type="text" className="form-control"
                     value={title}
              onChange={(e) => setTitle(e.target.value)}
               id="exampleFormControlInput1" placeholder="Title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Product Description</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" 
                    value={description}
              onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description" />
                </div>
                <h5> Options:</h5>
                <div className="mb-3 form-check">
                    <input type="checkbox" checked={showOptionComp} onChange={handleCheckboxChange} className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">This Product has options</label>

                </div>
               
                {showOptionComp &&
                <div className="saved-option">

                    <ul>
                          {options.map(option => (
                           
                            <li key={option.id}>
                            <div className="grip-icon">{gripDots}</div>
                            <strong>{option.id}</strong><br />
                            {option.values.map(value => (
                                <span className={`value `}>{value}</span>
                            ))}
                            <button className="btn btn-outline-secondary" 
                            onClick={() => handleEditOption(option)}>Edit</button>
                          
                        </li>
                          ))}
                      </ul>
                      <button className="btn btn-outline-primary" onClick={ displayAddOption}><FontAwesomeIcon icon={faPlus} /> Add Option</button>


                      {showModal && (
                            <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Edit Option</h5>
                                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                        </div>
                                        <div className="modal-body">
                                            <UpdateOptions setOptions={setOptions} selectedProduct={selectedProduct} selectedOption={selectedOption} handleCloseModal={() => setShowModal(false)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
               </div>
                }
                {/* {options.length > 0 && setShowOptionComp(true)} */}

                {showAddOption && <OptionVariant setShowAddOption={setShowAddOption} setOptions={setOptions} productTitle={selectedProduct.title} saveOptionsToFirebase={saveOptionsToFirebase} setShowOptionComp={setShowOptionComp}/>}
                 {showOptionComp &&options.length > 0 && <GeneratedVariants productId={selectedProduct.title} />}
                 
                
                <button className="btn " id="btn-saveproduct" type="submit">Save Details</button>
                <button className="btn " id="btn-cancelproduct" type="submit">Cancel</button>
            
            </form>

           
        </div> 
      </>
      
    );
}


function OptionVariant({setShowAddOption, setOptions,productTitle, saveOptionsToFirebase, setShowOptionComp }) {
  const [optionName, setOptionName] = useState('');
  const [values, setValues] = useState(['']);

  const handleOptionNameChange = (event) => {
      setOptionName(event.target.value);
  };

  const handleValueChange = (index, event) => {
      const newValues = [...values];
      newValues[index] = event.target.value;
      setValues(newValues);
  };

  const removeValueInput = (index) => {
      const newValues = [...values];
      newValues.splice(index, 1);
      setValues(newValues);
  };

  const addValueInput = () => {
      setValues([...values, '']);
  };

  const handleSave = async () => {
     await saveOptionsToFirebase(productTitle, optionName, values);
      setShowOptionComp(false);
      const updatedOptions =  await fetchOptionsFromFirestore(productTitle);
      setOptions(updatedOptions);
      setShowAddOption(false);


  };

  return (
      <>
          <div className="mb-3">
              <label htmlFor="optionNameInput" className="form-label">Option Name</label>
              <input
                  type="text"
                  className="form-control"
                  id="optionNameInput"
                  placeholder="Option Name"
                  value={optionName}
                  onChange={handleOptionNameChange}
              />
          </div>
          {values.map((value, index) => (
              <div key={index} className="mb-3">
                  <label htmlFor={`valueInput${index}`} className="form-label">Option Value</label>
                  <div className="input-group">
                      <input
                          type="text"
                          className="form-control"
                          id={`valueInput${index}`}
                          placeholder="Option Value"
                          value={value}
                          onChange={(event) => handleValueChange(index, event)}
                      />
                      <div className="input-group-append">
                          <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => removeValueInput(index)}
                          >
                              <FontAwesomeIcon icon={faTrash} />
                          </button>
                      </div>
                  </div>
                  {index === values.length - 1 && (
                      <button
                          type="button"
                          className="btn btn-tertially"
                          onClick={addValueInput}
                      >
                          Add Another Value
                      </button>
                  )}
              </div>
          ))}
          <button
              type="button"
              id="btn-saveoption"
              className="btn btn-outline-secondary"
              onClick={handleSave}
          >
              Done
          </button>
      </>
  );
}
async function fetchOptionsFromFirestore(productId) {
  const productRef = doc(firestore, 'products', productId);
  const optionsCollectionRef = collection(productRef, 'options'); // Constructing collection reference

  const optionsSnapshot = await getDocs(optionsCollectionRef);

  const options = [];
  optionsSnapshot.forEach((doc) => {
      options.push({ id: doc.id, ...doc.data() });
  });

  return options;
}


async function generateVariantsFromFirestore(productId) {
  const allOptionValues = [];

  try {
    // Reference the product document
    const productRef = doc(firestore, 'products', productId);
    const optionsCollectionRef = collection(productRef, 'options');

    // Get options for the specified product
    const optionsSnapshot = await getDocs(optionsCollectionRef);

    // Iterate over each option
    optionsSnapshot.forEach((doc) => {
      const optionValues = doc.data().values;
      allOptionValues.push(optionValues);
    });

    // Generate variants based on option values
    const variants = cartesianProduct(allOptionValues);
    return variants;
  } catch (error) {
    console.error("Error generating variants:", error);
    return [];
  }
}

function cartesianProduct(arrays) {
  return arrays.reduce(
      (accumulator, currentValue) => {
          return accumulator.flatMap((acc) =>
              currentValue.map((curr) => acc.concat(curr))
          );
      },
      [[]]
  );
}
const handleEdit = () => {
  //show product component
  console.log("Edit variant");
};
//show generated variants



const GeneratedVariants = ({ productId }) => {
  const [variants, setVariants] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [optionNames, setOptionNames] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedAction, setSelectedAction] = useState('');

  useEffect(() => {
    const fetchVariants = async () => {
      const variantsData = await generateVariantsFromFirestore(productId);
      setVariants(variantsData);
      setSelectedVariants(new Array(variantsData.length).fill(false));
    };

    const fetchOptionNames = async () => {
      try {
        const options = await fetchOptionsFromFirestore(productId);
        setOptionNames(options);
        const initialSelectedOptions = {};
        options.forEach((option) => {
          initialSelectedOptions[option.name] = '';
        });
        setSelectedOptions(initialSelectedOptions);
      } catch (error) {
        console.error('Error fetching option names:', error);
      }
    };

    fetchVariants();
    fetchOptionNames();
  }, [productId]);

  const handleEdit = () => {
    console.log("Edit variant");
  };

  const handleSelectAll = (event) => {
    setSelectAll(event.target.checked);
    setSelectedVariants(new Array(variants.length).fill(event.target.checked));
  };

  const handleSelectNone = () => {
    setSelectAll(false);
    setSelectedVariants(new Array(variants.length).fill(false));
  };

  const handleVariantSelect = (index, event) => {
    const updatedSelectedVariants = [...selectedVariants];
    updatedSelectedVariants[index] = event.target.checked;
    setSelectedVariants(updatedSelectedVariants);
  };

  const handleOptionChange = (event, optionName) => {
    const selectedValue = event.target.value;
    setSelectedOptions({
      ...selectedOptions,
      [optionName]: selectedValue,
    });
  };

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  const variantContainsSelectedOptions = (variant) => {
    return Object.entries(selectedOptions).every(([optionName, selectedValue]) => {
      if (selectedValue === '') {
        return true;
      }
      return variant.includes(selectedValue);
    });
  };

  const filteredVariants = variants.filter(variantContainsSelectedOptions);

  const checkedItemsCount = selectedVariants.filter((isSelected) => isSelected).length;

  return (
    <div className="variants">
      <h6>Variants</h6>
      <div className="filter-variants">
        <label>
          <input type="checkbox" onChange={handleSelectAll} checked={selectAll} />
          Select All
        </label>
        <span>  </span>
        <button onClick={handleSelectNone}>Select None</button>
        {optionNames.map((option) => (
          <select key={option.name} onChange={(event) => handleOptionChange(event, option.name)} value={selectedOptions[option.name]}>
            <option value=""> {option.name}</option>
            {option.values.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        ))}
      </div>
      <div className="variants-check">
        <span>{checkedItemsCount} selected</span>
        <select onChange={handleActionChange} value={selectedAction}>
          <option value=""> Actions</option>
          <option value="delete">Delete</option>
          <option value="edit">Edit</option>
          
        </select>
      </div>
      <table className="variants-table">
        <thead>
          <tr>
            <th><input type="checkbox" onChange={handleSelectAll} checked={selectAll} /></th>
            <th>Variant</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVariants.map((variant, index) => (
            <tr key={index}>
              <td><input type="checkbox" onChange={(event) => handleVariantSelect(index, event)} checked={selectedVariants[index]} /></td>
              <td>{variant.join(" / ")}</td>
              <td><input type="number" placeholder="Kshs 0.00" /></td>
              <td><input type="number" placeholder="0" /></td>
              <td><button className="btn btn-outline-secondary edit-variant" onClick={handleEdit}>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


//add new product

const AddProduct = () => {
  return (
    <div className="add-product">
      <h2>Add New Product</h2>
      <form className="product-form">
        <div className="mb-3">
          <label htmlFor="productTitle" className="form-label">
            Product Title
          </label>
          <input
            type="text"
            className="form-control"
            id="productTitle"
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
            placeholder="Enter product description"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save and continue
        </button>
      </form>
    </div>
  );
}
