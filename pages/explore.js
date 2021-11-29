import React from "react";
import ColumnNewThreeColRedux from "../components/ColumnNewThreeColRedux";
import CheckboxFilter from "../components/CheckboxFilter";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import TopFilterBar from "../components/TopFilterBar";
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);;
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
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;
export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const data = await marketContract.fetchMarketItems()

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }

if (loadingState === 'loaded' && !nfts.length) return (<div>
  <section
  className="jumbotron breadcumb no-bg"
  style={{ backgroundImage: `url(${"/img/background/subheader.jpg"})` }}
>
  <div className="mainbreadcumb">
    <div className="container">
      <div className="row m-10-hor">
        <div className="col-12">
          <h1 className="text-center">Explorar</h1>
        </div>
      </div>
    </div>
  </div>
  
</section>

<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
</div>
)
return (
  <div>
    <GlobalStyles />

    <section
      className="jumbotron breadcumb no-bg"
      style={{ backgroundImage: `url(${"/img/background/subheader.jpg"})` }}
    >
      <div className="mainbreadcumb">
        <div className="container">
          <div className="row m-10-hor">
            <div className="col-12">
              <h1 className="text-center">Explorar</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section className="container">
          {loadingState === "loaded" && !nfts.length ? (
            <h1 className="py-10 px-20 text-3xl">No hay NFT en el mercado</h1>
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
)
      }   