import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useForm, Controller } from 'react-hook-form'
import { matchIsValidTel, MuiTelInput } from 'mui-tel-input'
import { emailRegex } from '~/config/formValidateRegex'

function SupplierForm({ submit, data }) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    console.log('Supplier data:', data)

    await submit({
      SUPPLIER_NAME: data.name,
      SUPPLIER_PHONE: data.phoneNumber,
      SUPPLIER_ADDRESS: data.address,
      SUPPLIER_EMAIL: data.email,
      SUPPLIER_TAX_CODE: data.taxCode,
      SUPPLIER_CONTACT_PERSON_NAME: data.contactPerson
    })
  }
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        minHeight: '400px',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#4A4A4A',
          fontWeight: 400,
          textTransform: 'uppercase',
          pb: 4,
          height: 'fit-content',
        }}
      >
          Supplier Info
      </Typography>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={data?.SUPPLIER_NAME}
                  rules={{ required: 'Vui lòng nhập tên nhà cung ứng' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Tên nhà cung ứng"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue={data?.SUPPLIER_PHONE}
                  rules={{ required: 'Vui lòng nhập Số điện thoại', validate: (value) => { if (!matchIsValidTel(value)) return 'Số điện thoại không hợp lệ' } }}
                  render={({ field }) => (
                    <MuiTelInput
                      {...field}
                      fullWidth
                      name='phoneNumber'
                      label='Số điện thoại'
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="address"
                  control={control}
                  defaultValue={data?.SUPPLIER_ADDRESS}
                  rules={{ required: 'Vui lòng nhập địa chỉ', }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Địa chỉ"
                      fullWidth
                      error={!!errors.address}
                      helperText={errors.address?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={data?.SUPPLIER_EMAIL}
                  rules={{ required: 'Vui lòng nhập email', pattern: { value: emailRegex, message: 'Email không hợp lệ' } }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="taxCode"
                  control={control}
                  defaultValue={data?.SUPPLIER_TAX_CODE}
                  rules={{ required: 'Vui lòng nhập mã số thuế' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Mã số thuế"
                      fullWidth
                      error={!!errors.taxCode}
                      helperText={errors.taxCode?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="contactPerson"
                  control={control}
                  defaultValue={data?.SUPPLIER_CONTACT_PERSON_NAME}
                  rules={{ required: 'Please enter contact person' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Contact Person"
                      fullWidth
                      error={!!errors.contactPerson}
                      helperText={errors.contactPerson?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="note"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Ghi chú"
                      multiline
                      rows={3}
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
          <Button variant="outlined" color="secondary" type="reset">
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default SupplierForm