import './style.css';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();

    const handleNavigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="App">
            <nav className="navbar">
                <div className="logo">
                    <span>DEVLOGS</span>
                </div>
                <button className="nav-signup-btn" onClick={handleNavigateToRegister}><strong>Sign Up</strong></button>
            </nav>

            <section className="hero">
                <div className="hero-content">
                    <h1>Build Something Amazing</h1>
                    <p>Track your development journey with detailed logs and insights</p>
                    <button className="hero-btn" onClick={handleNavigateToRegister}><strong>Get Started</strong></button>
                </div>
                <div className="hero-image">
                    <img src="/images/vs.png" alt="Hero" />
                </div>
            </section>

            <section className="section">
                <div className="sectionWrapper">
                    <div className="section-content">
                        <h2>Welcome to Our Platform</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <button className="signup-btn" onClick={handleNavigateToRegister}><strong>Sign Up Now</strong></button>
                    </div>
                    <div className="section-image">
                        <img src="/images/feature1.png" alt="Section 1" />
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="sectionWrapper">
                    <div className="section-image">
                        <img src="/images/feature2.png" alt="Section 2" />
                    </div>
                    <div className="section-content">
                        <h2>Our Features</h2>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <button className="signup-btn" onClick={handleNavigateToRegister}><strong>Get Started</strong></button>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="sectionWrapper">
                    <div className="section-content">
                        <h2>Why Choose Us</h2>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        <button className="signup-btn" onClick={handleNavigateToRegister}><strong>Learn More</strong></button>
                    </div>
                    <div className="section-image">
                        <img src="/images/feature1.png" alt="Section 3" />
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="sectionWrapper">
                    <div className="section-image">
                        <img src="/images/feature2.png" alt="Section 4" />
                    </div>
                    <div className="section-content">
                        <h2>Join Today</h2>
                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <button className="signup-btn" onClick={handleNavigateToRegister}><strong>Sign Up</strong></button>
                    </div>
                </div>
            </section>

            <section className="get-in-touch">
                <div className="get-in-touch-content">
                    <h2>Get in Touch</h2>
                    <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                    <button
                        className="contact-btn"
                        onClick={() => window.location.href = 'mailto:shivampandework@gmail.com'}
                    ><strong>Contact Us</strong></button>
                </div>
            </section>

        </div>
    );
}

export default Landing;
