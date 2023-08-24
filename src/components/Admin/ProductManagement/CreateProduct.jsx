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
  Textarea,
  useToast,
  Select,
} from '@chakra-ui/react';
import axios from 'axios';

export default function CreateProduct({ isOpen, onClose, onCreateSuccess }) {
  const [categories, setCategories] = useState([]);
  const toast = useToast()
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    productImg: null,
    harga_produk: '',
    quantity: '',
    description: '',
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
  };

  const handleCreateProduct = async () => {
    try {
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('categoryId', formData.categoryId);
      formDataObj.append('productImg', formData.productImg);
      formDataObj.append('harga_produk', formData.harga_produk);
      formDataObj.append('description', formData.description);

      const response = await axios.post(
        'http://localhost:8000/product/cart',
        formDataObj,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Product created:', response.data);
      toast({
      title: 'Product Created',
      description: 'Your product has been successfully created.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
      onClose();
      onCreateSuccess();
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: 'Product Created',
        description: 'There is something wrong, make sure again the data you input',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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
        <ModalContent bgColor={'rgba(0,0,0, 0.8)'} textColor="white">
          <ModalHeader>Create Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel><i>Product Name</i></FormLabel>
              <Input
                name="name"
                placeholder="Add Product Name"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel><i>Product Price</i></FormLabel>
              <Input
                name="harga_produk"
                placeholder="Add Product Price"
                onChange={handleInputChange}
              />
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
              <Textarea
                name="description"
                placeholder="Add the descriptions of product"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel><i>Photo Product</i></FormLabel>
              <Input
                type="file"
                accept="image/*"
                width={'100%'}
                p={'4px 6px'}
                onChange={handleImageChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              variant={'outline'}
              textColor="white"
              w="100%"
              _hover={{ bgColor: 'white', color: 'black' }}
              onClick={handleCreateProduct}
            >
              Create
            </Button>
            <Button
              onClick={onClose}
              variant={'outline'}
              textColor="white"
              w="100%"
              _hover={{ bgColor: 'white', color: 'black' }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
