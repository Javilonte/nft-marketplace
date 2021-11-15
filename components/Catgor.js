import React from "react";
import Link from "next/link";

const catgor = () => (
  <div className="row">
    <div className="col-md-2 col-sm-4 col-6 mb-3">
      <Link href="/template/home" className="icon-box style-2 rounded" to="">
        <>
          <i className="fa fa-image"></i>
          <span>Art</span>
        </>
      </Link>
    </div>
    <div className="col-md-2 col-sm-4 col-6 mb-3">
      <Link href="/template/home" className="icon-box style-2 rounded" to="">
        <>
          <i className="fa fa-music"></i>
          <span>Music</span>
        </>
      </Link>
    </div>
    <div className="col-md-2 col-sm-4 col-6 mb-3">
      <Link href="/template/home" className="icon-box style-2 rounded" to="">
        <>
          <i className="fa fa-search"></i>
          <span>Domain Names</span>
        </>
      </Link>
    </div>
    <div className="col-md-2 col-sm-4 col-6 mb-3">
      <Link href="/template/home" className="icon-box style-2 rounded" to="">
        <>
          <i className="fa fa-globe"></i>
          <span>Virtual Worlds</span>
        </>
      </Link>
    </div>
    <div className="col-md-2 col-sm-4 col-6 mb-3">
      <Link href="/template/home" className="icon-box style-2 rounded" to="">
        <>
          <i className="fa fa-vcard"></i>
          <span>Trading Cards</span>
        </>
      </Link>
    </div>
    <div className="col-md-2 col-sm-4 col-6 mb-3">
      <Link href="/template/home" className="icon-box style-2 rounded" to="">
        <>
          <i className="fa fa-th"></i>
          <span>Collectibles</span>
        </>
      </Link>
    </div>
  </div>
);
export default catgor;
