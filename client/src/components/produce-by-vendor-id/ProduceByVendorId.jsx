import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import FlexBox from '../custom/FlexBox'
import NavHeader from '../nav-header'
import Paginate from '../custom/Paginate'
import { fetchProduceByVendor } from '../../redux/actions/produce/produceActions'
import { renderProduceCard } from '../produce/Produce'

const mapStateToProps = (state) => ({ ...state.produceByVendor })

const ProduceByVendorId = () => {
  const { produceByVendor } = useSelector(mapStateToProps)
  const dispatch = useDispatch()

  const { id: vendorId } = useParams()

  useEffect(() => {
    dispatch(fetchProduceByVendor(vendorId))
  }, [])

  return (
    <FlexBox direction="column" style={{ width: '100%', height: '100%' }}>
      <NavHeader />
      <FlexBox grow style={{ padding: '24px', width: '100%' }}>
        <Paginate objects={produceByVendor} renderCard={renderProduceCard} />
      </FlexBox>
    </FlexBox>
  )
}

export default ProduceByVendorId
