import React, { useState, useEffect } from 'react';
import {
  Box,
  Link,
  Flex,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Spacer,
  Switch,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightAddon,
} from '@chakra-ui/react';
import { BiAddToQueue } from 'react-icons/bi';
import { MdEditDocument } from 'react-icons/md';
import { useDisclosure } from '@chakra-ui/react';
import CategoryList from './CategoryList';
import Pagination from './PaginationProduct';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import axios from 'axios';
import { Search2Icon } from '@chakra-ui/icons';

const Product = ({searchResult}) => {
  const bgColor = useColorModeValue('rgb(255,255,255, 0.9)', 'gray.800');
  const {
    isOpen: isCreateProductOpen,
    onOpen: onCreateProductOpen,
    onClose: onCreateProductClose,
  } = useDisclosure();
  const {
    isOpen: isEditProductOpen,
    onOpen: onEditProductOpen,
    onClose: onEditProductClose,
  } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState([]);
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [product, setProduct] = useState([]);
  const [hoveredStates, setHoveredStates] = useState(new Array(product.length).fill(false));


  const fetchProduct = async () => {
    try {
      let apiUrl = `http://localhost:8000/product/all?page=${currentPage}`;
  
      if (searchQuery) {
        apiUrl += `&name=${searchQuery}`;
      }
  
      if (price) {
        apiUrl += `&orderBy=${price}`;
      }
  
      if (category) {
        apiUrl += `&categoryId=${category}`;
      }
  
      if (name) {
        apiUrl += `&orderByName=${name}`;
      }
  
      const response = await axios.get(apiUrl);
      setSelectedProduct(response.data.productList);
    } catch (err) {
      console.log(err);
    }
  };
  

  useEffect(() => {
    fetchProduct();
  }, [currentPage, price, category, name, searchQuery]);
  

  const handleEditClick = (product) => {
    setEditingProduct(product);
    onEditProductOpen();
  };
  const handleSortPrice = (e) => {
    setPrice(e.target.value);
  }
  const handleSortName = (e) => {
    setName(e.target.value);
  }
const handlefilterCategory = (value) => {
  setCategory(value);
}
  const handleProductUpdated = (updatedProduct) => {
    // Implement logic to update product list or perform other necessary actions
    console.log('Product updated:', updatedProduct);
    const updatedProducts = selectedProduct.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setSelectedProduct(updatedProducts);
  };

  const deactiveProduct = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/product/cart/deactivate?id=${id}`
      );
      alert(res.data.message);
      fetchProduct();
    } catch (err) {
      alert(err);
    }
  };

  const activeProduct = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/product/cart/activate?id=${id}`
      );
      alert(res.data.message);
      fetchProduct();
    } catch (err) {
      alert(err);
    }
  }

  const handleCreateProductSuccess = () => {
    fetchProduct(); // Refresh the category list
    onCreateProductClose(); // Close the create category modal
  };
  const handleEditProductSuccess = () => {
    fetchProduct(); 
    onEditProductClose(); 
  };

  const handleHover = (index) => {
    const newHoveredStates = [...hoveredStates];
    newHoveredStates[index] = true;
    setHoveredStates(newHoveredStates);
  };
  
  const handleMouseLeave = (index) => {
    const newHoveredStates = [...hoveredStates];
    newHoveredStates[index] = false;
    setHoveredStates(newHoveredStates);
  };

  return (
    <Box>
            <Box width={'98%'} m={'4'}>
              <InputGroup borderRadius={"full"} size="sm">
                <InputLeftElement
                  pointerEvents="none"
                  children={<Search2Icon color="gray.600" />}
                />
                <Input
                  type="text"
                  placeholder="Search product..."
                  border="1px solid white"
                  rounded={"full"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <InputRightAddon p={0} borderRightRadius={"full"}>
                  <Button size="sm" rounded={"full"} variant={"outline"} onClick={fetchProduct}>
                    Search
                  </Button>
                </InputRightAddon>
              </InputGroup>
            </Box>
      <CategoryList  price={price} handleSortPrice={handleSortPrice} category={category} setCategory={setCategory} handlefilterCategory={handlefilterCategory} name={name} handleSortName={handleSortName} setName={setName}/>
      <Flex w="100%" gap={6} wrap="wrap" ml={4} mb={4}>
        {selectedProduct?.map((obj, index) => (
          <Box
            key={obj.id}
            align={'center'}
            role="group"
            p={4}
            maxW="260px"
            w="full"
            bg={bgColor}
            boxShadow="md"
            rounded="lg"
            pos="relative"
            zIndex={1}
            mb={'3'}
          >
            <Box
              rounded="lg"
              mt={-8}
              pos="relative"
              height="120px"
              _after={{
                transition: 'all .3s ease',
                content: '""',
                w: 'full',
                h: 'full',
                pos: 'absolute',
                top: 2,
                left: 0,
                backgroundImage: `url(http://localhost:8000/api/${obj.productImg})`,
                filter: 'blur(10px)',
                zIndex: -1,
              }}
              _groupHover={{
                _after: {
                  filter: 'blur(15px)',
                },
              }}
            >
              <Image
                borderRadius="xl"
                height={130}
                width={190}
                objectFit="contain"
                src={`http://localhost:8000/api/${obj.productImg}`}
                alt="#"
                onMouseEnter={() => handleHover(index)} // Pass the index to handleHover
                onMouseLeave={() => handleMouseLeave(index)} // Pass the index to handleMouseLeave
                zIndex={hoveredStates[index] ? 1 : -1}
                transform={hoveredStates[index] ? 'scale(1.5)' : 'scale(1)'}
              />
            </Box>
            <Stack pt={4} align="center">
              <Text
                color="black"
                fontSize="sm"
                textTransform="uppercase"
                fontFamily="monospace"
              >
                {obj.Category?.name}
              </Text>
              <Heading
                color="black"
                fontFamily="cursive"
                fontSize="lg"
                fontWeight={500}
                m={0}
              >
                {obj.name}
              </Heading>
              <Stack color="black" align="center">
                <Text fontWeight={600} fontSize="md">
                  ${obj.harga_produk}
                </Text>
                <Text
                  fontSize="xs"
                  fontFamily="body"
                  color="black"
                  textAlign="center"
                >
                  {obj.description}
                </Text>
              </Stack>
            </Stack>
            <Flex>
              <Button variant="link">
                <Switch 
                colorScheme={obj.isActive ? 'green' : 'gray'}
                isChecked={obj.isActive}
                onChange={() => {
                  if (obj.isActive) {
                    deactiveProduct(obj.id);
                  } else {
                    activeProduct(obj.id);
                  }
                }}
              />
              </Button>
              <Spacer />
              <Button variant="link">
                <MdEditDocument
                  color="black"
                  size={20}
                  onClick={() => handleEditClick(obj)}
                />
              </Button>
            </Flex>
            {selectedProduct.length - 1 !== index}
          </Box>
        ))}
      </Flex>
        <EditProduct
          isOpen={isEditProductOpen}
          onClose={onEditProductClose}
          selectedProduct={editingProduct}
          onProductUpdated={handleProductUpdated}
          onEditSuccess={handleEditProductSuccess}
        />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} selectedProduct={selectedProduct} />
      <Link>
        <Button
          position="fixed"
          zIndex={60000}
          bottom={5}
          right={5}
          p={6}
          justifyContent="center"
          alignItems="center"
          rounded="full"
          bgColor="rgba(255,255,255, 0.7)"
        >
          <BiAddToQueue size={30} onClick={onCreateProductOpen} />
        </Button>
        <CreateProduct
          isOpen={isCreateProductOpen}
          onClose={onCreateProductClose}
          onCreateSuccess={handleCreateProductSuccess}
        />
      </Link>
    </Box>
  );
};

export default Product;
