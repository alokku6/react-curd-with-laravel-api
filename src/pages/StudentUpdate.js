import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";

const StudentUpdate = () => {
  let { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [InputErrorList, setInputErrorList] = useState({});
  const [student, setStudent] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/students/${id}/edit`)
      .then((res) => {
        // console.log(res);
        setStudent(res.data.student);
        setLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          
          if (error.response.status === 404) {
            alert(error.response.data.message);
            setLoading(false);
          }
          if (error.response.status === 500) {
            alert(error.response.data);
            setLoading(false);
          }
        }
      });
  }, [id]);

  const handleInput = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const updateStudent = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      name: student.name,
      email: student.email,
      phone: student.phone,
      course: student.course,
    };

    axios
      .put(`http://127.0.0.1:8000/api/students/${id}/edit`, data)
      .then((res) => {
        alert(res.data.message);
        setLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 200) {
            setInputErrorList(error.response.data.errors);
            setLoading(false);
          }
          if (error.response.status === 404) {
            alert(error.response.data.message);
            setLoading(false);
          }
          if (error.response.status === 500) {
            alert(error.response.data);
            setLoading(false);
          }
        }
      });
  };

  if (loading) {
    return <Loading />;
  }

  if(Object.keys(student).length === 0){
    return (
      <div className="container">
      <h4>No Such Student Id Found</h4>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3>
                Update Student
                <Link to="/student" className="btn btn-danger float-end">
                  Back
                </Link>
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={updateStudent}>
                <div className="row">
                  <div className="col-md-6 mt-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        onChange={handleInput}
                        value={student.name}
                        className="form-control"
                        placeholder="Enter Name"
                      />
                      <span className="text-danger">{InputErrorList.name}</span>
                    </div>
                  </div>
                  <div className="col-md-6 mt-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="course"
                        onChange={handleInput}
                        value={student.course}
                        className="form-control"
                        placeholder="Enter Course"
                      />
                      <span className="text-danger">
                        {InputErrorList.course}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 mt-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="email"
                        onChange={handleInput}
                        value={student.email}
                        className="form-control"
                        placeholder="Enter Email"
                      />
                      <span className="text-danger">
                        {InputErrorList.email}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 mt-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="phone"
                        onChange={handleInput}
                        value={student.phone}
                        className="form-control"
                        placeholder="Enter Phone"
                      />
                      <span className="text-danger">
                        {InputErrorList.phone}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <button type="submit" className="btn btn-primary mt-4">
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentUpdate;
