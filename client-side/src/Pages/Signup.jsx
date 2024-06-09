import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Image,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Stack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const Signup = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.username) newErrors.username = "Please input your username!";
    if (!formValues.email) newErrors.email = "Please input your email!";
    if (!formValues.password) newErrors.password = "Please input your password!";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        setIsSubmitting(true);
        const response = await fetch("http://localhost:8080/userdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          toast({
            title: "Account created.",
            description: "Your account has been created successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          setFormValues({
            username: "",
            email: "",
            password: "",
            remember: false,
          });

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          toast({
            title: "Error",
            description: "There was an error creating your account.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error creating account:", error);
        toast({
          title: "Error",
          description: "There was an error creating your account.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Flex minHeight="100vh" justifyContent="center" alignItems="center" bg="#d9edff">
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row-reverse" }}
        maxWidth="1000px"
        bg="white"
        boxShadow="0 0 40px rgba(0, 0, 0, 0.16)"
        borderRadius="12px"
        overflow="hidden"
        margin="0 auto"
      >
        {/* Right Side Content */}
        <Flex alignItems="flex-end" maxWidth={{ base: "100%", md: "800px" }} bg="#fffdf2">
          <Image
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Signup Illustration"
            display="block"
            width="100%"
          />
        </Flex>

        {/* Left Side Content */}
        <Box
          as="form"
          onSubmit={handleSubmit}
          flex="1 0 100%"
          maxWidth={{ base: "100%", md: "480px" }}
          p={{ base: 6, md: 12 }}
        >
          <Heading mb={4} fontFamily="'Josefin Sans', sans-serif">
            Sign Up
          </Heading>
          <Text mb={8}>Create a new account</Text>
          <Stack spacing={4}>
            <FormControl isInvalid={errors.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleInputChange}
              />
              {errors.username && <Text color="red.500" fontSize="sm">{errors.username}</Text>}
            </FormControl>

            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleInputChange}
              />
              {errors.email && <Text color="red.500" fontSize="sm">{errors.email}</Text>}
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.password && <Text color="red.500" fontSize="sm">{errors.password}</Text>}
            </FormControl>

            <FormControl>
              <Checkbox
                id="remember"
                name="remember"
                isChecked={formValues.remember}
                onChange={handleInputChange}
              >
                Remember me
              </Checkbox>
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              width="100%"
              isLoading={isSubmitting}
            >
              SIGN UP
            </Button>
            <Link to={'/login'}>
            <Text>Already have an account?</Text>
            </Link>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

export default Signup;
