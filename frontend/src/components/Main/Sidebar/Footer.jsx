const Footer = () => {
  return (
    <div className="pt-5 d-flex flex-column align-items-center gap-3">
      <p className="m-0" id="contacts">
        Contacts
      </p>
      <p className="m-0 d-flex gap-3">
        <img src="./src/assets/mail.svg" alt="mailIcon" />
        E-mail:
      </p>
      <p className="m-0">peppone2894@gmail.com</p>
      <p className="m-0 d-flex gap-3">
        <img src="./src/assets/phone.svg" alt="phoneIcon" />
        Phone Number:
      </p>
      <p className="m-0">3289510340</p>
    </div>
  );
};

export default Footer;
