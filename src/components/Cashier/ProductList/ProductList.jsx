import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, InputGroup, InputLeftElement, InputRightAddon } from "@chakra-ui/react";
import { MdShoppingCartCheckout } from "react-icons/md";
import { Search2Icon } from '@chakra-ui/icons';
import { BsPlusSlashMinus } from "react-icons/bs";
import {
  Box,
  Flex,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import Category from "./Category";
import Pagination from "../../Admin/ProductManagement/PaginationProduct";

export default function Product() {
  const toast = useToast();
  const bgColor = useColorModeValue("rgb(255,255,255, 0.9)", "gray.800");
  const [product, setProduct] = useState([]);
  const [quantities, setQuantities] = useState([]); // Initialize quantities state
  const [cartItems, setCartItems] = useState([]);
  // Initialize an array of hovered states
  const [hoveredStates, setHoveredStates] = useState(new Array(product.length).fill(false));
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState([]);
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    // Initialize quantities state with default quantity (1) for each product
    const initialQuantities = new Array(product.length).fill(1);
    setQuantities(initialQuantities);
  }, [product]);

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
      setProduct(response.data.productList);
    } catch (err) {
      console.log(err);
    }
  };
  

  useEffect(() => {
    fetchProduct();
  }, [currentPage, price, category, name, searchQuery]);

  const handleAddToCart = async (productId, index) => {
    // Pass the index of the product
    const token = localStorage.getItem("token"); // Replace with your actual token key

    if (!token) {
      console.error("No token found in local storage");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/transaction/start",
        {
          productId: productId,
          quantity: quantities[index], // Use the quantity for the specific product
        },
        config
      );
      setCartItems(response.data.cartItems);
      toast({
        title: "Item Added to Cart",
        description: "The item has been added to your cart.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log("Cart updated:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
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
      <Category price={price} handleSortPrice={handleSortPrice} category={category} setCategory={setCategory} handlefilterCategory={handlefilterCategory} name={name} handleSortName={handleSortName} setName={setName}/>
      <Flex w="100%" gap={6} wrap="wrap" ml={4} mb={4}>
        {product.map((obj, index) => (
          <Box
            key={index}
            align={"center"}
            role="group"
            p={4}
            maxW="260px"
            w="full"
            bg={bgColor}
            boxShadow="md"
            rounded="lg"
            pos="relative"
            zIndex={1}
            mb={"3"}
          >
            <Box
              rounded="lg"
              mt={-8}
              pos="relative"
              height="120px"
              _after={{
                transition: "all .3s ease",
                content: '""',
                w: "full",
                h: "full",
                pos: "absolute",
                top: 2,
                left: 0,
                backgroundImage: `http://localhost:8000/${obj.productImg}`,
                filter: "blur(10px)",
                zIndex: -1,
              }}
              _groupHover={{
                _after: {
                  filter: "blur(15px)",
                },
              }}
            >
              <Image
                borderRadius="xl"
                height={130}
                width={190}
                objectFit="contain"
                src={`http://localhost:8000/${obj.productImg}`}
                alt="#"
                onMouseEnter={() => handleHover(index)} // Pass the index to handleHover
                onMouseLeave={() => handleMouseLeave(index)} // Pass the index to handleMouseLeave
                zIndex={hoveredStates[index] ? 1 : -1}
                transform={hoveredStates[index] ? 'scale(1.5)' : 'scale(1)'}
              />

            </Box>
            <Stack pt={2} align="center">
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
              <BsPlusSlashMinus
                color="black"
                onClick={() =>
                  setQuantities((prevQuantities) => {
                    const updatedQuantities = [...prevQuantities];
                    updatedQuantities[index] = Math.max(
                      updatedQuantities[index] - 1,
                      1
                    );
                    return updatedQuantities;
                  })
                }
              />
              <Input
                type="number"
                textColor={"black"}
                value={quantities[index]}
                onChange={(e) =>
                  setQuantities((prevQuantities) => {
                    const updatedQuantities = [...prevQuantities];
                    updatedQuantities[index] = Math.max(
                      parseInt(e.target.value),
                      1
                    );
                    return updatedQuantities;
                  })
                }
                placeholder="Input Qty"
                w={"20"}
                size={"xs"}
              />
              <Spacer />
              <Button
                variant="link"
                onClick={() => handleAddToCart(obj.id, index)}
              >
                <MdShoppingCartCheckout color="black" size={20} />
              </Button>
            </Flex>
          </Box>
        ))}
      </Flex>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} selectedProduct={setProduct}/>
    </Box>
  );
}
