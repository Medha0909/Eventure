import React from "react"; 
import "../styles/home.css";
import { motion } from "framer-motion";
import { Carousel } from "flowbite-react";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { HiLightBulb } from "react-icons/hi";
import { FaCalendarCheck } from "react-icons/fa6";
import { GiCheckedShield } from "react-icons/gi";
import { FaRegHandPointRight } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import useSound from 'use-sound';
import buttonHoverSound from './keyboard-32-12.mp3';

function Home() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    play();
    setModal(!modal);
  };
  const onSubmit = () => {
    setModal(false);
  };
  const [modal1, setModal1] = useState(false);
  const toggleModal1 = () => {
    play();
    setModal1(!modal1);
    
  };
  const onSubmit1 = () => {
    setModal1(false);
  };
  const navigate = useNavigate();
  const soundUrl = buttonHoverSound;
  const navigateTo = () =>navigate('/forseeker');
  function navigateTo1() {navigate('/login')
  
  }
  const navigateTo2 = () =>navigate('/events');
  const navigateSignup = () =>navigate('/register');  
    
  

  const [play] = useSound(soundUrl);
  return (
    <>
    
    
      <div className="sec1 row">
        
  <div className=" heading">
      <motion.h1
        animate={{ x: [50, 150, 0], opacity: 1, scale: 1 }}
        transition={{
          duration: 5,
          delay: 0.3,  
        }}
        initial={{ opacity: 0, scale: 0.5 }}  
      >
      <div id="head" className="col-lg-6" style={{marginTop:"150px"}}>
          <h1 style={{color:"#ffffff",fontSize:"60px",fontFamily: "Orbitron, sans-serif",fontOpticalSizing: "auto",fontWeight:"900",fontStyle: "normal"}} className="big-heading">You Plan We Manage.</h1>
          <p style={{fontSize:"25px",fontFamily: "Orbitron, sans-serif",fontOpticalSizing: "auto",fontWeight:"500",fontStyle: "normal"}} className="big-heading1">Eventure provides resources at your fingertips to help you organise events strategically,conveniently and</p>
          <p style={{fontSize:"25px",fontFamily: "Orbitron, sans-serif",fontOpticalSizing: "auto",fontWeight:"500",fontStyle: "normal"}} className="big-heading11"> efficiently as per your requirements .</p>
          <button type="button" style={{marginRight:"25px"}}className="but-4"  onClick={toggleModal1}>Sign In</button>
          <button type="button" className="but-4" onClick={toggleModal}>Sign Up</button>
        </div>
      </motion.h1>
    
            {modal1 && (
          <div className="m" >
            <div className="modal-content">
  
            <h2 className="mt-[20px] text-[25px]">
                      Do you want to organise an Event?
                    </h2>
                    <p className="pl-[160px] text-[25px]">🧐 ✍🏻 📝</p>{" "}
                    <button className="btn-6"  onClick={navigateTo1} type="button"><span className="y">Yes</span></button>
              <button className="btn-7" type="button" onClick={onSubmit1}>
              <span className="y">No</span>
              </button>

            </div>
          </div>
        )}
        {modal && (
          <div className="m" >
            <div className="modal-content">
  
            <h2 className="mt-[20px] text-[25px]">
                      Do you want to organise an Event?
                    </h2>
                    <p className="pl-[160px] text-[25px]">🧐 ✍🏻 📝</p>{" "}
                    <button className="btn-6"  onClick={navigateSignup} type="button"><span className="y">Yes</span></button>
                    <button className="btn-7" type="submit" onClick={onSubmit}>
              <span className="y">No</span>
              </button>

            </div>
          </div>
        )}

    </div>
    
        <div className="hero  col-lg-6 ">
        <img className="img" src="output-onlinegiftools.gif" alt="..."/>
        </div>
   
  </div>
  <section className="white-section"  id="features">
      <div className="container-fluid">
        <div className="row">
          <div className="feature-box  col-lg-4">
          <FaCalendarCheck className="icon" />
            <h3 className="feature-title">Expertise in Event Planning</h3>
            <p className="ftext">We specialize in curating seamlessly planned and organized events, managing  data and schedules for you.
            </p>
          </div>
          <div className="feature-box2 col-lg-4">
          <GiCheckedShield className="icon2"/>
            <h3 className="feature-title2">End-to-End Support 
            </h3>
            <p className="ftext2">We are dedicated towards tailoring and coordinating event schedules, reports and follow-ups to give you a hassel free experience. </p>
          </div>
          <div className="feature-box3 col-lg-4">
          <HiLightBulb className="icon3" />
            <h3 className="feature-title3">Smart and Innovative Planner
            </h3>
            <p className="ftext3"> By analyzing key factors, we predict the likelihood of your event’s success and provide you better insights so as to optimize your event planning and execution.</p>
          </div>
        </div>
      </div>
    </section>
    <section id="recommend">
 <div className="ls">
  <div className="col_md_sign_up">
<div className="cont_ba_opcitiy">
  <p className="text">Worried about events success? 😟<br></br>

Try ForeSeeker to predict the success rate of your events.
</p>
<button className="glow-on" onClick={navigateTo} type="button"  >ForeSeeker</button>
</div>
  </div>


<img className="w-[250px] absolute left-[630px] top-[250px] " src="https://media.tenor.com/J222tkc75OcAAAAj/looking-left-and-right-bunty.gif"/>
<div className="col_md_sign_up">
<div className="cont_ba_opcitiy1">
<p className="text"> Hosting and Organizing Events is a Hassel! 😟<br></br>
Be calm and let Handler help you.
</p> 
<button className="glow-on-hover" onClick={navigateTo2} type="button"  >Handler</button>
</div>
  </div>

 
  
 </div>
 </section>
 
  
      

     
  <section>
   <div className="h-56 sm:h-44 xl:h-80 2xl:h-96 full">
      <p className="imggga">Wanna participate???? click HERE to proceed</p>
      <a href="/events" className="flex items-center">
        <FaRegHandPointRight className="icon4" />
      </a>
      <Carousel slideInterval={1500}>
        <div className="flex space-x-2">
          <img className="imgs w-full h-auto max-w-[25%]" src="https://business.stories.my/wp-content/uploads/sites/2/2023/06/20230519-Stories-Networking-Party-055-1-scaled.jpg" alt="Event 1" />
          <img className="imgs w-full h-auto max-w-[25%]" src="https://th.bing.com/th/id/OIP.cAPZwWSrc-J5QMyfzAZ1kgHaE8?rs=1&pid=ImgDetMain" alt="Event 2" />
          <img className="imgs w-full h-auto max-w-[25%]" src="https://th.bing.com/th/id/OIP.HmqO-u4qA1AIGuGamqQSFgHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Event 3" />
          <img className="imgs w-full h-auto max-w-[25%]" src="https://th.bing.com/th/id/OIP.K2nj55xtKwRqwx3eFwKkLgHaE8?w=265&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Event 4" />
        </div>
        <div className="flex space-x-2">
          <img className="imgs w-full h-auto max-w-[25%]" src="https://th.bing.com/th/id/OIP.K2nj55xtKwRqwx3eFwKkLgHaE8?w=265&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Event 5" />
          <img className="imgs w-full h-auto max-w-[25%]" src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1nZB20.img?w=800&h=448&m=4&q=81" alt="Event 6" />
          <img className="imgs w-full h-auto max-w-[25%]" src="https://th.bing.com/th/id/OIP.9y6pK1SWZB5G8CCCERNTugHaEZ?w=252&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Event 7" />
          <img className="imgs w-full h-auto max-w-[25%]" src="https://www.visionvivaah.com/blog/wp-content/uploads/2019/10/Best-Event-Management-Company-In-Mumbai-1200x675.jpg" alt="Event 8" />
        </div>
      </Carousel>
    </div>
    
    
    </section>
    
    <div id="feedback" className="abc">
    <p className="gall ">
Share with us your opinions and experiences.
</p>
    <div className="h-56 sm:h-44 xl:h-80 2xl:h-96 full1">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
    />
      <Carousel slideInterval={3000} >
      <div className="testimonial-container">
      <div className="progress-bar"></div>
      <div className="fas fa-quote-right fa-quote"></div>
      <div className="fas fa-quote-left fa-quote"></div>
      <p className="testimonial">
        I've worked with literally hundreds of HTML/CSS developers and I have to
        say the top spot goes to this guy. This guy is an amazing developer. He
        stresses on good, clean code and pays heed to the details. I love
        developers who respect each and every aspect of a throughly thought out
        design and do their best to put it in code. He goes over and beyond and
        transforms ART into PIXELS - without a glitch, every time.
      </p>
      <div className="user">
        <img
          src="https://randomuser.me/api/portraits/women/46.jpg"
          alt="user"
          className="user-image"
        />
        <div className="user-details">
          <h4 className="username">Miyah Myles</h4>
          <p className="role">Marketing</p>
        </div>
      </div>
    </div>
   
    <div className="testimonial-container">
      <div className="progress-bar"></div>
      <div className="fas fa-quote-right fa-quote"></div>
      <div className="fas fa-quote-left fa-quote"></div>
      <p className="testimonial">
      This guy is an amazing frontend developer that delivered the task exactly how we need it, do your self a favor and hire him, you will not be disappointed by the work delivered. He will go the extra mile to make sure that you are happy with your project. I will surely work again with him!
      </p>
      <div className="user">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="user"
          className="user-image"
        />
        <div className="user-details">
          <h4 className="username">June Cha</h4>
          <p className="role">Software Engineer</p>
        </div>
      </div>
    </div>
      </Carousel>
    </div>
    </div>
    <section id="foot">
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="footer-socials">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Eventure. All rights reserved.</p>
      </div>
    </footer>
    </section>
    
      
    
      </>
)
}

export default Home;