import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Form, Button } from 'react-bootstrap'
import FlexBox from '../custom/FlexBox'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import RangeSlider from 'react-bootstrap-range-slider'

import { fetchFilteredPageInfo } from '../../redux/actions/filter/filterActions'

export default (props) => {
  const { page } = props

  const [validated, setValidated] = useState(false)
  const [sliderValue, setSliderValue] = useState(5)

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    // const form = event.currentTarget
    const { zipCode, slider } = event.target.elements
    // Uncomment when validity is figured out
    // if (form.checkValidity() === false) {
    //   event.preventDefault()
    //   event.stopPropagation()
    // }
    event.preventDefault()
    setValidated(true)
    // dispatch to redux
    dispatch(fetchFilteredPageInfo(page, zipCode.value, slider.value))
  }

  const sliderChangeHandler = (event) => {
    setSliderValue(event.target.value)
  }

  return (
    <FlexBox>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group
            md="3"
            controlId="zipCode"
            style={{ marginRight: '10px' }}
          >
            <Form.Control
              type="text"
              placeholder="Filter by zip code"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="slider">
            <RangeSlider
              inputProps={{ id: 'slider' }}
              value={sliderValue}
              onChange={sliderChangeHandler}
              min={0}
              max={50}
            />
          </Form.Group>
        </Form.Row>
        <Button type="submit">Filter Distance</Button>
      </Form>
    </FlexBox>
  )
}
