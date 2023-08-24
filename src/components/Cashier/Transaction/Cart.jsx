import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [moneyReceived, setMoneyReceived] = useState("");
  const [productNames, setProductNames] = useState({});
  

  useEffect(() => {
    fetchCartItems();
    fetchProductNames();
  },[]);

  const fetchCartItems = async () => {
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
      const response = await axios.get(
        "http://localhost:8000/transaction/list",
        config
      );
      setCartItems(response.data.cartItems);
      fetchCartItems();
      
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const fetchProductNames = async () => {
    try {
      const response = await axios.get("http://localhost:8000/product/all");
      const productNamesMap = {};
      response.data.productList.forEach((product) => {
        productNamesMap[product.id] = {
          name: product.name,
          image: product.productImg,
        };
      });
      setProductNames(productNamesMap);
    } catch (error) {
      console.error("Error fetching product names:", error);
    }
  };

  const totalCartValue = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );
  const refundAmount = moneyReceived
    ? parseFloat(moneyReceived) - totalCartValue
    : 0;

  const handleRemoveItem = async (productId) => {
    const token = localStorage.getItem("token");

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
      await axios.patch(
        "http://localhost:8000/transaction/remove",
        {
          productId: productId,
          quantity: 0, // Change the quantity as needed
        },
        config
      );

      // After successful removal, update the cart items
      fetchCartItems();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };
 
  return (
    <Box direction="column" justifyContent="center" mt={"8"}>
      <Box>
        {cartItems.map((item) => (
          <Box key={item.id} mt={"2"}>
            <Flex gap={"5"} mx={"3"}>
              <Box>
                <Image
                  src={`http://localhost:8000/${
                    productNames[item.productId]?.image
                  }`}
                  objectFit="contain"
                  width="50px"
                  alt={item.id}
                />
              </Box>
              <Box fontSize={"18px"}>
                <Text>{productNames[item.productId]?.name}</Text>
                <Text>${item.price}</Text>
              </Box>
              <Spacer />
              <Box fontSize={"18px"}>
                <Text>Qty: {item.quantity}</Text>
              </Box>
              <Box mt={"3"}>
                <Button
                  onClick={() => handleRemoveItem(item.productId)}
                  _hover={{ bgColor: "red", color: "white" }}
                >
                  <BsTrash />
                </Button>
              </Box>
            </Flex>
            <Divider mx={"5"} w={"90%"} />
          </Box>
        ))}
      </Box>
      <Flex m={"5"}>
        <Text fontSize={"18px"}>Order Summary:</Text>
        <Spacer />
        <Text fontSize={"18px"}>${totalCartValue}</Text>
      </Flex>
      <Divider mx={"5"} w={"90%"} />
      <Flex m={"5"}>
        <Text fontSize={"18px"}>Money Received:</Text>
        <Spacer />
        <Input
          textAlign={"right"}
          type="text"
          textColor={"cyan"}
          placeholder="Money"
          w={"140px"}
          size={"md"}
          value={moneyReceived}
          onChange={(e) => setMoneyReceived(e.target.value)}
        />
      </Flex>
      <Divider mx={"5"} w={"90%"} />
      <Flex m={"5"}>
        <Text fontSize={"18px"}>Refund for Customer:</Text>
        <Spacer />
        <Text fontSize={"18px"}>${refundAmount.toFixed(2)}</Text>
      </Flex>
      <Divider mx={"5"} w={"90%"} />
    </Box>
  );
};

export default Cart;
