import React, { memo } from "react";
import styled from "styled-components";
import Clock from "./Clock";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import Particle from "../components/Particle";
import SliderMainParticle from "../components/SliderMainParticle";
import FeatureBox from "../components/FeatureBox";
import CarouselCollectionRedux from "../components/CarouselCollectionRedux";
import ColumnNewRedux from "../components/ColumnNewRedux";
import AuthorListRedux from "../components/AuthorListRedux";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json"; 
//import { navigate } from '@reach/router';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

//react functional component
const NftCard = ({

  nft,
  className = "d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4",
  clockTop = true,
  height,
  onImgLoad,
}) => {
  //const navigateTo = (link) => {
  //navigate(link);
  //}
   
    async function loadNFTs() {
      /* create a generic provider and query for unsold market items */
      const provider = new ethers.providers.JsonRpcProvider();
      const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
      const marketContract = new ethers.Contract(
        nftmarketaddress,
        Market.abi,
        provider
      );
      const data = await marketContract.fetchMarketItems();
  
      /*
       *  map over items returned from smart contract and format
       *  them as well as fetch their token metadata
       */
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
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
          };
          return item;
        })
      );
      
      
    }
    async function buyNft(nft) {
      /* needs the user to sign the transaction, so will use Web3Provider and sign it */
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
  
      /* user will be prompted to pay the asking proces to complete the transaction */
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
      const transaction = await contract.createMarketSale(
        nftaddress,
        nft.tokenId,
        {
          value: price,
        }
      );
      await transaction.wait();
      loadNFTs();
    }
  return (
    <div className={className}>
      <div className="nft__item m-1 ">
        
        <div className="nft__item_wrap" style={{ height: `${height}px` }}>
          <Outer>
            <span>
              <img
                onLoad={onImgLoad}
                src={nft.image}
                className="lazy nft__item_preview"
                alt=""
              />
            </span>
          </Outer>
        </div>
        {nft.deadline && !clockTop && (
          <div className="de_countdown">
            <Clock deadline={nft.deadline} />
          </div>
        )}
        <div className="nft__item_info">
          <span onClick={() => navigateTo(nft.nftLink)}>
            <h4>{nft.name}</h4>
            <p>{nft.description}</p>
          </span>
          {nft.status === "has_offers" ? (
            <div className="has_offers">
              <span className="through">{nft.priceover}</span> {nft.price}
            </div>
          ) : (
            <div className="nft__item_price">
              Precio {nft.price}
              {nft.status === "on_auction" && <span>{nft.bid}</span>}
            </div>
          )}
          <div className="nft__item_action">
            
              <button className="btn-main lead mb-5" onClick={() => buyNft(nft)}>Buy</button>
            
          </div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{nft.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(NftCard);

