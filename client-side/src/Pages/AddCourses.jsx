import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  Stack,
  useToast,
  IconButton,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

export const AddCourses = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    Description: "",
    progress: "",
    materials: [""],
    lessons: "",
  });
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleMaterialChange = (index, value) => {
    const newMaterials = [...formValues.materials];
    newMaterials[index] = value;
    setFormValues({
      ...formValues,
      materials: newMaterials,
    });
  };

  const addMaterialField = () => {
    setFormValues({
      ...formValues,
      materials: [...formValues.materials, ""],
    });
  };

  const removeMaterialField = (index) => {
    const newMaterials = formValues.materials.filter((_, i) => i !== index);
    setFormValues({
      ...formValues,
      materials: newMaterials,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.title) newErrors.title = "Title is required!";
    if (!formValues.Description) newErrors.Description = "Description is required!";
    if (!formValues.progress) newErrors.progress = "Progress is required!";
    if (!formValues.lessons) newErrors.lessons = "Number of lessons is required!";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("https://mock-1-6cb8.onrender.com/courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          toast({
            title: "Course added.",
            description: "The course has been successfully added.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          setFormValues({
            title: "",
            description: "",
            progress: "",
            materials: [""],
            lessons: "",
          });
        } else {
          toast({
            title: "Error",
            description: "There was an error adding the course.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error adding course:", error);
        toast({
          title: "Error",
          description: "There was an error adding the course.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" minHeight="100vh" bg="gray.50">
      <Box bg="white" p={6} rounded="md" shadow="md" width="100%" maxW="800px">
        <Heading as="h2" size="xl" mb={6}>
          Add New Course
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isInvalid={errors.title}>
              <FormLabel htmlFor="title">Course Title</FormLabel>
              <Input
                id="title"
                name="title"
                placeholder="Course Title"
                value={formValues.title}
                onChange={handleInputChange}
              />
              {errors.title && <FormErrorMessage>{errors.title}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errors.Description}>
              <FormLabel htmlFor="Description">Description</FormLabel>
              <Textarea
                id="Description"
                name="Description"
                placeholder="Course Description"
                value={formValues.Description}
                onChange={handleInputChange}
              />
              {errors.Description && <FormErrorMessage>{errors.Description}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errors.progress}>
              <FormLabel htmlFor="progress">Progress</FormLabel>
              <Select
                id="progress"
                name="progress"
                placeholder="Select progress"
                value={formValues.progress}
                onChange={handleInputChange}
              >
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>
              {errors.progress && <FormErrorMessage>{errors.progress}</FormErrorMessage>}
            </FormControl>

            <FormControl>
              <FormLabel>Materials</FormLabel>
              {formValues.materials.map((material, index) => (
                <Flex key={index} alignItems="center" mb={2}>
                  <Input
                    value={material}
                    onChange={(e) => handleMaterialChange(index, e.target.value)}
                    placeholder={`Material ${index + 1}`}
                  />
                  <IconButton
                    icon={<CloseIcon />}
                    onClick={() => removeMaterialField(index)}
                    ml={2}
                    aria-label={`Remove material ${index + 1}`}
                  />
                </Flex>
              ))}
              <Button
                leftIcon={<AddIcon />}
                onClick={addMaterialField}
                colorScheme="teal"
                variant="outline"
              >
                Add Material
              </Button>
            </FormControl>

            <FormControl isInvalid={errors.lessons}>
              <FormLabel htmlFor="lessons">Number of Lessons</FormLabel>
              <Input
                id="lessons"
                name="lessons"
                type="number"
                placeholder="Number of Lessons"
                value={formValues.lessons}
                onChange={handleInputChange}
              />
              {errors.lessons && <FormErrorMessage>{errors.lessons}</FormErrorMessage>}
            </FormControl>

            <Button type="submit" colorScheme="teal" width="100%">
              Add Course
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};
