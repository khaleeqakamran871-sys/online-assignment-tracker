const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Dummy submission storage
let submissions = [];

// Submit Assignment API
app.post("/submit", (req, res) => {
    const { studentName, assignmentLink } = req.body;

    if (!studentName || !assignmentLink) {
        return res.status(400).send("Fields cannot be empty");
    }

    // PR link validation (simple check)
    if (!assignmentLink.includes("github.com")) {
        return res.status(400).send("Invalid GitHub link");
    }

    submissions.push({ studentName, assignmentLink, status: "Pending" });

    res.send("Assignment submitted successfully");
});

// Get all submissions
app.get("/submissions", (req, res) => {
    res.json(submissions);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
    let submissions = []; // already existing

// Instructor: Get all submissions
app.get("/instructor/submissions", (req, res) => {
    res.json(submissions);
});

// Instructor: Grade submission
app.post("/instructor/grade", (req, res) => {
    const { studentName, grade, feedback } = req.body;

    let student = submissions.find(s => s.studentName === studentName);

    if (!student) {
        return res.status(404).send("Student not found");
    }

    student.grade = grade;
    student.feedback = feedback;
    student.status = "Reviewed";

    res.send("Grade added successfully");
});
});