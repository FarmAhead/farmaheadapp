import FlexBox from '../custom/FlexBox'
import { MARKET, VENDOR } from '../../constants/globalConstants'
import PageCard from '../page-card'
import React from 'react'
import { withRouter } from 'react-router'

const MarketCard = (props) => {
  const { obj, history } = props
  const { id, marketName, locationAddress, s3_url, snapStatus, rating } = obj

  return (
    <FlexBox
      shrink
      onClick={() => {
        history.push(`/${MARKET}/${id}/${VENDOR}`)
      }}
    >
      <PageCard
        title={marketName}
        stars={rating}
        address={locationAddress}
        imgSrc={s3_url}
        snapStatus={snapStatus}
      />
    </FlexBox>
  )
}

export default withRouter(MarketCard)
