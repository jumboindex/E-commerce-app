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

const updateUserDto = yup.object().shape({
    id: yup.number().positive().integer().required('User ID id required'),
    password: yup.string()
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
    first_name: yup.string().trim(),
    last_name: yup.string().trim(),
    google: yup.object().notRequired()
});

const cartDTO = yup.object().shape({
    user_id: yup.number().positive().integer().required('User ID is required'),
    product_id: yup.number().positive().integer().required('Product ID is required'),
    quantity: yup.number().positive().integer().required('Quantity is required')
})

const routeParamUser = yup.object().shape({
    id: yup.number().positive().integer().required('ID is required for get request')
});

const routeParamCartUserId = yup.object().shape({
    user_id: yup.number().positive().integer().required('User ID is required')
});

const routeParamCartProductId = yup.object().shape({
    product_id: yup.number().positive().integer().required('Product ID is required')
});

const routeParamCartId = yup.object().shape({
    cart_id: yup.number().positive().integer().required('Cart ID is required')
});

module.exports = {
    userDTO,
    updateUserDto,
    cartDTO,
    routeParamUser, 
    routeParamCartUserId,
    routeParamCartProductId,
    routeParamCartId  
}