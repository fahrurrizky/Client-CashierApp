import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Box, Button, VStack } from "@chakra-ui/react";
import LOGO from "../../assets/MajesticMixer.png";
import { FaSignOutAlt, FaUsersCog, FaHome, FaCreativeCommonsBy, FaShoppingCart, FaSkullCrossbones } from "react-icons/fa";
import Dashboard from "../../views/Dashboard/Dashboard";
import Report from "../../views/Dashboard/ReportAdmin";
import Profil from "../../views/Dashboard/Profile";
// import Tables from "../../views/Dashboard/Tables";
import Calender from "../DashboardAdmin/Calender";
import Navbar from "../DashboardAdmin/Navbar";
import Footers from "../DashboardAdmin/Footer";
import Product from "../Admin/ProductManagement/ProductList";
import Cashier from "../Admin/CashierManagement/CashierList";



const Sidebar = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const renderPage = () => {
    switch (activePage) {
      case "report":
        return <Report />;
      // case "dashboard":
      //     return <Dashboard />;
      case "profile":
        return <Profil />;
      case "product":
        return <Product />;
      case "cashier":
        return <Cashier />;
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
        // overflowY={'scroll'}
      >

        <Box w="100%" h="100%" justifyContent="center">
        <center><img src={LOGO} alt="Logo" width={'200px'}/></center>
        <Button fontSize={'small'} onClick={() => setActivePage("report")} mt={'10'} justifyContent="left" variant={'outline'} textColor="white" w="100%" _hover={{bgColor:"white", color:"black"}}><FaHome/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</Button>
        <Button fontSize={'small'} onClick={() => setActivePage("cashier")} mt={'5'} justifyContent="left" variant={'outline'} textColor="white" w="100%" _hover={{bgColor:"white", color:"black"}}><FaCreativeCommonsBy/>&nbsp;&nbsp;&nbsp;&nbsp;Cashier Management</Button>
        <Button fontSize={'small'} onClick={() => setActivePage("product")} mt={'5'} justifyContent="left" variant={'outline'} textColor="white" w="100%" _hover={{bgColor:"white", color:"black"}}><FaShoppingCart/>&nbsp;&nbsp;&nbsp;&nbsp;Product Management</Button>
        <Button fontSize={'small'} onClick={() => setActivePage("profile")}mt={'5'} justifyContent="left" variant={'outline'} textColor="white" w="100%" _hover={{bgColor:"white", color:"black"}}><FaSkullCrossbones/>&nbsp;&nbsp;&nbsp;&nbsp;Profile</Button>
        <Calender/>
        </Box>
        <Button fontSize={'small'} onClick={() => setActivePage("home")} m={'1'} justifyContent="left" variant={'outline'} textColor="white" w="100%" _hover={{bgColor:"white", color:"black"}}><FaUsersCog size={'17'}/>&nbsp;&nbsp;&nbsp;&nbsp;Help & Information</Button>
        <Button fontSize={'small'} onClick={handleLogout} m={'1'} justifyContent="left" variant={'outline'} textColor="white" w="100%" _hover={{bgColor:"white", color:"black"}}><FaSignOutAlt/>&nbsp;&nbsp;&nbsp;&nbsp;Sign Out</Button>
      </VStack>
      <Box ml={'4'} w={'100%'} overflow="scroll">
        <Navbar position="sticky" top="0" width="100vh"/>
        {renderPage()}
      <Footers position="sticky" bottom="0" width="100%"/>
      </Box>
    </Flex>
  );
};

export default Sidebar;


