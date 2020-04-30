import React, { useState } from 'react'

import styled from 'styled-components'
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io'

import FlexBox from '../custom/FlexBox'
import { Button } from 'react-bootstrap'
import { FaPlus, FaCheck } from 'react-icons/all'

const BRAND_COLOR = '#27ae60'

const Card = styled.div`
  border-radius: 5px;
  overflow: hidden;

  background-color: #ffffff;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.2);

  width: 300px;

  transition: padding-bottom 0.2s;

  &:hover {
    padding-bottom: 15px;
  }
`

const Stars = ({ quantity }) => {
  let baseNumber = Math.round(quantity)

  const stars = [...Array(baseNumber).keys()].map((i) => (
    <IoMdStar color={BRAND_COLOR} key={i} />
  ))
  if (quantity - baseNumber > 0) {
    stars.push(<IoMdStarHalf color={BRAND_COLOR} key="half" />)
    baseNumber += 1
  }
  const remaining = 5 - baseNumber
  if (remaining > 0) {
    ;[...Array(remaining).keys()].forEach((i) =>
      stars.push(<IoMdStarOutline color={BRAND_COLOR} key={i} />)
    )
  }

  return <FlexBox>{stars}</FlexBox>
}

export default (props) => {
  const {
    title,
    address,
    stars,
    imgSrc,
    canAddToCart,
    canBeSnapEligible,
    snapStatus,
  } = props

  return (
    <Card>
      <FlexBox
        justify="center"
        align="center"
        style={{
          borderBottom: '1px solid #d9d9d9',
          height: '60%',
          backgroundColor: '#e6e6e6',
        }}
      >
        <div>
          <img
            className="rounded img-fluid overflow-hidden"
            src={imgSrc}
            alt={title}
          />
        </div>
      </FlexBox>
      <FlexBox align="flex-end" margin="small">
        <FlexBox direction="column" style={{ padding: '12px' }}>
          <FlexBox style={{ maxWidth: '150px' }}>
            <b className="text-truncate">{title}</b>
          </FlexBox>
          {stars ? <Stars quantity={stars} /> : null}
          <FlexBox style={{ color: '#737373', maxWidth: '150px' }}>
            <div className="text-truncate">{address}</div>
          </FlexBox>
        </FlexBox>
        {canAddToCart ? (
          <FlexBox className="pr-2" style={{ margin: 'auto 0px auto auto' }}>
            <Button variant="outline-info">
              <FaPlus />
            </Button>
          </FlexBox>
        ) : null}
        {snapStatus ? (
          <FlexBox
            direction="column"
            align="center"
            className="pr-2"
            style={{ margin: 'auto 0px auto auto' }}
          >
            <FlexBox> Snap eligible</FlexBox>
            <FaCheck className="text-success" />
          </FlexBox>
        ) : null}
      </FlexBox>
    </Card>
  )
}
