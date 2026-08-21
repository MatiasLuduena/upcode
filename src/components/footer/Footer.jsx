import "./navbar.css";

const Footer = () => {
  return (
    <footer>
      <p>Contactame a matiassimonluduena@gmail.com o a +54 351 814-7093</p>
      <p>© 2026 Matías Ludueña. Todos los derechos reservados.</p>
      <div className="footer_contact-social">
        <a href="https://w.app/6ztkws">
          <img src="icons/whatsapp.png" alt="WhatsApp" />
        </a>
        <a href="https://www.instagram.com/matiasluduena_/">
          <img src="icons/instagram.png" alt="Instagram" />
        </a>
        <a href="https://github.com/MatiasLuduena">
          <img src="icons/github.png" alt="GitHub" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
