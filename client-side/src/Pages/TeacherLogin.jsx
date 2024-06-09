import React, { useState } from "react";
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

export const TeacherLogin = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
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
    if (!formValues.email) newErrors.email = "Please input your email!";
    if (!formValues.password)
      newErrors.password = "Please input your password!";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      if (
        formValues.email === "admin@gmail.com" &&
        formValues.password === "admin"
      ) {

        toast({
          title: "Login successful.",
          description: "You have successfully logged in.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setFormValues({
          email: "",
          password: "",
          remember: false,
        });

        setTimeout(() => {
          navigate("/addcourses");
        }, 2000);
      } else {
        toast({
          title: "Login failed.",
          description: "Invalid email or password.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      // Set form validation errors
      setErrors(newErrors);
    }
  };

  return (
    <Flex minHeight="100vh" justifyContent="center" alignItems="center">
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
        <Flex
          alignItems="flex-end"
          maxWidth={{ base: "100%", md: "800px" }}
          bg="#fffdf2"
        >
          <Image
            src="https://www.venkateshwaragroup.in/vgiblog/wp-content/uploads/2022/09/Untitled-design-2-1.jpg"
            alt="Login Illustration"
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
            Welcome instructor
          </Heading>
          <Text mb={8}>Login to the Dashboard</Text>
          <Stack spacing={4}>
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <Text color="red.500" fontSize="sm">
                  {errors.email}
                </Text>
              )}
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
              {errors.password && (
                <Text color="red.500" fontSize="sm">
                  {errors.password}
                </Text>
              )}
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

            <Button type="submit" colorScheme="teal" width="100%">
              LOGIN
            </Button>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};
