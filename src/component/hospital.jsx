import './button.css'
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const getLocalData = () => {
    return JSON.parse(localStorage.getItem("Patient")) || [];
};

const AddPatient = () => {
    const initialState = {
        id: "",
        patientname: "",
        age: "",
        email: "",
        contactno: "",
        DOB: "",
        gender: "",
        bloodtype: "",
        Insurance: "",
        address: "",
    };

    const [inputForm, setInputForm] = useState(initialState);
    const [isEdit, setIsEdit] = useState(false);
    const [storage, setStorage] = useState(getLocalData());
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!inputForm.patientname.trim()) {
            newErrors.patientname = "Patient name is required.";
        }
        if (!inputForm.age || isNaN(inputForm.age) || inputForm.age <= 0) {
            newErrors.age = "Please enter a valid age.";
        }
        if (!inputForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputForm.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!inputForm.contactno || !/^[0-9]{10}$/.test(inputForm.contactno)) {
            newErrors.contactno = "Contact number must be 10 digits.";
        }
        if (!inputForm.DOB) {
            newErrors.DOB = "Date of birth is required.";
        }
        if (!inputForm.gender) {
            newErrors.gender = "Gender is required.";
        }
        if (!inputForm.bloodtype) {
            newErrors.bloodtype = "Blood type is required.";
        }
        if (!inputForm.Insurance) {
            newErrors.Insurance = "Insurance is required.";
        }
        if (!inputForm.address.trim()) {
            newErrors.address = "Address is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handelChanged = (e) => {
        const { name, value } = e.target;
        setInputForm({
            ...inputForm,
            [name]: value,
        });
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        if (isEdit) {
            const updatedData = storage.map((pes) => {
                if (pes.id === inputForm.id) {
                    return inputForm;
                }
                return pes;
            });
            setStorage(updatedData);
            setIsEdit(false);
        } else {
            const id = Math.floor(Math.random() * 10000);
            setStorage([...storage, { ...inputForm, id }]);
        }

        setInputForm(initialState);
    };

    const handelDelete = (id) => {
        const updatedData = storage.filter((pes) => pes.id !== id);
        setStorage(updatedData);
    };

    const handelEdit = (id) => {
        const Patient = storage.find((pes) => pes.id === id);
        setInputForm(Patient);
        setIsEdit(true);
    };

    useEffect(() => {
        localStorage.setItem("Patient", JSON.stringify(storage));
    }, [storage]);

    return (
        <>
            <Row>
                <h2 className="text-center fw-bold mb-5 text-bg-dark p-3">{isEdit ? "Edit" : "Add "} Patient</h2>
                <Form onSubmit={handelSubmit}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Patient Name:
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                type="text"
                                className="rounded-pill"
                                name="patientname"
                                value={inputForm.patientname}
                                onChange={handelChanged}
                            />
                            {errors.patientname && <small className="text-danger">{errors.patientname}</small>}
                        </Col>
                        <Form.Label column sm="2">
                            Age:
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                type="tel"
                                className="rounded-pill"
                                name="age"
                                value={inputForm.age}
                                onChange={handelChanged}
                            />
                            {errors.age && <small className="text-danger">{errors.age}</small>}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Email:
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                type="text"
                                className="rounded-pill"
                                name="email"
                                value={inputForm.email}
                                onChange={handelChanged}
                            />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </Col>
                        <Form.Label column sm="2">
                            Contact No:
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                type="tel"
                                className="rounded-pill"
                                name="contactno"
                                value={inputForm.contactno}
                                onChange={handelChanged}
                            />
                            {errors.contactno && <small className="text-danger">{errors.contactno}</small>}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            DOB:
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                type="date"
                                className="rounded-pill"
                                name="DOB"
                                value={inputForm.DOB}
                                onChange={handelChanged}
                            />
                            {errors.DOB && <small className="text-danger">{errors.DOB}</small>}
                        </Col>
                        <Form.Label column sm="2">
                            Gender:
                        </Form.Label>
                        <Col sm="2">
                            <Form.Check
                                type="radio"
                                label={"Male"}
                                name="gender"
                                value={"Male"}
                                checked={inputForm.gender === "Male"}
                                onChange={handelChanged}
                            />
                        </Col>
                        <Col sm="2">
                            <Form.Check
                                type="radio"
                                label={"Female"}
                                name="gender"
                                value={"Female"}
                                checked={inputForm.gender === "Female"}
                                onChange={handelChanged}
                            />
                        </Col>
                        {errors.gender && <small className="text-danger ms-3">{errors.gender}</small>}
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Blood Type:
                        </Form.Label>
                        <Col sm="4">
                            <Form.Select
                                aria-label="Default select example"
                                className="rounded-pill"
                                name="bloodtype"
                                value={inputForm.bloodtype}
                                onChange={handelChanged}
                            >
                                <option value="">Select Type</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </Form.Select>
                            {errors.bloodtype && <small className="text-danger">{errors.bloodtype}</small>}
                        </Col>
                        <Form.Label column sm="2">
                            Insurance:
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                type="text"
                                className="rounded-pill"
                                name="Insurance"
                                value={inputForm.Insurance}
                                onChange={handelChanged}
                            />
                            {errors.Insurance && <small className="text-danger">{errors.Insurance}</small>}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Address:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                className="rounded-pill"
                                name="address"
                                value={inputForm.address}
                                onChange={handelChanged}
                            />
                            {errors.address && <small className="text-danger">{errors.address}</small>}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="5"></Form.Label>
                        <Col sm="5">
                            <Button className="button-86 my-5" type="submit">
                                {isEdit ? "Update" : "Add"} Patient
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>

                <Row>
                    <h2 className="text-center fw-bold mb-5 text-bg-dark p-3">View Patients</h2>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Patient Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Contact No</th>
                                <th>Blood Type</th>
                                <th>Insurance</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {storage.map((pes) => (
                                <tr key={pes.id}>
                                    <td>{pes.id}</td>
                                    <td>{pes.patientname}</td>
                                    <td>{pes.age}</td>
                                    <td>{pes.gender}</td>
                                    <td>{pes.email}</td>
                                    <td>{pes.contactno}</td>
                                    <td>{pes.bloodtype}</td>
                                    <td>{pes.Insurance}</td>
                                    <td>
                                        <Button onClick={() => handelEdit(pes.id)}>
                                            <FaEdit />
                                        </Button>{" "}
                                        <Button
                                            onClick={() => handelDelete(pes.id)}
                                            variant="danger"
                                        >
                                            <FaTrashAlt />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Row>
        </>
    );
};

export default AddPatient;
