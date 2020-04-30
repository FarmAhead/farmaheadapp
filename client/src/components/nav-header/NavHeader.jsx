import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { IoIosLeaf } from 'react-icons/io'
import FlexBox from '../custom/FlexBox'
import LoginRegister from '../login-register'
import ShoppingCart from '../shopping-cart'

import NavButton from './NavButton'
import { MARKET, VENDOR, PRODUCE, ADMIN } from '../../constants/globalConstants'

const NavHeader = styled.div`
  width: 100%;
  height: 62px;
  max-height: 62px;

  display: flex;
  justify-content: start;
  align-items: center;

  z-index: 100;

  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
`

const mapStateToProps = (state) => ({ ...state.user })

export default () => {
  const { loggedIn, userData } = useSelector(mapStateToProps)

  return (
    <NavHeader>
      <FlexBox
        justify="center"
        align="center"
        direction="row"
        style={{ paddingLeft: '12px' }}
      >
        <IoIosLeaf size={'1.32em'} color={'#27ae60'} />
        <FlexBox style={{ fontSize: '1.7em', paddingLeft: '4px' }}>
          <b>Farm</b>Ahead
        </FlexBox>
      </FlexBox>
      <FlexBox
        justify="center"
        align="center"
        direction="row"
        pad={{ between: 'small' }}
        style={{ paddingLeft: '20px', height: '100%' }}
      >
        <NavButton destination={`/${MARKET}`} title={'Markets'} />
        <NavButton destination={`/${VENDOR}`} title={'Vendors'} />
        <NavButton destination={`/${PRODUCE}`} title={'Produce'} />
        {loggedIn && userData.role === VENDOR ? (
          <NavButton destination={`/${VENDOR}/${ADMIN}`} title="My Profile" />
        ) : null}
      </FlexBox>
      {userData && Object.keys(userData).length ? (
        <ShoppingCart style={{ marginLeft: 'auto' }} />
      ) : (
        <LoginRegister style={{ marginLeft: 'auto' }} />
      )}
    </NavHeader>
  )
}
