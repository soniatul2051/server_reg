const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/Student'); // Adjust the path as needed

// POST create a new student
router.post('/', async (req, res) => {
  const {
    studentName,
    dateOfBirth,
    gender,
    grade,
    school,
    parentName,
    parentContactNumber,
    address,
    state,
    district,
  } = req.body;

  try {
    const newStudent = new Student({
      studentName,
      dateOfBirth,
      gender,
      grade,
      school, // Now it's a string
      parentName,
      parentContactNumber,
      address,
      state,
      district,
    });

    const student = await newStudent.save();
    res.status(201).json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT update a student by ID
router.put('/:id', async (req, res) => {
  const {
    studentName,
    dateOfBirth,
    gender,
    grade,
    school,
    parentName,
    parentContactNumber,
    address,
    state,
    district,
  } = req.body;

  const { id } = req.params;

  try {
    let student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    // Update student fields
    student.studentName = studentName;
    student.dateOfBirth = dateOfBirth;
    student.gender = gender;
    student.grade = grade;
    student.school = school; // Now it's a string
    student.parentName = parentName;
    student.parentContactNumber = parentContactNumber;
    student.address = address;
    student.state = state;
    student.district = district;

    // Save updated student
    await student.save();

    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE a student by ID
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }
    res.json({ msg: 'Student deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
