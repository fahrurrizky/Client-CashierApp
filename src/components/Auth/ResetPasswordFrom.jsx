import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ExternalLinkIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LOGO from "../../assets/MajesticMixer.png";
import Quote from "../../variables/Quote"
import {
  useToast,
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
} from "@chakra-ui/react";
import axios from "axios";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const url = window.location.href.split("/");
  const token = url[url.length - 1];
  const navigate = useNavigate();
  const toast = useToast();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    axios
      .patch(
        "https://server-cashierapp-production.up.railway.app/auth/password",
        {
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        setSubmitting(false);
        navigate("/");
        toast({
          title: "Password successfully changed",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(function (error) {
        console.log(error);
        toast({
          title: "The password was not successfully changed",
          description: error.response.data,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        setSubmitting(false);
      });
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
      <Box bg={"rgba(0,0,0, 0.7)"} w={"full"} h={"full"} pt={7}>
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
          backgroundColor={"rgba(0,0,0, 0.1)"}
          textColor={"white"}
          p={6}
          w={"30%"}
          marginTop={5}
        >
          <Heading as="h2" size="lg" mb={6} textAlign={"center"}>
            Reset your password
          </Heading>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={Yup.object({
              password: Yup.string()
                .matches(
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/,
                  "Password must contain at least 6 characters, 1 symbol, and 1 uppercase letter"
                )
                .required("New Password is required"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required"),
            })}
            onSubmit={handleSubmit}
          >
            <Form>
              <FormControl id="password" mb={6}>
                <FormLabel>New Password</FormLabel>
                <InputGroup>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    as={Input}
                    placeholder="Enter your password"
                  />
                  <InputRightElement width="3rem">
                    <Button h="1.5rem" size="sm" onClick={handleTogglePassword}>
                      {showPassword ? (
                        <ViewOffIcon boxSize={4} />
                      ) : (
                        <ViewIcon boxSize={4} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <ErrorMessage name="password" component={Text} color="red" />
              </FormControl>
              <FormControl id="confirmPassword" mb={6}>
                <FormLabel>Confirm New Password</FormLabel>
                <InputGroup>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    as={Input}
                    placeholder="Enter your password"
                  />
                  <InputRightElement width="3rem">
                    <Button size="sm" h="1.5rem" onClick={handleTogglePassword}>
                      {showPassword ? (
                        <ViewOffIcon boxSize={4} />
                      ) : (
                        <ViewIcon boxSize={4} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <ErrorMessage
                  name="confirmPassword"
                  component={Text}
                  color="red"
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="white"
                mb={6}
                width="full"
                variant={"outline"}
              >
                Reset Password
              </Button>
            </Form>
          </Formik>
          <Text>
            Remember your password?{" "}
            <LinkChakra textColor={"#f05641"}>
              <Link to="/">
                Log in here <ExternalLinkIcon mx="2px" />
              </Link>
            </LinkChakra>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPasswordForm;
