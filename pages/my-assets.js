import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import styled from "styled-components";
import ColumnNewThreeColReduxMyAssets from "../components/ColumnNewThreeColReduxMyAssets";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import CheckboxFilter from "../components/CheckboxFilter";

import {
  nftmarketaddress, nftaddress
} from '../config'

import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;
const NftCard = ({
  nft,
  className = "d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4",
  clockTop = true,
  height,
  onImgLoad,
}) => {}

export default function MyAssets() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchMyNFTs()

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
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }
  if (loadingState === 'loaded' && !nfts.length) return (<div>
    <section
          className="jumbotron breadcumb no-bg "
          style={{ backgroundImage: `url(${"/img/background/subheader.jpg"})` }}
        >
          <div className="mainbreadcumb">
            <div className="container">
              <div className="row m-10-hor">
                <div className="col-12">
                  <h1 className="text-center">Mis NFTs </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        <h1 className="py-10 px-20 text-3xl">No tienes NFTs disponibles... Ve al mercado a comprar uno!</h1>
  </div>)
  return (
    
    <div className="flex justify-center">
    
        
      <div className="className">
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
                  <ColumnNewThreeColReduxMyAssets nfts={nfts} />
                </div>
              </div>
            </>
          )}
        </section>
{/*         <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className=" nft__item m-0 border shadow rounded-xl overflow-hidden">
              <div className="nft__item_wrap">
          <Outer>
            <span>
              <img
                src={nft.image}
                className="lazy nft__item_preview"
                alt=""
              />
            </span>
          </Outer>
        </div>
                <div className="p-2 ">
                  <p className="text-2xl font-bold ">Vendedor - {nft.seller}</p>
                  <p className="text-2xl font-bold ">Price - {nft.price} Eth</p>
                </div>
              </div>
            ))
          }
        </div> */}
      </div>
    </div>
  )
}