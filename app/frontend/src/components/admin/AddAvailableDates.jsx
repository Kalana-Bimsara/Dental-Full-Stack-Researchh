import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import DashboardAppoimantsDoctorOption from "./adminComponents/dashboardAppoimentsDoctorOption";
import DashboardDatesTableRow from "./adminComponents/dashboardDatesTableRow";

const AddAvailableDateModal = () => {

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const minDate = tomorrow.toISOString().split("T")[0];

  const token = sessionStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [doctors, setDoctors] = useState([]);
  const [dates, setDates] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const HOST = "__VITE_HOST__";

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${HOST}/api/api/admin/adddate`,
        data,
        config
      );

      if (response.data) {
        alert("Date added successfully!");
        reset();
        getdates();
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  async function getDoctors() {
    try {
      const response = await axios.get(
        `${HOST}/api/api/admin/getdoctors`,
        config
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      setDoctors(data);
    } catch (error) {
      console.log(error);
      setDoctors([]);
    }
  }

  async function getdates() {
    try {
      const response = await axios.get(
        `${HOST}/api/getdates`,
        config
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      setDates(data);
    } catch (error) {
      console.log(error);
      setDates([]);
    }
  }

  useEffect(() => {
    getDoctors();
    getdates();
  }, []);

  return (
    <>
      <section id="Team" className="shadow-box bg-custom-blue">
        <div className="mt-4">
          <h3 className="text-center">Doctors Availability</h3>

          <button
            className="btn btn-primary mb-3"
            data-bs-toggle="modal"
            data-bs-target="#addDateModal"
          >
            Add New Date
          </button>

          <table className="table table-striped" id="doctorTable">
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {dates.map((date) => (
                <DashboardDatesTableRow
                  key={date._id}
                  doctorName={date.doctorName}
                  date={date.date}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="modal fade"
          id="addDateModal"
          tabIndex="-1"
          aria-labelledby="addDateModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header text-custom-blue">
                <h5 className="modal-title text-center">
                  Add New Date
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>

                  <div className="mb-3 text-custom-blue">
                    <label className="form-label">Doctor Name</label>

                    {/* ✅ Doctor validation remains */}
                    <select
                      className="form-select"
                      {...register("doctor", {
                        required: "Please select a doctor",
                      })}
                    >
                      <option value="">Select the Doctor</option>
                      {doctors.map((doctor) => (
                        <DashboardAppoimantsDoctorOption
                          key={doctor._id}
                          value={doctor._id}
                          option={doctor.name}
                        />
                      ))}
                    </select>

                    {errors.doctor && (
                      <span className="text-danger">
                        {errors.doctor.message}
                      </span>
                    )}

                    <label className="form-label mt-3">
                      Select a Date
                    </label>

                    {/* 🔴 Fault F9 – Date validation removed */}
                    <input
                      type="date"
                      className="form-control"
                      min={minDate}
                      {...register("appointmentDate")}
                    />

                    {/* Error message will never appear now */}
                    {errors.appointmentDate && (
                      <span className="text-danger">
                        {errors.appointmentDate.message}
                      </span>
                    )}

                  </div>

                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Add Date
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default AddAvailableDateModal;