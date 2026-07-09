import * as yup from "yup"

const validateImage = (value) => {
    const supportedFormats = ['image/webp'];
    const maxSize = 500 * 1024
    if (!value || value.length === 0) return true;
    return supportedFormats.includes(value[0]?.type) && value[0]?.size <= maxSize
}
const validateProfileImage = (value) => {
    const supportedFormats = ['image/webp', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 1024 * 1024
    if (!value || value.length === 0) return true;
    return supportedFormats.includes(value[0]?.type) && value[0]?.size <= maxSize
}

export const productSchema = yup.object({
    category: yup.string().required('Category is required!').trim(),
    tags: yup.array().of(yup.object({ value: yup.string().required('Tag is required!').trim() })),
    colors: yup.array().of(yup.object({
        value: yup.string().required('Color is required!').trim().matches(/^#[0-9a-fA-F]{6}$/, 'Must be a valid 7-character hexadecimal [0-9, A-F] code (e.g. #FFFFFF)')
    })),
    sizes: yup.array().of(yup.object({ value: yup.string().required('Size is required!') })),
    title: yup.string().required('Title is required!').max(50, 'Title can be maximum 50 characters.').trim(),
    desc: yup.string().required('Description is required!').max(500, 'Description can be maximum 500 characters.').trim(),
    oldPrice: yup
        .number()
        .nullable()
        .integer()
        .transform((value, originalValue) => (originalValue === "" ? null : value))
        .moreThan(0, 'Old Price should be more than 0'),

    newPrice: yup
        .number()
        .required('New Price is required!')
        .moreThan(0, 'New Price should be more than 0')
        .when('oldPrice', {
            is: (oldPrice) => oldPrice !== null && oldPrice !== undefined,
            then: (schema) => schema.lessThan(yup.ref('oldPrice'), 'New price should be less than old price'),
        }),



    // For color 0
    color0image0: yup.mixed().test("conditionalRequired", "Image is required!", function (value) {
        const mode = this.options.context
        if (mode === 'add') {
            return value && value.length > 0;
        }
        return true;
    }).test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),

    color0image1: yup.mixed().test("conditionalRequired", "Image is required!", function (value) {
        const mode = this.options.context
        if (mode === 'add') {
            return value && value.length > 0;
        }
        return true;
    }).test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),

    color0image2: yup.mixed().test("conditionalRequired", "Image is required!", function (value) {
        const mode = this.options.context
        if (mode === 'add') {
            return value && value.length > 0;
        }
        return true;
    }).test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),

    color0image3: yup.mixed().test("conditionalRequired", "Image is required!", function (value) {
        const mode = this.options.context
        if (mode === 'add') {
            return value && value.length > 0;
        }
        return true;
    }).test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),

    // For color 1
    color1image0: yup.mixed().when('colors', {
        is: (colors) => colors && colors.length > 1,
        then: (schema) => schema.test("conditionalRequired", "Image is required!", function (value) {
            const mode = this.options.context
            if (mode === 'add') {
                return value && value.length > 0;
            }
            return true;
        }),
        otherwise: (schema) => schema.nullable().notRequired(),
    }).test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    color1image1: yup.mixed().when('colors', {
        is: (colors) => colors && colors.length > 1,
        then: (schema) => schema.test("conditionalRequired", "Image is required!", function (value) {
            const mode = this.options.context
            if (mode === 'add') {
                return value && value.length > 0;
            }
            return true;
        }),
        otherwise: (schema) => schema.nullable().notRequired(),
    }).test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    color1image2: yup.mixed().when('colors', {
        is: (colors) => colors && colors.length > 1,
        then: (schema) => schema.test("conditionalRequired", "Image is required!", function (value) {
            const mode = this.options.context
            if (mode === 'add') {
                return value && value.length > 0;
            }
            return true;
        }),
        otherwise: (schema) => schema.nullable().notRequired(),
    }).test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    color1image3: yup.mixed().when('colors', {
        is: (colors) => colors && colors.length > 1,
        then: (schema) => schema.test("conditionalRequired", "Image is required!", function (value) {
            const mode = this.options.context
            if (mode === 'add') {
                return value && value.length > 0;
            }
            return true;
        }),
        otherwise: (schema) => schema.nullable().notRequired(),
    }).test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),

    // For color 2
    color2image0: yup.mixed().when('colors', {
        is: (colors) => colors && colors.length > 1,
        then: (schema) => schema.test("conditionalRequired", "Image is required!", function (value) {
            const mode = this.options.context
            if (mode === 'add') {
                return value && value.length > 0;
            }
            return true;
        }),
        otherwise: (schema) => schema.nullable().notRequired(),
    }).test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    color2image1: yup.mixed().when('colors', {
        is: (colors) => colors && colors.length > 1,
        then: (schema) => schema.test("conditionalRequired", "Image is required!", function (value) {
            const mode = this.options.context
            if (mode === 'add') {
                return value && value.length > 0;
            }
            return true;
        }),
        otherwise: (schema) => schema.nullable().notRequired(),
    }).test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    color2image2: yup.mixed().when('colors', {
        is: (colors) => colors && colors.length > 1,
        then: (schema) => schema.test("conditionalRequired", "Image is required!", function (value) {
            const mode = this.options.context
            if (mode === 'add') {
                return value && value.length > 0;
            }
            return true;
        }),
        otherwise: (schema) => schema.nullable().notRequired(),
    }).test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    color2image3: yup.mixed().when('colors', {
        is: (colors) => colors && colors.length > 1,
        then: (schema) => schema.test("conditionalRequired", "Image is required!", function (value) {
            const mode = this.options.context
            if (mode === 'add') {
                return value && value.length > 0;
            }
            return true;
        }),
        otherwise: (schema) => schema.nullable().notRequired(),
    }).test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),

    // For color 3
    color3image0: yup.mixed().when('colors', {
        is: (colors) => colors && colors.length > 1,
        then: (schema) => schema.test("conditionalRequired", "Image is required!", function (value) {
            const mode = this.options.context
            if (mode === 'add') {
                return value && value.length > 0;
            }
            return true;
        }),
        otherwise: (schema) => schema.nullable().notRequired(),
    }).test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    color3image1: yup.mixed().when('colors', {
        is: (colors) => colors && colors.length > 1,
        then: (schema) => schema.test("conditionalRequired", "Image is required!", function (value) {
            const mode = this.options.context
            if (mode === 'add') {
                return value && value.length > 0;
            }
            return true;
        }),
        otherwise: (schema) => schema.nullable().notRequired(),
    }).test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    color3image2: yup.mixed().when('colors', {
        is: (colors) => colors && colors.length > 1,
        then: (schema) => schema.test("conditionalRequired", "Image is required!", function (value) {
            const mode = this.options.context
            if (mode === 'add') {
                return value && value.length > 0;
            }
            return true;
        }),
        otherwise: (schema) => schema.nullable().notRequired(),
    }).test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    color3image3: yup.mixed().when('colors', {
        is: (colors) => colors && colors.length > 1,
        then: (schema) => schema.test("conditionalRequired", "Image is required!", function (value) {
            const mode = this.options.context
            if (mode === 'add') {
                return value && value.length > 0;
            }
            return true;
        }),
        otherwise: (schema) => schema.nullable().notRequired(),
    }).test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
})

export const faqSchema = yup.object({
    question: yup.string().required('Question is required!').max(150, 'Question can be maximum 150 characters.').trim(),
    answer: yup.string().required('Answer is required!').max(650, 'Question can be maximum 650 characters.').trim(),
})

export const loginSchema = yup.object({
    email: yup.string().email('Email should be valid Email Address!').required('Email is required!').trim(),
    password: yup.string()
        .required('Password is required!')
        .min(8, 'At least 8 characters')
        .max(12, 'At most 12 characters')
        .matches(/[a-z]/, 'At least one lowercase letter')
        .matches(/[A-Z]/, 'At least one uppercase letter')
        .matches(/[0-9]/, 'At least one number')
        .matches(/[^a-zA-Z0-9]/, 'At least one special character')
        .matches(/^\S*$/, 'No spaces allowed')
})

export const registerSchema = yup.object({
    name: yup.string().required('Name is required!').trim(),
    email: yup.string().email('Email should be valid Email Address!').required('Email is required!').trim(),
    password: yup.string()
        .required('Password is required!')
        .min(8, 'At least 8 characters')
        .max(12, 'At most 12 characters')
        .matches(/[a-z]/, 'At least one lowercase letter')
        .matches(/[A-Z]/, 'At least one uppercase letter')
        .matches(/[0-9]/, 'At least one number')
        .matches(/[^a-zA-Z0-9]/, 'At least one special character')
        .matches(/^\S*$/, 'No spaces allowed')
})

export const profileSchema = yup.object({
    name: yup.string().required('Name is required!').trim(),
    email: yup.string().email('Email should be valid Email Address!').required('Email is required!').trim(),
    password: yup.string()
        .nullable()
        .notRequired()
        .test(
            "password-validation",
            "Password must be 8–12 chars, include upper, lower, number & special char, no spaces",
            function (value) {
                if (!value) return true;

                return (
                    value.length >= 8 &&
                    value.length <= 12 &&
                    /[a-z]/.test(value) &&
                    /[A-Z]/.test(value) &&
                    /[0-9]/.test(value) &&
                    /[^a-zA-Z0-9]/.test(value) &&
                    /^\S*$/.test(value)
                );
            }
        ),
    password_confirmation: yup.string().when('password', {
        is: (password) => password && password !== "",
        then: (schema) => schema.required('Password Confirmation is required.').test('confirmValidation', 'Password Confirmation does not match!', function (value) {
            return value === this.parent.password
        }),
        otherwise: (schema) => schema.nullable().notRequired()
    }),
    photo: yup.mixed().test('imageeValidation', 'Image should be type of "jpg, png, jpeg, webp" and max 1MB', validateProfileImage)
})

export const reviewSchema = yup.object({
    rating: yup.number().min(1, 'Please give some rating!').max(5, 'Rating can be max 5'),
    message: yup.string().max(600)
})

export const checkoutSchema = yup.object({
    contact: yup.string().required('Contact is required'),
    email: yup.string().required('Email is required').email('Invalid email'),

    shippingFirstName: yup.string().required('First Name is required'),
    shippingLastName: yup.string().required('Last Name is required'),
    shippingAddress: yup.string().required('Address is required'),
    shippingCity: yup.string().required('City is required'),
    shippingProvince: yup.string().required('Province is required'),
    shippingZip: yup.string().required('Zip is required').max(5, 'Zip code must be 5 characters long'),

    billingFirstName: yup.string().when('sameAsShipping', { is: (sameAsShipping) => sameAsShipping === false, then: (schema) => schema.required('First Name is required'), otherwise: (schema) => schema.notRequired() }),
    billingLastName: yup.string().when('sameAsShipping', { is: (sameAsShipping) => sameAsShipping === false, then: (schema) => schema.required('Last Name is required'), otherwise: (schema) => schema.notRequired() }),
    billingAddress: yup.string().when('sameAsShipping', { is: (sameAsShipping) => sameAsShipping === false, then: (schema) => schema.required('Address is required'), otherwise: (schema) => schema.notRequired() }),
    billingCity: yup.string().when('sameAsShipping', { is: (sameAsShipping) => sameAsShipping === false, then: (schema) => schema.required('City is required'), otherwise: (schema) => schema.notRequired() }),
    billingProvince: yup.string().when('sameAsShipping', { is: (sameAsShipping) => sameAsShipping === false, then: (schema) => schema.required('Province is required'), otherwise: (schema) => schema.notRequired() }),
    billingZip: yup.string().when('sameAsShipping', { is: (sameAsShipping) => sameAsShipping === false, then: (schema) => schema.required('Zip is required').max(5, 'Zip code must be 5 characters long'), otherwise: (schema) => schema.notRequired() }),

    cardholderName: yup.string().when('payMethod', { is: (payMethod) => payMethod === 'card', then: (schema) => schema.required('Cardholder Name is required'), otherwise: (schema) => schema.notRequired() }),
    cardNumber: yup.string().when('payMethod', { is: (payMethod) => payMethod === 'card', then: (schema) => schema.required('Card number is required').min(19, 'Card Number must be 16 Characters').max(19, 'Card Number must be 16 Characters'), otherwise: (schema) => schema.notRequired() }),
    expiryDate: yup.string().when('payMethod', { is: (payMethod) => payMethod === 'card', then: (schema) => schema.required('Expiry Date is required'), otherwise: (schema) => schema.notRequired() }),
    cvv: yup.string().when('payMethod', { is: (payMethod) => payMethod === 'card', then: (schema) => schema.required('CVV is required').min(3, 'CVV must be 3 Characters').max(3, 'CVV must be 3 Characters'), otherwise: (schema) => schema.notRequired() }),
})

export const mediaLibrarySchema = yup.object({
    heroLImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    heroCImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    heroRImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),

    heroCatShirtImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    heroCatPantImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    heroCatHoodieImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    heroCatJacketImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    heroCatShoesImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),

    bottomCatShirtImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    bottomCatPantImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    bottomCatHoodieImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    bottomCatJacketImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    bottomCatShoesImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),

    searchCatShirtImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    searchCatPantImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    searchCatHoodieImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    searchCatJacketImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
    searchCatShoesImg: yup.mixed().test('imageValidation', 'Image should be type of "webp" and max 500KB', validateImage),
})

export const shippingChargesSchema = yup.object({
    charges: yup.number().min(0, 'Shipping charges can be minimum 0.')
})