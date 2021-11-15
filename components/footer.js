import React from "react";
import Link from "next/link";

const footer = () => (
  <footer className="footer-light">
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>Marketplace</h5>
            <ul>
              <li>
                <Link href="">All NFTs</Link>
              </li>
              <li>
                <Link href="">Art</Link>
              </li>
              <li>
                <Link href="">Music</Link>
              </li>
              <li>
                <Link href="">Domain Names</Link>
              </li>
              <li>
                <Link href="">Virtual World</Link>
              </li>
              <li>
                <Link href="">Collectibles</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>Resources</h5>
            <ul>
              <li>
                <Link href="">Help Center</Link>
              </li>
              <li>
                <Link href="">Partners</Link>
              </li>
              <li>
                <Link href="">Suggestions</Link>
              </li>
              <li>
                <Link href="">Discord</Link>
              </li>
              <li>
                <Link href="">Docs</Link>
              </li>
              <li>
                <Link href="">Newsletter</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>Community</h5>
            <ul>
              <li>
                <Link href="">Community</Link>
              </li>
              <li>
                <Link href="">Documentation</Link>
              </li>
              <li>
                <Link href="">Brand Assets</Link>
              </li>
              <li>
                <Link href="">Blog</Link>
              </li>
              <li>
                <Link href="">Forum</Link>
              </li>
              <li>
                <Link href="">Mailing List</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>Newsletter</h5>
            <p>
              Signup for our newsletter to get the latest news in your inbox.
            </p>
            <form
              action="#"
              className="row form-dark"
              id="form_subscribe"
              method="post"
              name="form_subscribe"
            >
              <div className="col text-center">
                <input
                  className="form-control"
                  id="txt_subscribe"
                  name="txt_subscribe"
                  placeholder="enter your email"
                  type="text"
                />
                <Link href="/template/home1">
                  <span id="btn-subscribe" style={{ cursor: "pointer" }}>
                    <i className="arrow_right bg-color-secondary"></i>
                  </span>
                </Link>
                <div className="clearfix"></div>
              </div>
            </form>
            <div className="spacer-10"></div>
            <small>Your email is safe with us. We don't spam.</small>
          </div>
        </div>
      </div>
    </div>
    <div className="subfooter">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex">
              <div className="de-flex-col">
                <span onClick={() => window.open("", "_self")}>
                  <img alt="" className="f-logo d-1" src="/img/logo.png" />
                  <img
                    alt=""
                    className="f-logo d-3"
                    src="/img/logo-2-light.png"
                  />
                  <span className="copy">
                    &copy; Copyright 2021 - Gigaland by Designesia
                  </span>
                </span>
              </div>
              <div className="de-flex-col">
                <div className="social-icons">
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-facebook fa-lg"></i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-twitter fa-lg"></i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-linkedin fa-lg"></i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-pinterest fa-lg"></i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-rss fa-lg"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default footer;
