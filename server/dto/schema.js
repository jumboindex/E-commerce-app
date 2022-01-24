const yup = require('yup');

const userDTO = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required')
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
    first_name: yup.string().trim().required('First name is required'),
    last_name: yup.string().trim().required('Last name is required'),
    google: yup.object().notRequired()
});

const updateUserDto  = yup.object().shape({
    id: yup.number().positive().integer().required('User ID id required'),
    password: yup.string()
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
    first_name: yup.string().trim(),
    last_name: yup.string().trim(),
    google: yup.object().notRequired()
})

module.exports = {
    userDTO,
    updateUserDto
}