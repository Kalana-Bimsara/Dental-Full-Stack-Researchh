// React import not required with the new JSX runtime
import { useEffect, useState } from "react";
import AddServiceModal from "./AddServiceModel";
import DashboardButton from "./adminComponents/dashboardButton";
import DashboardSectionHedding from "./adminComponents/dashboardSectionHedding";
import DashboardPriceListTableRow from "./adminComponents/dashboardPriceListTableRow";
import axios from "axios";

const PriceList = () => {

 

  const [services, setServices] = useState([]);
  const HOST = import.meta.env.VITE_HOST || "http://localhost";
  const PORT = import.meta.env.VITE_BACKEND_PORT || "9000";

  async function GetServices() {
    try {
      const response = await axios.get(
        `${HOST}:${PORT}/getservices`
      );
      if (response.data) {
        setServices(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    GetServices();

  },[]);


  return (
    <>
      <section id="price-list" className="shadow-box bg-custom-blue">
        <div className="mt-4">          
          <DashboardSectionHedding 
            hedding ={"Price List"}
          />

          <DashboardButton
            buttonName={"Add New Service"}
            target={"#addServiceModal"}
          />
          <AddServiceModal 
            func = {GetServices}
          />

          <table className="table table-striped " id="doctorTable">
            <thead>
              <tr >
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => {
                  return(
                    <DashboardPriceListTableRow 
                      key = {service._id}
                      name = {service.name}
                      price = {service.price}
                    />
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default PriceList;
