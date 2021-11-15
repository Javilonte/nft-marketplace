import React, { useEffect, useState } from "react";
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints,
} from "react-socks";
import { header } from "react-bootstrap";
import Link from "next/link";
import useOnclickOutside from "react-cool-onclickoutside";

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = (props) => {
  const { children, isCurrent, ...other } = props;

  return (
    <Link {...other}>
      <span className={isCurrent ? "active" : "non-active"}>{children}</span>
    </Link>
  );
};

const Header = function () {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
  };
  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const closeMenu1 = () => {
    setOpenMenu1(false);
  };
  const closeMenu2 = () => {
    setOpenMenu2(false);
  };
  const closeMenu3 = () => {
    setOpenMenu3(false);
  };
  const ref = useOnclickOutside(() => {
    closeMenu();
  });
  const ref1 = useOnclickOutside(() => {
    closeMenu1();
  });
  const ref2 = useOnclickOutside(() => {
    closeMenu2();
  });
  const ref3 = useOnclickOutside(() => {
    closeMenu3();
  });

  const [showmenu, btn_icon] = useState(false);
  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        totop.classList.add("show");
      } else {
        header.classList.remove("sticky");
        totop.classList.remove("show");
      }
      if (window.pageYOffset > sticky) {
        closeMenu();
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  return (
    <header id="myHeader" className="navbar white">
      <div className="container">
        <div className="row w-100-nav">
          <div className="logo px-0">
            <div className="navbar-title navbar-item">
              <NavLink href="/">
                <React.Fragment>
                  <img
                    src="/img/logo.png"
                    className="img-fluid d-block"
                    alt="#"
                  />
                  <img
                    src="/img/logo-2.png"
                    className="img-fluid d-3"
                    alt="#"
                  />
                  <img
                    src="/img/logo-light.png"
                    className="img-fluid d-none"
                    alt="#"
                  />
                </React.Fragment>
              </NavLink>
            </div>
          </div>

          <div className="search">
            <input
              id="quick_search"
              className="xs-hide"
              name="quick_search"
              placeholder="search item here..."
              type="text"
            />
          </div>

          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu && (
                <div className="menu">
                  <div className="navbar-item">
                    <div ref={ref}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onClick={handleBtnClick}
                      >
                        Home
                      </div>
                      {openMenu && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu}>
                            <NavLink
                              href="/"
                              onClick={() =>
                                window.open(
                                  "http://gigaland.grey.on3-step.com",
                                  "_self"
                                )
                              }
                            >
                              New Grey Scheme
                            </NavLink>
                            <NavLink
                              href="/"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Homepage
                            </NavLink>
                            <NavLink
                              href="/home1"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Homepage 1
                            </NavLink>
                            <NavLink
                              href="/home2"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Homepage 2
                            </NavLink>
                            <NavLink
                              href="/home3"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Homepage 3
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="navbar-item">
                    <div ref={ref1}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onClick={handleBtnClick1}
                      >
                        Explore
                      </div>
                      {openMenu1 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu1}>
                            <NavLink
                              href="/explore"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Explore
                            </NavLink>
                            <NavLink
                              href="/explore2"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Explore 2
                            </NavLink>
                            <NavLink
                              href="/rangking"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Rangking
                            </NavLink>
                            <NavLink
                              href="/colection"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Collection
                            </NavLink>
                            <NavLink
                              href="/ItemDetail"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Items Details
                            </NavLink>
                            <NavLink
                              href="/Auction"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Live Auction
                            </NavLink>
                            <NavLink
                              href="/helpcenter"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Help Center
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="navbar-item">
                    <div ref={ref2}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onClick={handleBtnClick2}
                      >
                        Pages
                      </div>
                      {openMenu2 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu2}>
                            <NavLink
                              href="/Author"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Author
                            </NavLink>
                            <NavLink
                              href="/wallet"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Wallet
                            </NavLink>
                            <NavLink
                              href="/create"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Create
                            </NavLink>
                            <NavLink
                              href="/create2"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Create 2
                            </NavLink>
                            <NavLink
                              href="/createOptions"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Create options
                            </NavLink>
                            <NavLink
                              href="/news"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              News
                            </NavLink>
                            <NavLink
                              href="/works"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Gallery
                            </NavLink>
                            <NavLink
                              href="/login"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              login
                            </NavLink>
                            <NavLink
                              href="/loginTwo"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              login 2
                            </NavLink>
                            <NavLink
                              href="/register"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Register
                            </NavLink>
                            <NavLink
                              href="/contact"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Contact Us
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="navbar-item">
                    <NavLink
                      href="/activity"
                      onClick={() => btn_icon(!showmenu)}
                    >
                      Activity
                    </NavLink>
                  </div>
                  <div className="navbar-item">
                    <div ref={ref3}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onClick={handleBtnClick3}
                      >
                        Element
                      </div>
                      {openMenu3 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu3}>
                            <NavLink
                              href="/elegantIcons"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Elegant Icon
                            </NavLink>
                            <NavLink
                              href="/etlineIcons"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Etline Icon
                            </NavLink>
                            <NavLink
                              href="/fontAwesomeIcons"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Font Awesome Icon
                            </NavLink>
                            <NavLink
                              href="/accordion"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Accordion
                            </NavLink>
                            <NavLink
                              href="/alerts"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Alerts
                            </NavLink>
                            <NavLink
                              href="/price"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Pricing Table
                            </NavLink>
                            <NavLink
                              href="/progressbar"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Progress bar
                            </NavLink>
                            <NavLink
                              href="/tabs"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Tabs
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Breakpoint>

            <Breakpoint xl>
              <div className="menu">
                <div className="navbar-item">
                  <div ref={ref}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick}
                      onMouseLeave={closeMenu}
                    >
                      Home
                      <span className="lines"></span>
                      {openMenu && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu}>
                            <NavLink
                              href=" "
                              onClick={() =>
                                window.open(
                                  "http://gigaland.grey.on3-step.com",
                                  "_self"
                                )
                              }
                            >
                              New Grey Scheme
                            </NavLink>
                            <NavLink href="/">Homepage</NavLink>
                            <NavLink href="/home1">Homepage 1</NavLink>
                            <NavLink href="/home2">Homepage 2</NavLink>
                            <NavLink href="/home3">Homepage 3</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="navbar-item">
                  <div ref={ref1}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick1}
                      onMouseLeave={closeMenu1}
                    >
                      Explore
                      <span className="lines"></span>
                      {openMenu1 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu1}>
                            <NavLink href="/explore">Explore</NavLink>
                            <NavLink href="/explore2">Explore 2</NavLink>
                            <NavLink href="/rangking">Rangking</NavLink>
                            <NavLink href="/colection">Collection</NavLink>
                            <NavLink href="/ItemDetail">Items Details</NavLink>
                            <NavLink href="/Auction">Live Auction</NavLink>
                            <NavLink href="/helpcenter">Help Center</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="navbar-item">
                  <div ref={ref2}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick2}
                      onMouseLeave={closeMenu2}
                    >
                      Pages
                      <span className="lines"></span>
                      {openMenu2 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu2}>
                            <NavLink href="/Author">Author</NavLink>
                            <NavLink href="/wallet">Wallet</NavLink>
                            <NavLink href="/create">Create</NavLink>
                            <NavLink href="/create2">Create 2</NavLink>
                            <NavLink href="/createOptions">
                              Create Option
                            </NavLink>
                            <NavLink href="/news">News</NavLink>
                            <NavLink href="/works">Gallery</NavLink>
                            <NavLink href="/login">login</NavLink>
                            <NavLink href="/loginTwo">login 2</NavLink>
                            <NavLink href="/register">Register</NavLink>
                            <NavLink href="/contact">Contact Us</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="navbar-item">
                  <NavLink href="/activity">
                    Activity
                    <span className="lines"></span>
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <div ref={ref3}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick3}
                      onMouseLeave={closeMenu3}
                    >
                      Elements
                      <span className="lines"></span>
                      {openMenu3 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu3}>
                            <NavLink href="/elegantIcons">Elegant Icon</NavLink>
                            <NavLink href="/etlineIcons">Etline Icon</NavLink>
                            <NavLink href="/fontAwesomeIcons">
                              Font Awesome Icon
                            </NavLink>
                            <NavLink href="/accordion">Accordion</NavLink>
                            <NavLink href="/alerts">Alerts</NavLink>
                            <NavLink href="/price">Pricing Table</NavLink>
                            <NavLink href="/progressbar">Progess Bar</NavLink>
                            <NavLink href="/tabs">Tabs</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Breakpoint>
          </BreakpointProvider>

          <div className="mainside">
            <NavLink href="/wallet" className="btn-main">
              Connect Wallet
            </NavLink>
          </div>
        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
    </header>
  );
};
export default Header;
