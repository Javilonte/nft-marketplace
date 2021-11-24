import React, { memo } from "react";
import styled from "styled-components";
import Clock from "./Clock";

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

  return (
    <div className={className}>
      <div className="nft__item m-0">
        {nft.item_type === "single_items" ? (
          <div className="icontype">
            <i className="fa fa-bookmark"></i>
          </div>
        ) : (
          <div className="icontype">
            <i className="fa fa-shopping-basket"></i>
          </div>
        )}
        {nft.deadline && clockTop && (
          <div className="de_countdown">
            <Clock deadline={nft.deadline} />
          </div>
        )}
        <div className="author_list_pp">
          <span onClick={() => /*navigateTo(nft.authorLink)*/ {}}>
            <img className="lazy" src={nft.authorImg} alt="" />
            <i className="fa fa-check"></i>
          </span>
        </div>
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
            <h4>{nft.title}</h4>
          </span>
          {nft.status === "has_offers" ? (
            <div className="has_offers">
              <span className="through">{nft.priceover}</span> {nft.price}
            </div>
          ) : (
            <div className="nft__item_price">
              {nft.price}
              {nft.status === "on_auction" && <span>{nft.bid}</span>}
            </div>
          )}
          <div className="nft__item_action">
            <span onClick={() => navigateTo(nft.bidLink)}>
              {nft.status === "on_auction" ? "Place a bid" : <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>}
            </span>
          </div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{nft.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(NftCard);
