import mongoose from "mongoose";

export default function (id) {
    return [
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $unwind: "$user",
        },
        {
            $addFields: {
                user: {
                    _id: "$user._id",
                    name: "$user.name",
                    email: "$user.email",
                    role: "$user.role",
                    avatar: "$user.avatar",
                    password: null,
                },
            },
        },
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category",
            },
        },
        {
            $unwind: "$category",
        },
        {
            $lookup: {
                from: "locations",
                localField: "location",
                foreignField: "_id",
                as: "location",
            },
        },
        {
            $unwind: "$location",
        },
        {
            $addFields: {
                location: "$location.name",
            },
        },
    ];
}
