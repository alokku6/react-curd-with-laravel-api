import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Students from "../pages/Student";
import StudentsCreate from "../pages/StudentCreate";
import StudentsUpdate from "../pages/StudentUpdate";

const MyRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/student" element={<Students />} />
      <Route path="/student/create" element={<StudentsCreate />} />
      <Route path="/student/:id/edit" element={<StudentsUpdate />} />
    </Routes>
  );
};

export default MyRouter;
