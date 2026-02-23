// React import not required with the new JSX runtime

const AppoinmentPolicy = () => {
  return (
    <>
      <div className="container shaded-section bg-custom-blue p-5">
        <div className="text-center">
          <h4>Appoinment Policy</h4>
          <ol>
            <li>
              Scheduling: At our dental clinic, we place a high value on
              punctuality and efficiency. This is why we operate strictly by
              appointment, ensuring that each patient has a dedicated time slot
              just for them. By doing so, we are able to minimize wait times and
              ensure a seamless experience from start to finish. We understand
              the importance of your time and strive to provide you with a
              stress-free, timely, and comfortable dental visit.
            </li>
            <li>
              Confirmations: At our dental clinic, we are proud to offer the
              convenience of online booking. Once you have confirmed your
              appointment through our secure online system, there is no need for
              further verification. However, in the event of any changes or
              cancellations, our clinic may reach out to you via phone to ensure
              that we are able to accommodate your needs.
            </li>
            <li>
              Arrival Time: We kindly request that our valued patients arrive a
              few minutes prior to their scheduled appointment time. This
              reserved time slot is specifically set aside for you and we want
              to ensure that we make the most of it. Arriving a few minutes
              early also gives us the opportunity to prepare for your visit and
              address any questions or concerns you may have. We appreciate your
              cooperation and look forward to providing you with exceptional
              dental care.
            </li>
            <li>
              Payment: Patients are responsible for paying their portion of the
              bill at the time of their appointment, unless other arrangements
              have been made in advance. The clinic accepts various forms of
              payment, including cash, credit, and debit cards.
            </li>
            <li>
              We understand that unexpected circumstances may arise. If you need to cancel or reschedule your appointment, we kindly ask that you notify our clinic at least 24 hours in advance. This allows us to offer the time slot to other patients and maintain efficient scheduling for everyone. Last-minute cancellations or no-shows may be subject to a rescheduling fee or policy as determined by the clinic.
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};
export default AppoinmentPolicy;
