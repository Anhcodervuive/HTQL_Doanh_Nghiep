import { useState } from 'react'
import TextField from '@mui/material/TextField'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import classNames from 'classnames/bind'

import styles from './CustomPhoneInput.module.css'

const cx = classNames.bind(styles)

function CustomMuiInput({ value, onChange, ...rest }) {
  return (
    <TextField
      variant="outlined"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  )
}

function CustomPhoneInput() {
  const [phoneNumber, setPhoneNumber] = useState()
  const [valid, setValid] = useState(false)

  const handleChange = (value) => {
    console.log(value)
    setPhoneNumber(value)
    setValid(isValidPhoneNumber(value || ''))
  }

  console.log('phoneNumber: ', phoneNumber)
  return (
    <div className={cx('phone-form')}>
      <PhoneInput
        placeholder="Nhập số điện thoại"
        inputComponent={CustomMuiInput}
        // defaultCountry="VN"
        value={phoneNumber}
        onChange={handleChange}
      />
      <p>Số điện thoại {valid ? 'hợp lệ' : 'không hợp lệ'} với quốc gia đã chọn.</p>
    </div>

  )
}

export default CustomPhoneInput