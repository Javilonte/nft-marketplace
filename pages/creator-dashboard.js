import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import ColumnNewThreeColRedux from "../components/ColumnNewThreeColRedux";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import CheckboxFilter from "../components/CheckboxFilter";

import { nftmarketaddress, nftaddress } from "../config";

import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

const GlobalStyles = createGlobalStyle`
  .navbar {
    border-bottom: solid 1px rgba(255, 255, 255, .1) !important;
  }
`;

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchItemsCreated();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          sold: i.sold,
          image: meta.data.image,
        };
        return item;
      })
    );
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter((i) => i.sold);
    setSold(soldItems);
    setNfts(items);
    setLoadingState("loaded");
  }

  return (
    <>
      {/*     <div>
    <div className="p-4">
      <h2 className="text-2xl py-2">Items Created</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {
          nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={nft.image} className="rounded" />
              <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
    <div className="px-4">
      {
        Boolean(sold.length) && (
          <div>
            <h2 className="text-2xl py-2">Items sold</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {
                sold.map((nft, i) => (
                  <div key={i} className="border shadow rounded-xl overflow-hidden">
                    <img src={nft.image} className="rounded" />
                    <div className="p-4 bg-black">
                      <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    </div>
    </div>
    */}
      <div>
        <GlobalStyles />
        <section
        id="profile_banner"
        className="jumbotron breadcumb no-bg"
        style={{
          backgroundImage: `url(${"/img/author_single/author_banner.jpg"})`,
        }}
      >
        <div className="mainbreadcumb"></div>
      </section>

      <section className="container no-bottom">
        <div className="row">
          <div className="col-md-12">
            <div className="d_profile de-flex">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  <img src="/img/author_single/author_thumbnail.jpg" alt="" />
                  <i className="fa fa-check"></i>
                  <div className="profile_name">
                    <h4>
                      Monica Lucas
                      <span className="profile_username">@monicaaa</span>
                      <span id="wallet" className="profile_wallet">
                        DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME
                      </span>
                      <button id="btn_copy" title="Copy Text">
                        Copy
                      </button>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="profile_follow de-flex">
                <div className="de-flex-col">
                  <div className="profile_follower">500 followers</div>
                </div>
                <div className="de-flex-col">
                  <span className="btn-main">Follow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        <section className="container">
          {loadingState === "loaded" && !nfts.length ? (
            <h1 className="py-10 px-20 text-3xl">No assets created</h1>
          ) : (
            <>
              <div className="row">
                <div className="spacer-double"></div>
                <div className="col-md-3">
                  <CheckboxFilter />
                </div>
                <div className="col-md-9">
                  <ColumnNewThreeColRedux nfts={nfts} />
                </div>
              </div>
            </>
          )}
        </section>

        <Footer />
      </div>
    </>
  );
}
