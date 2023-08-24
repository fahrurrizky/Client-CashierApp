import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { MdPlaylistAddCheck } from "react-icons/md";
import { useDisclosure } from "@chakra-ui/react";
import { BiAddToQueue, BiEdit } from "react-icons/bi";
import CreateCategory from "./CreateCategory";
import EditCategory from "./EditCategory";
import axios from "axios";

const CategoryList = ({price, setPrice, handleSortPrice, category, handleFilterCategory, setCategory, handleSortName, setName, name}) => {
const [categories, setCategories] = useState([]);
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

  const {
    isOpen: isCreateCategoryOpen,
    onOpen: onCreateCategoryOpen,
    onClose: onCreateCategoryClose,
  } = useDisclosure();
  const {
    isOpen: isEditCategoryOpen,
    onOpen: onEditCategoryOpen,
    onClose: onEditCategoryClose,
  } = useDisclosure();

  const handleToggleCategory = (categoryId) => {
    if (category === categoryId) {
      setCategory(null); // Clear the category if it's already selected
    } else {
      setCategory(categoryId); // Set the selected category
    }
  };

  const handleCreateCategorySuccess = () => {
    fetchCategory(); // Refresh the category list
    onCreateCategoryClose(); // Close the create category modal
  };
  const handleEditCategorySuccess = () => {
    fetchCategory(); // Refresh the category list
    onEditCategoryClose(); // Close the create category modal
  };

  return (
    <Box mb={'10'}>
      <Box ml={'5'} mb={'3'} mt={"5"} style={{ display: "flex", justifyContent: "flex-end" }}>
        <Menu>
          <Select value={name} onChange={handleSortName} placeholder="Sort by product" w={'md'}>
            <option value="name_asc">A-Z</option>
            <option value="name_desc">Z-A</option>
          </Select>
          <Spacer/>
          <Select value={price} onChange={handleSortPrice} placeholder="Sort by price" w={'md'}>
            <option value="harga_produk_asc" >Ascending</option>
            <option value="harga_produk_desc" >Descending</option>
          </Select>
          <MenuButton
            as={Button}
            rightIcon={<MdPlaylistAddCheck size={"35"} />}
            variant={"ghost"}
            textColor="white"
            _hover={{ bgColor: "white", color: "black" }}
          ></MenuButton>
          <MenuList zIndex={900000} bgColor={"rgba(0,0,0, 0.5)"}>
            <MenuItem
              bgColor={"rgba(0,0,0, 0.5)"}
              onClick={onCreateCategoryOpen}
            >
              <BiAddToQueue /> &nbsp;Create Category
            </MenuItem>
            <MenuItem bgColor={"rgba(0,0,0, 0.5)"} onClick={onEditCategoryOpen} onCreateSuccess={handleCreateCategorySuccess}>
              <BiEdit /> &nbsp;Edit Category
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <EditCategory isOpen={isEditCategoryOpen} onClose={onEditCategoryClose} onEditSuccess={handleEditCategorySuccess} onCreateSuccess={handleCreateCategorySuccess}/>
      <CreateCategory
        isOpen={isCreateCategoryOpen}
        onClose={onCreateCategoryClose}
        onCreateSuccess={handleCreateCategorySuccess}
      />
      <Grid
        gap={"5"}
        fontFamily={"monospace"}
        px={"5"}
        pt={"2"}
        templateColumns="repeat(5, 1fr)"
      >
        {categories.map((item) => (
        <Button
        key={item.name}
        variant={"outline"}
        size={"sm"}
        textColor={category === item.id ? "black" : "white"} // Change text color based on selection
        bgColor={category === item.id ? "white" : "transparent"} // Change background color based on selection
        w="100%"
        _hover={{ bgColor: "white", color: "black" }}
        _active={{ bgColor: "lightblue", color: "black" }} // Apply light-up effect when button is clicked
        textTransform={"uppercase"}
        value={category}
        onClick={() => handleToggleCategory(item.id)} // Toggle the category selection
      >
        {item.name}
      </Button>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryList;
