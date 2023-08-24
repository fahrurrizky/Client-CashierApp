import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Image,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const EditProduct = ({ isOpen, onClose, selectedProduct, onProductUpdated, onEditSuccess }) => {
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(selectedProduct?.productImg || null);
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: selectedProduct?.name || "",
    categoryId: selectedProduct?.categoryId || "",
    harga_produk: selectedProduct?.harga_produk || "",
    quantity: selectedProduct?.quantity || "",
    description: selectedProduct?.description || "",
    productImg: null,
  });

  const fetchCategory = async () => {
    try {
      const {data} = await axios.get(`http://localhost:8000/product/categories`);
      console.log("dafas", data);
      setCategories(data.result);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchCategory();
  }, [])

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, productImg: file });

    // Step 3: Update the image preview state
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("categoryId", formData.categoryId);
      formDataObj.append("harga_produk", formData.harga_produk);
      formDataObj.append("description", formData.description);
      if (formData.productImg) {
        formDataObj.append("productImg", formData.productImg);
      }

      console.log("Updating product with ID:", selectedProduct.id);

      const updatedProduct = await axios.patch(
        `http://localhost:8000/product/carti/${selectedProduct.id}`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Updated product response:", updatedProduct);

      if (updatedProduct.status === 200) {
        if (typeof onProductUpdated === "function") {
          onProductUpdated(updatedProduct);
        }
        onClose();
        toast({
          title: "Product Updated",
          description: "The product has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Product Failed to Update",
          description: "The product could not be updated.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log("Failed to update product");
      }
      onEditSuccess();
    } catch (error) {
      toast({
        title: "Product Failed to Update",
        description: "The product could not be updated, please complete the input form,",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bgColor={"rgba(0,0,0, 0.8)"} textColor="white">
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel><i>Photo Product</i></FormLabel>
              <Image
                rounded={"xl"}
                boxSize='120px'
                objectFit={'cover'}
                src={imagePreview || Image}
                alt="#"
              />
              <Input my={'2'} color={"rgba(0,0,0,0)"} variant={'unstyled'} size={'xs'} type="file" width={'50%'} onChange={handleImageChange} />
            </FormControl>
            <FormControl>
              <FormLabel><i>Product Name</i></FormLabel>
              <Input name="name" placeholder='Add Product Name' value={formData.name} onChange={handleInputChange} />
            </FormControl>
            <FormControl>
              <FormLabel><i>Product Price</i></FormLabel>
              <Input name="harga_produk" placeholder='Add Product Price' value={formData.harga_produk} onChange={handleInputChange} />
            </FormControl>
            <FormControl>
              <FormLabel><i>Category</i></FormLabel>
              {/* <Input
              type="text"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
            /> */}
            <Select
                name="categoryId"
                onChange={(e) => {
                  const categoryId = e.target.value; // Extract the selected category ID
                  handleInputChange({ target: { name: 'categoryId', value: categoryId } }); // Update categoryId in formData
                }}
              >
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel><i>Description Product</i></FormLabel>
              <Textarea name="description" placeholder='Add the descriptions of product' value={formData.description} onChange={handleInputChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} variant={'outline'} textColor="white" w="100%" _hover={{bgColor:"white", color:"black"}} onClick={handleUpdateProduct}>
              Save
            </Button>
            <Button onClick={onClose} variant={'outline'} textColor="white" w="100%" _hover={{bgColor:"white", color:"black"}}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditProduct;
