import LOGO from "../../assets/MajesticMixer.png";
import { Link } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
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
  Link as LinkChakra,
  Spinner,
} from "@chakra-ui/react";
import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = (values) => {
    setIsSubmitting(true); // Start loading
    axios
      .put("https://server-cashierapp-production.up.railway.app/auth/password", {
        email: values.email,
        FE_URL: "https://themajesticmixer.netlify.app"
      })
      .then(function (response) {
        navigate("/");
        toast({
          title: "Password reset password sent successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log(response.data);
      })
      .catch(function (error) {
        toast({
          title: "Email not registered",
          description: error.response.data,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log(error);
      })
      .finally(() => {
        setIsSubmitting(false); // Stop loading
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
            Forgot your password
          </Heading>
          <Text mb={6}>
            Enter the email address associated with your account and we'll send
            you instructions to reset your password.
          </Text>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    id="email"
                    mb={6}
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email address"
                    />
                    <ErrorMessage name="email" component={Text} color="red" />
                  </FormControl>
                )}
              </Field>
              <Button
                type="submit"
                colorScheme="white"
                mb={6}
                width="full"
                variant={"outline"}
                isLoading={isSubmitting} // Conditionally render the spinner
                loadingText="Sending..."
                spinner={<Spinner color="white" />}
              >
                Send Verification Link
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

export default ForgotPassword;
