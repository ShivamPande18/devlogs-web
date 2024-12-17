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
                    <h1>DevLogs: Strava For Coders</h1>
                    <p>Track your coding journey with detailed insights</p>
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
                        <p>Automatically track your coding sessions in VS Code, including duration, active time, and key metrics</p>
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
                        <h2>In-Depth Session Analysis</h2>
                        <p>Get detailed insights on coding time, productivity score, LOC, streaks, and languages used</p>
                        <button className="signup-btn" onClick={handleNavigateToRegister}><strong>Get Started</strong></button>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="sectionWrapper">
                    <div className="section-content">
                        <h2>Multi-Window Tracking</h2>
                        <p>Track your activity across multiple files, tabs, projects and windows with a single start</p>
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
                        <h2>Stay Connected</h2>
                        <p>Connect with developers, share progress, and engage in friendly competition</p>
                        <button className="signup-btn" onClick={handleNavigateToRegister}><strong>Sign Up</strong></button>
                    </div>
                </div>
            </section>

            <section className="get-in-touch">
                <div className="get-in-touch-content">
                    <h2>Get in Touch</h2>
                    <p>Questions? Send us a message and we'll respond promptly</p>
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
