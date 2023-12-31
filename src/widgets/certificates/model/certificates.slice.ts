import { AnyAction }            from '@reduxjs/toolkit'
import { createAsyncThunk }     from '@reduxjs/toolkit'
import { createSlice }          from '@reduxjs/toolkit'
import { PayloadAction }        from '@reduxjs/toolkit'

import { Certificate }          from '../types'
import { CertificatesState }    from '../types'
import { loadCertificatesList } from './load-certificates.thunk'
import { RootState }            from './store'

export const postCertificate = createAsyncThunk<any, any, { state: RootState }>(
  'certificates/postCertificate',
  async (postData, { rejectWithValue }) => {
    const key = '011ba11bdcad4fa396660c2ec447ef14'
    const url = 'https://sycret.ru/service/api/api'
    try {
      const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          ...postData,
          MethodName: 'OSSale',
          ApiKey: key
        })
      })
      const data = await response.json()
      return data
    } catch (error) {}
  }
)

const initialState: CertificatesState = {
  certificatesList: [],
  selectedCertificate: null,
  loading: false,
  error: null
}

const certificatesSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {
    selectCertificate(state, action: PayloadAction<Certificate>) {
      state.selectedCertificate = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCertificatesList.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadCertificatesList.fulfilled, (
        state,
        action: PayloadAction<Certificate[]>
      ) => {
        state.loading = false
        state.certificatesList = action.payload
      })
      .addCase(loadCertificatesList.rejected, (state, action: AnyAction) => {
        state.error = action.payload
        state.loading = false
      })
      .addCase(postCertificate.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(postCertificate.fulfilled, (state, action: AnyAction) => {
        state.success = action.payload
        state.loading = false
      })
      .addCase(postCertificate.rejected, (state, action: AnyAction) => {
        state.error = action.payload
        state.loading = false
      })
  }
})

export const { selectCertificate } = certificatesSlice.actions
export default certificatesSlice.reducer
