


import React from 'react';
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
import './styles/Footer.css';


export default function FooterCom() {
  return (
    <Footer container className='footer-container'>
      <div className='footer-wrapper'>
        <div className='footer-content'>
          <div className='footer-brand'>
            <Link
              to='/'
              className='footer-title'
            >
              <span className='footer-highlight'>
                Ankita's
              </span>
              Blog
            </Link>
          </div>
          <div className='footer-links'>
            <div>
              <Footer.Title title='About' />
              {/* https://www.100jsprojects.com */}
              <Footer.LinkGroup className='follow-col'>
                <Footer.Link
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  100 JS Projects
                </Footer.Link>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                   Ankita's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup className='follow-col'>
                <Footer.Link
                  href='https://github.com/gutteankita'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='#'>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup className='follow-col'>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='footer-bottom'>
          <Footer.Copyright
            href='#'
            by=" Ankita's blog"
            year={new Date().getFullYear()}
          />
          <div className="footer-icons">
            <Footer.Icon href='#' icon={BsFacebook}/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsTwitter}/>
            <Footer.Icon href='https://github.com/gutteankita' icon={BsGithub}/>
            <Footer.Icon href='#' icon={BsDribbble}/>
          </div>
        </div>
      </div>
    </Footer>
  );
}
