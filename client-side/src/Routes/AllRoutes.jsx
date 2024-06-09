import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { SingleCourse } from "../Pages/SingleCourse";
import { WelcomePage } from "../Pages/WelcomePage";
import Login from "../Pages/Login";
import { Signup } from "../Pages/Signup";
import { PrivateRoute } from "./PrivateRoutes";
import { TeacherLogin } from "../Pages/TeacherLogin";
import { AddCourses } from "../Pages/AddCourses";
export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
             </PrivateRoute>
          }
        />
        <Route path="/singlecourse/:id" element={<SingleCourse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/teacherlogin" element={<TeacherLogin/>}/>
        <Route path="/addcourses" element={<AddCourses/>}/>
      </Routes>
    </>
  );
};
