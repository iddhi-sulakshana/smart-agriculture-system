export default function (query) {
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
            $unset: "user",
        },
    ];
}
