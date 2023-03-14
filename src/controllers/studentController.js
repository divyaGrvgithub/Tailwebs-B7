const studentModel = require("../models/studentModel")
const mongoose = require('mongoose')

const createStudent = async (req, res) => {
    try {

        let data = req.body;
        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, message: "Please enter mandatory field" })

        let { name, subject, marks } = data

        if (!name) return res.status(400).send({ status: false, message: "Please enter name" })
        if (!subject) return res.status(400).send({ status: false, message: "Please enter subject" })
        if (!marks) return res.status(400).send({ status: false, message: "Please enter marks" })

        let checkStudent = await studentModel.findOne({ name: name, subject: subject })

        if (checkStudent) {
            let updateStudent = await studentModel.findByIdAndUpdate(checkStudent._id, { $inc: { marks: marks } })
            return res.status(201).send({ status: true, message: "Success", data: updateStudent })
        }

        let createStudent = await studentModel.create(data)

        return res.status(201).send({ status: true, message: "Success", data: createStudent })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getStudent = async (req, res) => {
    let { name, marks } = req.query

    let filter = { isDeleted: false }

    if (name) filter.name = name

    if (marks) filter.marks = marks

    let allStudent = await studentModel.find(filter).select({ _id: 1, name: 1, marks: 1, subject: 1 })
    
    if (allStudent.length == 0)
        return res.status(404).send({ status: false, message: "No Student exist" })
    else{
    return res.status(200).send({ status: true, data: allStudent })}
}

const updateStudent = async (req, res) => {
    try {
        let studentId = req.params.studentId

        if (!studentId) {
            return res.status(400).send({ status: false, msg: "please enter valid studentId" })
        }
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "please enter some data to update" })

        let updateStudent = await studentModel.findOneAndUpdate({ _id: studentId, isDeleted: false }, { $set: data }, { new: true });
        if (!updateStudent) {
            return res.status(404).send({ status: false, msg: "The student doesn't exist" })
        }
        return res.status(200).send({ status: true, data: updateStudent })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const deleteStudent = async (req, res) => {
    try {
        let studentId = req.params.studentId;

        if (!mongoose.isValidObjectId(studentId)) return res.status(400).send({ status: false, message: "Please enter valid studentId" })

        let studentDelete = await studentModel.findOneAndUpdate({
             $and: [{ _id: studentId }, { isDeleted: false }] }, 
             { $set: { isDeleted: true } }, { new: true })

        if (!studentDelete)
         return res.status(404).send({ status: false, message: "No student found with this Id" })
        else{
        return res.status(200).send({ status: true, message: "deleted Successfully" })}
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createStudent, getStudent, updateStudent, deleteStudent }