import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const userSignIn = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body
    if (!username && !email) {
        throw new ApiError(400, "Username or email is required")
    }
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (!user) {
        throw new ApiError(404, "User Is not exist")
    }

    if (password === user.password) {
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user,
                },
                "User Logged In Sucessfully"
            )
        )
    }
    return res
        .status(404)
        .json(
            new ApiResponse(
                404,
                {},
                "Wrong password"
            )
        )


});

const userSignUp = asyncHandler(async (req, res) => {
    const {username , email, password} = req.body
    if (
        [email, username, password].some((field) =>
            field?.trim === "")
    ) {
        throw new ApiError(400, "Fullname is required")
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    const user = await User.create({
        email,
        password,
        username
    })
    const createdUser = await User.findById(user._id).select(
        "-password"
    )
    if (!createdUser) {
        throw new ApiError("500", "Something went Wrong !!! While registering the User")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )

});

export {
    userSignIn,
    userSignUp
};
