import React, { useState } from "react";
import { Flex, Box, Button, VStack } from "@chakra-ui/react";
import LOGO from "../../assets/MajesticMixer.png";
import { FaSignOutAlt, FaUsersCog, FaHome, FaSkullCrossbones } from "react-icons/fa";
import Profil from "../../components/Cashier/Profile/ProfileCashier";
import Calender from "../DashboardCashier/Calender";
import Navbar from "../DashboardCashier/Navbar";
import Footers from "../DashboardCashier/Footer";
import Product from "../Cashier/ProductList/ProductList";
import { useNavigate } from "react-router-dom";



const Sidebar = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("product");
  const renderPage = () => {
    switch (activePage) {
      case "profile":
        return <Profil />;
      case "product":
        return <Product />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Flex borderRadius={"3xl"} h="100%" maxHeight="767px" >
      <VStack 
        bgColor={"rgba(0,0,0, 0.5)"}
        borderRadius={"3xl"}
        p={4}
        h="100%"
        w="20%"
        minW={'17%'}
        maxW={'17%'}
        position="relative"
      >

        <Box w="100%" h="100%" justifyContent="center" >
        <center><img src={LOGO} alt="Logo" width={'200px'}/></center>
        <Button fontSize={'small'} onClick={() => setActivePage("product")} mt={'10'} justifyContent="left" variant={'outline'} textColor="white" w="100%" _hover={{bgColor:"white", color:"black"}}><FaHome/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</Button>
        <Button fontSize={'small'} onClick={() => setActivePage("profile")}mt={'5'} justifyContent="left" variant={'outline'} textColor="white" w="100%" _hover={{bgColor:"white", color:"black"}}><FaSkullCrossbones/>&nbsp;&nbsp;&nbsp;&nbsp;Profile</Button>
        <Calender/> {/* Import Calender component*/}
        </Box>
        <Button fontSize={'small'} onClick={() => setActivePage("home")} m={'1'} justifyContent="left" variant={'outline'} textColor="white" w="100%" _hover={{bgColor:"white", color:"black"}}><FaUsersCog size={'17'}/>&nbsp;&nbsp;&nbsp;&nbsp;Help & Information</Button>
        <Button fontSize={'small'} onClick={handleLogout} m={'1'} justifyContent="left" variant={'outline'} textColor="white" w="100%" _hover={{bgColor:"white", color:"black"}}><FaSignOutAlt/>&nbsp;&nbsp;&nbsp;&nbsp;Sign Out</Button>
      </VStack>
      <Box ml={'4'} w={'100%'} overflow="scroll">
        <Navbar position="sticky" top="0" width="100%"/> {/* Import Navbar component*/}
        {renderPage()}
        <Footers position="sticky" bottom="0" width="100%"/>  {/* Import Footers component*/}
      </Box>
    </Flex>
  );
};

export default Sidebar;


