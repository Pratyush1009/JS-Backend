// Using Promise
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}

export default asyncHandler


// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}

// Higher Order function are functions which accept function as an arguement and also can return func
// const asyncHandler = (func) => async() => {}

/* Using TryCatch

const asyncHandler = (func) => async (req, res, next) => {
    try {
        await func(req, res, next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
} */