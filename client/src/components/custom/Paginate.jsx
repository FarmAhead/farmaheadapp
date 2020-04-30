import React, { useState } from 'react'
import styled from 'styled-components'

import FlexBox from './FlexBox'
import Filter from '../filter'
import { PRODUCE } from '../../constants/globalConstants'

const NUM_COLUMNS = 5
const NUM_ROWS = 2

const PageIndicator = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.selected ? '#ffffff' : 'transparent')};
  border: 2px solid #ffffff;
  border-radius: 50px;
`

const paginatorIcons = (objects, offset, setOffset) => {
  const itemsPerPage = NUM_COLUMNS * NUM_ROWS

  const ratio = objects.length / itemsPerPage
  let numIndicators = Math.floor(ratio)
  if (ratio > Math.round(ratio)) numIndicators += 1

  const pageIndicators = [...Array(numIndicators).keys()].map((i) => {
    return (
      <PageIndicator
        selected={i === offset}
        onClick={() => {
          setOffset(i)
        }}
      />
    )
  })

  return (
    <FlexBox direction="row" pad={{ between: 'small' }}>
      {pageIndicators}
    </FlexBox>
  )
}

export default ({ objects, renderCard, page }) => {
  if (!objects) return null
  const [offset, setOffset] = useState(0)

  const itemsPerPage = NUM_COLUMNS * NUM_ROWS

  const rows = []
  objects
    .slice(
      0 + offset * itemsPerPage,
      NUM_COLUMNS * NUM_ROWS + offset * itemsPerPage
    )
    .forEach((obj, i) => {
      if (i % NUM_COLUMNS === 0) {
        rows.push([])
      }

      rows[rows.length - 1].push(
        <FlexBox shrink>{React.createElement(renderCard, { obj })}</FlexBox>
      )
    })

  const formattedRows = rows.map((row) => {
    return (
      <FlexBox shrink direction="row" pad={{ between: 'medium' }}>
        {row}
      </FlexBox>
    )
  })

  return (
    <FlexBox
      style={{ width: '100%', height: '100%' }}
      direction="column"
      justify="space-between"
      align="center"
    >
      {page !== PRODUCE ? <Filter page={page} /> : null}
      <FlexBox
        shrink
        style={{ marginBottom: '24px' }}
        direction="column"
        pad={{ between: 'medium' }}
      >
        {formattedRows}
      </FlexBox>
      {paginatorIcons(objects, offset, setOffset)}
    </FlexBox>
  )
}
