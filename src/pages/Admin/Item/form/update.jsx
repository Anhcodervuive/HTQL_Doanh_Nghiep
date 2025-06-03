import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useForm, Controller } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDeviceId } from '~/hooks/useDeviceId'
import useUserInfo from '~/hooks/useUserInfo'
import itemTypeService from '~/service/admin/itemType.service'
import unitInvoiceService from '~/service/admin/unitInvoice.service'
import ProgressBar from '~/components/ProgressBar'
import MyEditor from '~/components/MyEditor'
import itemUnitService from '~/service/admin/itemUnit.service'
import BomMaterial from './BomMaterialCreate'
import { Accordion, AccordionDetails, AccordionSummary, Backdrop, CircularProgress } from '@mui/material'
import itemService from '~/service/admin/item.service'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Routes } from '~/config'
import ImagesUploader from '~/components/ImagesUploader'
import imageService from '~/service/image.service'
import BomMaterialUpdate from './BomMaterialUpdate'
import ShowImagePanel from './ShowImagePanel'

function ItemUpdateForm({ data, viewOnly }) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [isUpdating, setIsUpdating] = useState(false)
  const navigate = useNavigate()
  const [itemAvtFile, setItemAvtFile] = useState(null)
  const [itemDescImgFiles, setItemDescImgFiles] = useState([])
  const [description, setDescription] = useState(data?.DESCRIPTION ?? '')
  const device_id = useDeviceId()
  const { userId: user_id } = useUserInfo()
  const { data: dataItemType, isLoading : isLoadingItemType, error: errorItemType } = useQuery({
    queryKey: ['itemTypeList'],
    enabled: !!device_id,
    queryFn: () => itemTypeService.search({
      user_id,
      device_id
    }),
    retry: false,
    refetchOnWindowFocus: false,
  })
  const { data: dataUnitInvoice, isLoading: isLoadingUnitInvoice, error: errorUnitInvoice } = useQuery({
    queryKey: ['unitInvoiceList'],
    enabled: !!device_id,
    queryFn: () => unitInvoiceService.search({
      user_id,
      device_id
    }),
    retry: false,
    refetchOnWindowFocus: false,
  })
  const { data: dataItemUnit, isLoading: isLoadingItemUnit, error: errorItemUnit } = useQuery({
    queryKey: ['itemUnitList'],
    enabled: !!device_id,
    queryFn: () => itemUnitService.search({
      user_id,
      device_id
    }),
    retry: false,
    refetchOnWindowFocus: false,
  })

  const onSubmitBasicInfo = async (dataBasic) => {
    const basicInfo = {
      itemName: dataBasic.itemName,
      itemNameEn: dataBasic.itemNameEn,
      itemType: dataBasic.itemType,
      description
    }
    itemService.update({
      user_id,
      device_id,
    },
    data?._id,
    basicInfo
    )
      .then(res => {
        console.log(res)
        toast.success('Cập nhật thông tin cơ bản thành công')
        navigate(Routes.admin.item.list)
      })
      .catch(err => {
        console.log(err)
        toast.error(err?.response?.data?.message)
      })
  }

  const onSubmitPriceAndUnitInfo = async (priceAndUnitInfo) => {
    const unitInfo = {
      unitId: priceAndUnitInfo.unitId,
      unitInvoiceId: priceAndUnitInfo.unitInvoiceId,
    }
    const credential = {
      user_id,
      device_id,
    }
    Promise.all([
      itemService.update(
        credential,
        data?._id,
        unitInfo
      ),
      itemService.updatePrice(
        credential,
        data?._id,
        priceAndUnitInfo.price
      )
    ])
      .then(() => {
        toast.success('Cập nhật hàng hóa thành công')
      })
      .catch(err => {
        console.log(err)
        toast.error(err?.response?.data?.message)
      })
  }

  const handleChangeFiles = useCallback((files) => {
    setItemAvtFile(files)
  }, [])

  const handleChangeDescFiles = useCallback((files) => {
    setItemDescImgFiles(files)
  }, [])

  const onSubmitImgae = async () => {
    const credential = { user_id, device_id }
    setIsUpdating(true)
    try {
      // Update avt img
      if (itemAvtFile?.uploadyFiles.length > 0) {
        console.log(itemAvtFile.uploadyFiles[0])
        const newImageAvtRes = await imageService.uploadAvatarItem(itemAvtFile.uploadyFiles[0], data?._id, data?.AVATAR_IMAGE_URL)
        await itemService.update(
          credential,
          data?._id,
          { avatarImageUrl: newImageAvtRes.data.url }
        )
      }

      // Update list img

      if (itemDescImgFiles.oldImages?.length !== data?.LIST_IMAGE?.length) {
        const oldUrlImagesUpdated = new Set(itemDescImgFiles?.oldImages.map(img => img.url))
        const imgNeedToRemove = data?.LIST_IMAGE?.filter(img => !oldUrlImagesUpdated.has(img.url))

        for (let i = 0; i < imgNeedToRemove.length; i++) {
          await imageService.delete(imgNeedToRemove[i].URL)
        }
      }

      if (itemDescImgFiles?.uploadyFiles.length > 0) {
        const descImagesListRes = await imageService.upLoadListImage(itemDescImgFiles?.uploadyFiles, 'PRODUCT', data?._id,)
        await itemService.updateListDescImages(
          credential,
          data?._id,
          [
            ...descImagesListRes.data.urls.map(url => ({ URL: url })),
            ...itemDescImgFiles.oldImages.map(img => ({ URL: img.url }))
          ]
        )
      }
      toast.success('Cập nhật ảnh thành công')

      setIsUpdating(false)
    } catch (error) {
      setIsUpdating(false)
      console.log(error)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '400px',
        px: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}
      pb={20}
    >
      <ProgressBar/>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={isUpdating}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-basic-info-content"
          id="panel-basic-info-header"
        >
          <Typography component="span">Thông tin cơ bản</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form noValidate onSubmit={handleSubmit(onSubmitBasicInfo)} id='form-create-update-item'>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
              <Controller
                disabled={viewOnly}
                name="itemName"
                defaultValue={data?.ITEM_NAME}
                control={control}
                rules={{ required: 'Vui lòng nhập tên loại mặt hàng', }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Tên"
                    name='itemName'
                    fullWidth
                    error={!!errors.itemName}
                    helperText={errors.itemName?.message}
                  />
                )}
              />
              <Controller
                disabled={viewOnly}
                name="itemNameEn"
                control={control}
                defaultValue={data?.ITEM_NAME_EN}
                rules={{ required: 'Vui lòng nhập tên tiếng Anh', }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Tên tiếng Anh"
                    name='itemNameEn'
                    fullWidth
                    error={!!errors.itemNameEn}
                    helperText={errors.itemNameEn?.message}
                  />
                )}
              />
              {!isLoadingItemType && !errorItemType && !!dataItemType && <FormControl>
                <InputLabel id="itemType">loại</InputLabel>
                <Controller
                  disabled={viewOnly}
                  name="itemType"
                  defaultValue={data?.ITEM_TYPE ?? ''}
                  control={control}
                  rules={{ required: 'Vui lòng chọn loại mặt hàng', }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      sx={{ height: '100%' }}
                      id="itemType"
                      label="Loại hàng hóa"
                      labelId="itemType"
                      name='itemType'
                      error={!!errors.itemType}
                    >
                      <MenuItem value=''>--</MenuItem>
                      {dataItemType?.data?.itemTypes?.map((itemType) => (
                        <MenuItem key={itemType._id} value={itemType._id}>
                          {itemType.ITEM_TYPE_NAME}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              }
              {errorItemType && <Typography variant='body1' color='error'>Lỗi khi tải loại hàng hóa:</Typography>}
              {errors.unitInvoiceId && <Typography variant='caption' color='error'>{errors.unitInvoiceId.message}</Typography>}
              <MyEditor content={description} handleChange={(html) => setDescription(html)} isDisable={!!viewOnly}/>
              {!viewOnly && <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button variant="outlined" color="secondary" type="reset">
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </Box>}
            </Box>
          </form>
        </AccordionDetails>
      </Accordion>
      {/* Giá và đơn vị tính */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-price-unit-info-content"
          id="panel-price-unit-info-header"
        >
          <Typography component="span">Giá và đơn vị</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form noValidate onSubmit={handleSubmit(onSubmitPriceAndUnitInfo)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {!isLoadingItemUnit && !errorItemUnit && !!dataItemUnit && <FormControl>
                <InputLabel id="unitId">Đơn vị tính</InputLabel>
                <Controller
                  disabled={viewOnly}
                  name="unitId"
                  defaultValue={data?.UNIT ?? ''}
                  control={control}
                  rules={{ required: 'Vui lòng chọn đơn vị tính', }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      sx={{ height: '100%' }}
                      id="unitId"
                      label="Đơn vị tính"
                      labelId="unitId"
                      name='unitId'
                      error={!!errors.unitId}
                    >
                      <MenuItem value=''>--</MenuItem>
                      {dataItemUnit?.data?.map((itemUnit) => (
                        <MenuItem key={itemUnit._id} value={itemUnit._id}>
                          {itemUnit.UNIT_ITEM_NAME}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              }
              {errorItemType && <Typography variant='body1' color='error'>Lỗi khi tải loại hàng hóa:</Typography>}
              {errors.unitId && <Typography variant='caption' color='error'>{errors.unitId.message}</Typography>}
              {!isLoadingUnitInvoice && !errorUnitInvoice && !!dataUnitInvoice && <FormControl>
                <InputLabel id="unitInvoiceId">Đơn vị tiền tệ</InputLabel>
                <Controller
                  disabled
                  name="unitInvoiceId"
                  defaultValue={data?.PRICE[data?.PRICE.length - 1]?.UNIT ?? ''}
                  control={control}
                  rules={{ required: 'Vui lòng chọn đơn vị tiền tệ', }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      sx={{ height: '100%' }}
                      id="unitInvoiceId"
                      label="Đơn vị tiền tệ"
                      labelId="unitInvoiceId"
                      name='unitInvoiceId'
                      error={!!errors.unitInvoiceId}
                    >
                      <MenuItem value=''>--</MenuItem>
                      {dataUnitInvoice?.data?.map((unitInvoice) => (
                        <MenuItem key={unitInvoice._id} value={unitInvoice._id}>
                          {unitInvoice.UNIT_NAME}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              }
              {errorItemType && <Typography variant='body1' color='error'>Lỗi khi tải loại hàng hóa:</Typography>}
              {errors.unitInvoiceId && <Typography variant='caption' color='error'>{errors.unitInvoiceId.message}</Typography>}
              <Controller
                disabled={viewOnly}
                name="price"
                defaultValue={data?.PRICE[data?.PRICE.length - 1]?.PRICE_AMOUNT}
                control={control}
                rules={{ required: 'Vui lòng nhập giá hàng hóa', }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Giá"
                    name='price'
                    type='number'
                    fullWidth
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                )}
              />
              {!viewOnly && <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button variant="outlined" color="secondary" type="reset">
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </Box>}
            </Box>
          </form>
        </AccordionDetails>
      </Accordion>
      {/* Hình ảnh */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-price-unit-info-content"
          id="panel-price-unit-info-header"
        >
          <Typography component="span">Ảnh và bộ sưu tập</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form noValidate onSubmit={handleSubmit(onSubmitImgae)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {!viewOnly ? <Box>
                <Typography variant="h6" mb={2} fontWeight={600}>Thêm ảnh đại diện</Typography>
                <ImagesUploader handleChange={handleChangeFiles} limit={1} data={[{ url: data?.AVATAR_IMAGE_URL }]} />
              </Box> : <Box>
                <Typography variant='h6' mb={2}>Ảnh đại diện:</Typography>
                <ShowImagePanel images={[{ URL: data?.AVATAR_IMAGE_URL }]} />
              </Box>}
              {!viewOnly ? <Box>
                <Typography variant="h6" mb={2} fontWeight={600}>Thêm ảnh mô tả</Typography>
                <ImagesUploader handleChange={handleChangeDescFiles} data={[{ url: data?.AVATAR_IMAGE_URL }]} />
              </Box> : <Box>
                <Typography variant='h6' mb={2}>Ảnh mô tả:</Typography>
                <ShowImagePanel images={data?.LIST_IMAGE} />
              </Box>}
              {!viewOnly && <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button variant="outlined" color="secondary" type="reset">
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </Box>}
            </Box>
          </form>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-price-unit-info-content"
          id="panel-price-unit-info-header"
        >
          <Typography component="span">Thành phần nguyên liệu</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form noValidate onSubmit={handleSubmit(onSubmitImgae)}>
            <BomMaterialUpdate data={data?.BOM_MATERIALS} itemId={data?._id} viewOnly={viewOnly} />
          </form>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default ItemUpdateForm