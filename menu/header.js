import React, { useEffect, useState } from "react";
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints,
} from "react-socks";
import { header } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import useOnclickOutside from "react-cool-onclickoutside";

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = (props) => {
  const { children, isCurrent, ...other } = props;

  return (
    <Link {...other}>
      <span
        className={isCurrent ? "active" : "non-active"}
        style={{ cursor: "pointer" }}
      >
        {children}
      </span>
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
              <NavLink href="/template/home1">
                <React.Fragment>
                  <figure className="figure-img" style={{ maxWidth: 240 }}>
                    <Image
                      src="/twinbusiness.svg"
                      alt="Twinbusiness logo"
                      width={300}
                      height={41}
                    />
                  </figure>
                </React.Fragment>
              </NavLink>
            </div>
          </div>

          <div className="search">
            <input
              id="quick_search"
              className="xs-hide"
              name="quick_search"
              placeholder="Busca tu nft aquí..."
              type="text"
            />
          </div>

          <BreakpointProvider>
            <Breakpoint xl>
              <div className="menu">
                <div className="navbar-item">
                  <div ref={ref}>
                    <NavLink
                      href="/explore"
                      className="dropdown-custom btn"
                    >
                      <>
                        Explorar
                        <span className="lines"></span>
                      </>
                    </NavLink>
                  </div>
                </div>
                <div className="navbar-item">
                  <div ref={ref1}>
                    <NavLink
                      href="/create-item"
                      className="dropdown-custom btn"
                    >
                      <>
                        Subir NFT
                        <span className="lines"></span>
                      </>
                    </NavLink>
                  </div>
                </div>
                <div className="navbar-item">
                  <div ref={ref1}>
                    <NavLink
                      href="/my-assets"
                      className="dropdown-custom btn"
                    >
                      <>
                        Mis NFT
                        <span className="lines"></span>
                      </>
                    </NavLink>
                  </div>
                </div>
                {/* <div className="navbar-item">
                  <div ref={ref2}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick2}
                      onMouseLeave={closeMenu2}
                    >
                      Mis NFT
                      <span className="lines"></span>
                      {openMenu2 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu2}>
                            <NavLink href="/creator-dashboard">Author</NavLink>
                            <NavLink href="/template/wallet">Wallet</NavLink>
                            <NavLink href="/template/create">Create</NavLink>
                            <NavLink href="/template/create2">Create 2</NavLink>
                            <NavLink href="/template/createOptions">
                              Create Option
                            </NavLink>
                            <NavLink href="/template/news">News</NavLink>
                            <NavLink href="/template/works">Gallery</NavLink>
                            <NavLink href="/template/login">login</NavLink>
                            <NavLink href="/template/loginTwo">login 2</NavLink>
                            <NavLink href="/template/register">
                              Register
                            </NavLink>
                            <NavLink href="/template/contact">
                              Contact Us
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div> */}
                <div className="navbar-item">
                  <NavLink href="/creator-dashboard">
                        Cuenta
                    <span className="lines"></span>
                  </NavLink>
                </div>
                <div className="navbar-item">
                  {/* <div ref={ref3}>
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
                            <NavLink href="/template/elegantIcons">
                              Elegant Icon
                            </NavLink>
                            <NavLink href="/template/etlineIcons">
                              Etline Icon
                            </NavLink>
                            <NavLink href="/template/fontAwesomeIcons">
                              Font Awesome Icon
                            </NavLink>
                            <NavLink href="/template/accordion">
                              Accordion
                            </NavLink>
                            <NavLink href="/template/alerts">Alerts</NavLink>
                            <NavLink href="/template/price">
                              Pricing Table
                            </NavLink>
                            <NavLink href="/template/progressbar">
                              Progess Bar
                            </NavLink>
                            <NavLink href="/template/tabs">Tabs</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div> */}
                </div>
              </div>
            </Breakpoint>
          </BreakpointProvider>

          <div className="mainside">
            <NavLink href="/template/wallet" className="btn-main">
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
