import React, {useEffect, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import LOGO from "../../assets/MajesticMixer.png";
import { ExternalLinkIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from 'react-router-dom'
import { loginSuccess } from "../../redux/reducers/authReducer";
import { useDispatch } from "react-redux";
import Quote from "../../variables/Quote"
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  Link as LinkChakra,
  Spinner,
  useToast,
} from "@chakra-ui/react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast();
  useEffect (() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard-admin");
    }
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      bgImage={
        "https://images.unsplash.com/photo-1468072114808-903e572b8ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1673&q=80"
      }
      bgPosition="center"
      // bgRepeat="no-repeat"
      h="100vh"
      w={'auto'}
    >
      <Box bg={"rgba(0,0,0, 0.7)"} w={"full"} h={"full"} pt={7} >
        <Quote/>
        <center>
          <a href="/">
            <img src={LOGO} alt="Logo" width="300px" />
          </a>
        </center>
        <Box
          m="auto"
          borderWidth="3px"
          borderRadius="md"
          borderColor={"white"}
          backgroundColor={'rgba(0,0,0, 0.1)'}
          textColor={'white'}
          p={6}
          w={"30%"}
          marginTop={5}
        >
          <Heading as="h2" size="lg" mb={6} textAlign={"center"}>
            Log in to your account
          </Heading>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .required("username is required"),
              password: Yup.string()
                .matches(
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/,
                  "Password must contain at least 6 characters, 1 symbol, and 1 uppercase letter"
                )
                .required("Password is required"),
            })}
            onSubmit={(values, { setSubmitting }) => { 
              setIsSubmitting(true);
              try {
                const response = await axios.post(
                  "https://server-cashierapp-production.up.railway.app/auth/login",
                  {
                    username: values.username,
                    password: values.password,
                  }
                );

                dispatch(loginSuccess(response.data.token));

                if (response.data.role === "Cashier") {
                  navigate("/dashboard-cashier");
                } else if (response.data.role === "Admin") {
                  navigate("/dashboard-admin");
                }

                localStorage.setItem("token", response.data.token);

                toast({
                  title: "Login Success",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
              } catch (error) {
                toast({
                  title: "Email and password not match",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
              } finally {
                setIsSubmitting(false);
                setSubmitting(false);
              }
            }}
          >
             {({ isSubmitting }) => (
            <Form>
              <FormControl id="email" mb={3}>
                <FormLabel>Username</FormLabel>
                <Field
                  type="text"
                  name="username"
                  as={Input}
                  placeholder="Enter your Username"
                  // borderColor={"black"}
                />
                <ErrorMessage name="username" component={Text} color="red" />
              </FormControl>
              <FormControl id="password" mb={6}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    as={Input}
                    placeholder="Enter your password"
                    // borderColor={"black"}
                  />
                  <InputRightElement width="3rem">
                    <Button
                      // variant="link"
                      // colorScheme="black"
                      h="1.5rem"
                      size="sm"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? (
                        <ViewOffIcon  />
                      ) : (
                        <ViewIcon  />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <ErrorMessage name="password" component={Text} color="red" />
              </FormControl>
              <Button
                type="submit"
                colorScheme="white"
                mb={6}
                width="full"
                variant={"outline"}
                isLoading={isSubmitting}
                loadingText="Logging in..."
                spinner={<Spinner color="white" />}
              >
                Log in
              </Button>
            </Form>
             )}
          </Formik>
          <Text>
            Forgot your password?{" "}
            <LinkChakra textColor={'#f05641'}>
            <Link to="/forgotpassword">
              Reset Password <ExternalLinkIcon mx="2px" />
            </Link>
            </LinkChakra>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
