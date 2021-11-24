import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import Clock from "../components/Clock";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white span, .navbar.sticky.white span{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown span{
      color: #fff !important;
    }
  }
`;

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [formInput, setFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const router = useRouter();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function createMarket() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    const price = ethers.utils.parseUnits(formInput.price, "ether");

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();
    router.push("/creator-dashboard"); //Borrar el creator dashboard
  }

  const handleShow = () => {
    document.getElementById("tab_opt_1").classList.add("show");
    document.getElementById("tab_opt_1").classList.remove("hide");
    document.getElementById("tab_opt_2").classList.remove("show");
    document.getElementById("btn1").classList.add("active");
    document.getElementById("btn2").classList.remove("active");
    document.getElementById("btn3").classList.remove("active");
  };
  const handleShow1 = () => {
    document.getElementById("tab_opt_1").classList.add("hide");
    document.getElementById("tab_opt_1").classList.remove("show");
    document.getElementById("tab_opt_2").classList.add("show");
    document.getElementById("btn1").classList.remove("active");
    document.getElementById("btn2").classList.add("active");
    document.getElementById("btn3").classList.remove("active");
  };
  const handleShow2 = () => {
    document.getElementById("tab_opt_1").classList.add("show");
    document.getElementById("btn1").classList.remove("active");
    document.getElementById("btn2").classList.remove("active");
    document.getElementById("btn3").classList.add("active");
  };

  return (
    <>
      {/*
      <div className="flex justify-center">
        <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => setFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={e => setFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => setFormInput({ ...formInput, price: e.target.value })}
        />
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
          {
            fileUrl && (
              <img className="rounded mt-4" width="350" src={fileUrl} />
            )
        }
                <button onClick={createMarket} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                Create Digital Asset
                </button>
        </div>
        </div>
        */}
      <div>
        <GlobalStyles />

        <section
          className="jumbotron breadcumb no-bg "
          style={{ backgroundImage: `url(${"/img/background/subheader.jpg"})` }}
        >
          <div className="mainbreadcumb">
            <div className="container">
              <div className="row m-10-hor">
                <div className="col-12">
                  <h1 className="text-center">Sube tus NFTs </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container justify-center">
          <div className="row ">
            <div className="col-lg-7 offset-lg-1 mb-5 justify-center">
              <form id="form-create-item" className="form-border" action="#">
                <div className="field-set">
                  <h5>Subir NFT</h5>

                  <div className="d-create-file">
                    <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                    {/*this.state.files.map((x) => (
                      <p key="{index}">
                        PNG, JPG, GIF, WEBP or MP4. Max 200mb.{x.name}
                      </p>
                    ))*/}
                    <div className="browse">
                      <input
                        type="button"
                        id="get_file"
                        className="btn-main"
                        value="Browse"
                      />
                      <input
                        id="upload_file"
                        type="file"
                        multiple
                        onChange={onChange}
                      />
                    </div>
                  </div>

                  <div className="spacer-single"></div>

                  <h5>Ingresa los detalles</h5>
                  <div className="de_tab tab_methods">
{/*                     <ul className="de_nav">
                      <li id="btn1" className="active" onClick={handleShow}>
                        <span>
                          <i className="fa fa-tag"></i>Fixed price
                        </span>
                      </li>
                      <li id="btn2" onClick={handleShow1}>
                        <span>
                          <i className="fa fa-hourglass-1"></i>Timed auction
                        </span>
                      </li>
                      <li id="btn3" onClick={handleShow2}>
                        <span>
                          <i className="fa fa-users"></i>Open for bids
                        </span>
                      </li>
                    </ul> */}

                    <div className="de_tab_content pt-3">
                      <div id="tab_opt_1">
                        <h5>Price</h5>
                        <input
                          type="text"
                          name="item_price"
                          id="item_price"
                          className="form-control"
                          placeholder="enter price for one item (ETH)"
                          onChange={(event) =>
                            setFormInput({
                              ...formInput,
                              price: event.target.value,
                            })
                          }
                        />
                      </div>

                      <div id="tab_opt_2" className="hide">
                        <h5>Minimum bid</h5>
                        <input
                          type="text"
                          name="item_price_bid"
                          id="item_price_bid"
                          className="form-control"
                          placeholder="enter minimum bid"
                        />

                        <div className="spacer-20"></div>

                        <div className="row">
                          <div className="col-md-6">
                            <h5>Starting date</h5>
                            <input
                              type="date"
                              name="bid_starting_date"
                              id="bid_starting_date"
                              className="form-control"
                              min="1997-01-01"
                            />
                          </div>
                          <div className="col-md-6">
                            <h5>Expiration date</h5>
                            <input
                              type="date"
                              name="bid_expiration_date"
                              id="bid_expiration_date"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>

                      <div id="tab_opt_3"></div>
                    </div>
                  </div>

                  {/* <div className="spacer-20"></div> */}

                  {/* <div className="switch-with-title">
                    <h5>
                      <i className="fa fa- fa-unlock-alt id-color-2 mr10"></i>
                      Unlock once purchased
                    </h5>
                    <div className="de-switch">
                      <input
                        type="checkbox"
                        id="switch-unlock"
                        className="checkbox"
                      />
                      {isActive ? (
                        <label
                          htmlFor="switch-unlock"
                          onClick={() => setIsActive(false)}
                        ></label>
                      ) : (
                        <label
                          htmlFor="switch-unlock"
                          onClick={() => setIsActive(true)}
                        ></label>
                      )}
                    </div>
                    <div className="clearfix"></div>
                    <p className="p-info pb-3">
                      Unlock content after successful transaction.
                    </p>

                    {isActive ? (
                      <div id="unlockCtn" className="hide-content">
                        <input
                          type="text"
                          name="item_unlock"
                          id="item_unlock"
                          className="form-control"
                          placeholder="Access key, code to redeem or link to a file..."
                        />
                      </div>
                    ) : null}
                  </div> */}

                  <h5>Title</h5>
                  <input
                    type="text"
                    name="item_title"
                    id="item_title"
                    className="form-control"
                    placeholder="Ejemplo: 'NFTwin' "
                    onChange={(event) =>
                      setFormInput({ ...formInput, name: event.target.value })
                    }
                  />

                  <div className="spacer-10"></div>

                  <h5>Description</h5>
                  <textarea
                    data-autoresize
                    name="item_desc"
                    id="item_desc"
                    className="form-control"
                    placeholder="Ejemplo:  'Los NFTwins son los más valiosos'"
                    onChange={(event) =>
                      setFormInput({
                        ...formInput,
                        description: event.target.value,
                      })
                    }
                  ></textarea>

                  {/* <div className="spacer-10"></div>

                  <h5>Price</h5>
                  <input
                    type="text"
                    name="item_price"
                    id="item_price"
                    className="form-control"
                    placeholder="enter price for one item (ETH)"
                  /> */}

                  {/* <div className="spacer-10"></div>

                  <h5>Royalties</h5>
                  <input
                    type="text"
                    name="item_royalties"
                    id="item_royalties"
                    className="form-control"
                    placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%"
                  />
 */}      
                  <div className="spacer-10"></div>

                  <input
                    type="button"
                    id="submit"
                    className="btn-main"
                    value="Subir NFT"
                    onClick={createMarket}
                  />
                </div>
              </form>
            </div>
          
            {/* <div className="col-lg-3 col-sm-6 col-xs-12">
              <h5>Preview item</h5>
              <div className="nft__item m-0">
                <div className="de_countdown">
                  <Clock deadline="December, 30, 2021" />
                </div>
                <div className="author_list_pp">
                  <span>
                    <img
                      className="lazy"
                      src="/img/author/author-1.jpg"
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </span>
                </div>
                <div className="nft__item_wrap">
                  <span>
                    <img
                      src="/img/collections/coll-item-3.jpg"
                      id="get_file_2"
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </span>
                </div>
                <div className="nft__item_info">
                  <span>
                    <h4>Pinky Ocean</h4>
                  </span>
                  <div className="nft__item_price">
                    0.08 ETH<span>1/20</span>
                  </div>
                  <div className="nft__item_action">
                    <span>Place a bid</span>
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>50</span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
