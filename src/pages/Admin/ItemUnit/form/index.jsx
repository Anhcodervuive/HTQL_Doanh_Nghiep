import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useForm, Controller } from 'react-hook-form'

function ItemUnitForm({ submit, data }) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    console.log('data:', data)

    await submit(data)
  }
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        minHeight: '400px',
      }}
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Controller
                  name="unitItemName"
                  control={control}
                  defaultValue={data?.UNIT_ITEM_NAME}
                  rules={{ required: 'Vui lòng nhập tên đơn vị tính', }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Tên"
                      name='unitItemName'
                      fullWidth
                      error={!!errors.unitItemName}
                      helperText={errors.unitItemName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="unitItemNameEN"
                  control={control}
                  defaultValue={data?.UNIT_ITEM_NAME_EN}
                  rules={{ required: 'Vui lòng nhập tên tiếng Anh của đơn vị tính' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Tên tiếng anh"
                      name='unitItemNameEN'
                      type="text"
                      fullWidth
                      error={!!errors.unitItemNameEN}
                      helperText={errors.unitItemNameEN?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="unitItemAbb"
                  control={control}
                  defaultValue={data?.UNIT_ITEM_ABB}
                  rules={{ required: 'Vui lòng nhập tên viết tắt của đơn vị tính' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Tên tiếng viết tắt"
                      name='unitItemAbb'
                      type="text"
                      fullWidth
                      error={!!errors.unitItemAbb}
                      helperText={errors.unitItemAbb?.message}
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

export default ItemUnitForm