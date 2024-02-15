export default function ({ userId, query }) {
    if (!userId) {
        query.isSold = false;
        return [
            {
                $match: query,
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
