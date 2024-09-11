import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    users: [
        {
            id: '66dfee910c5787f75c428cd5',
            fullName: 'Muhammad Hussnain Shaker',
            phoneNumber: '3038613251',
            email: 'mhussnainshaker@gmail.com',
            role: 'customer',
            profileImageUrl:
                'http://res.cloudinary.com/dpor350rk/image/upload/v1725951633/vgxzn5h9lsx1bjjrr6y6.png',
            createdAt: '2023-01-08T04:07:13.869Z',
            updatedAt: '2023-01-08T04:43:48.625Z',
        },
    ],
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
})

export default userSlice.reducer
