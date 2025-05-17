import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useForm, Controller } from 'react-hook-form'

function SupplierForm() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    console.log('Supplier data:', data)
  }
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        minHeight: '400px',
        p: 3,
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
                  defaultValue=""
                  rules={{ required: 'Please enter supplier name' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Supplier Name"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Please enter phone number' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone"
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Please enter address' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Address"
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
                  defaultValue=""
                  rules={{ required: 'Please enter email' }}
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
                  defaultValue=""
                  rules={{ required: 'Please enter tax code' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Tax Code"
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
                  defaultValue=""
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
                      label="Note"
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