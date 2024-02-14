export default function (userId) {
    if (!userId)
        return [
            {
                $match: {
                    isSold: false,
                },
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
    return [
        {
            $match: {
                user: userId,
                isSold: false,
            },
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
