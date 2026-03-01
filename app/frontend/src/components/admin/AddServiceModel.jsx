import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddServiceModal = (props) => {

  const token = sessionStorage.getItem('token');

  const HOST = "__VITE_HOST__";

  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  };

  // 🔴 Fault F11 – Validation disabled
  const {
    register,
    handleSubmit,
    reset
  } = useForm();

  const onSubmit = async (data) => {

    console.log("⚠️ Fault F11 Injected – UI validation disabled");
    console.log("Submitting service:", data);

    try {
      const response = await axios.post(
        `${HOST}/api/api/admin/addservice`,
        data,
        config
      );

      if (response.data) {
        alert("Service added successfully!");
        reset();
        props.func();
      }

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error adding service");
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="addServiceModal"
        tabIndex="-1"
        aria-labelledby="addServiceModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title text-custom-blue"
                id="addServiceModalLabel"
              >
                Add New Service
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)} id="addServiceForm">

                <div className="mb-3">
                  <label
                    htmlFor="serviceName"
                    className="form-label text-custom-blue"
                  >
                    Service Name
                  </label>

                  {/* 🔴 Validation removed */}
                  <input
                    type="text"
                    className="form-control"
                    id="serviceName"
                    placeholder="Enter Service Name"
                    {...register("serviceName")}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="servicePrice"
                    className="form-label text-custom-blue"
                  >
                    Service Price
                  </label>

                  {/* 🔴 Validation removed */}
                  <input
                    type="text"
                    className="form-control"
                    id="servicePrice"
                    placeholder="Enter Service Price"
                    {...register("servicePrice")}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Add Service
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => reset()}
                >
                  Cancel
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddServiceModal;