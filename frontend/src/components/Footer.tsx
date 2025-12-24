import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">RuralCode</div>
          <p className="footer-desc">
            RuralCode sparks early interest in coding, robotics, and tech for rural students with
            simple, hands-on learning.
          </p>
        </div>

        <div className="footer-contact">
          <h6>Contact</h6>
          <p>Sajibul Islam</p>
          <p>
            <a href="mailto:sajibulislampersonal@gmail.com">sajibulislampersonal@gmail.com</a>
          </p>
          <p>
            <a href="https://sakibulislam.com/" target="_blank" rel="noreferrer">
              https://sakibulislam.com/
            </a>
          </p>
        </div>

        <div className="footer-meta">
          <p>&copy; {new Date().getFullYear()} RuralCode. All rights reserved.</p>
          <p className="text-muted">Made with ❤️ for rural students</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

