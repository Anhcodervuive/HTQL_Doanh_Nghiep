import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import locationService from '~/service/external/location.service'
import { Chip, InputAdornment, Typography } from '@mui/material'

const TABS = ['Tỉnh/Thành phố', 'Quận/Huyện', 'Phường']

function LocationSelector({ value, onChange, error }) {
  const [tab, setTab] = useState(0)
  const [location, setLocation] = useState(value || {
    city: {},
    district: {},
    ward: {},
  })

  const [locationOption, setLocationOption] = useState({
    city: [],
    district : [],
    ward: [],
  })

  const getPathLocation = () => {
    if (Object.keys(location?.ward).length > 0) {
      return location?.ward?.path_with_type
    } else if (Object.keys(location?.district).length > 0) {
      return location?.district?.path_with_type
    } else if (Object.keys(location?.city).length > 0) {
      return location?.city?.name_with_type
    } else {
      return ''
    }
  }

  useEffect(() => {
    if (Object.keys(location?.city).length === 0) {
      locationService.getAllProvinces()
        .then(data => {
          // console.log(data?.data)
          setLocationOption({
            ...locationOption,
            city: data?.data?.data
          })
        })
    } else if (Object.keys(location?.city).length !== 0 && Object.keys(location?.district).length === 0) {
      locationService.getDistrictByProvince(location?.city.code)
        .then(data => {
          // console.log(data?.data?.data)
          setLocationOption({
            ...locationOption,
            district: data?.data?.data?.data
          })
          setTab(1)
        })
    } else if (!Object.keys(location?.district).length !== 0 && Object.keys(location?.ward).length === 0) {
      locationService.getWardByDistrict(location?.district.code)
        .then(data => {
          // console.log(data?.data?.data)
          setLocationOption({
            ...locationOption,
            ward: data?.data?.data?.data
          })
          setTab(2)
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  // console.log(location, getPathLocation())

  const handleSelectLocation = (option) => {
    if (option?.type === 'tinh' || option?.type === 'thanh-pho' && !option?.parent_code) {
      const newLocation = {
        ...location,
        city: option
      }
      setLocation(newLocation)
      onChange(newLocation)
    } else if (option?.parent_code === location?.city?.code) {
      const newLocation = {
        ...location,
        district: option
      }
      setLocation(newLocation)
      onChange(newLocation)
    } else {
      const newLocation = {
        ...location,
        ward: option
      }
      setLocation(newLocation)
      onChange(newLocation)
    }
  }

  return (
    <Box >
      <Box>
        {!!getPathLocation() &&<>
          <Typography variant='body1'>Địa chỉ: </Typography>
          <Chip
            label={getPathLocation()}
            variant="outlined"
            onDelete={() => {
              const initState = {
                city: {},
                district: {},
                ward: {},
              }
              setLocation(initState)
              setTab(0)
              onChange(initState)
            }}
          />
        </>}
      </Box>
      <Tabs
        value={tab}
        variant="fullWidth"
        indicatorColor='transparent'
      >
        {TABS.map((tab) => (
          <Tab key={tab} label={tab} />
        ))}
      </Tabs>
      <Autocomplete
        freeSolo
        autoSelect
        disablePortal
        getOptionLabel={(option) => option.name || ''}
        options={locationOption[Object.keys(locationOption)[tab]]}
        renderInput={(params) =>(
          <TextField
            id='search-location-input'
            {...params}
            label="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
            error={!!error?.message}
            helperText={error?.message}
          />)}
        renderOption={(props, option) => {
          const key = props.key
          delete props.key
          return (
            <li key={key} {...props} onClick={() => handleSelectLocation(option)}>
              {option?.name_with_type}
            </li>
          )
        }}
      />
    </Box>
  )

}

export default LocationSelector