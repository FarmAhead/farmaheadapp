import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'

import NavHeader from '../nav-header'
import Paginate from '../custom/Paginate'
import { fetchProduceByVendor } from '../../redux/actions/produce/produceActions'
import { renderProduceCard } from '../produce/Produce'
import { ADMIN } from '../../constants/globalConstants'

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.produceByVendor,
})

const VendorAdmin = () => {
  const { userData, produceByVendor } = useSelector(mapStateToProps)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProduceByVendor())
  }, [])

  return (
    <div>
      <NavHeader />
      <Container>
        <Row>
          <Col className="py-3">
            <h3>Manage your markets</h3>
          </Col>
          <Col>
            <Paginate
              objects={produceByVendor}
              renderCard={renderProduceCard}
              page={ADMIN}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default VendorAdmin
