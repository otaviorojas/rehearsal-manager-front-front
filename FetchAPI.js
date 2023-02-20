
export const find = async (database, collection, filter, signal) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('api-key', 'BhnN26rPhHEUXLY9FZTuNMnX2Q8CSuZBvO4KEDMwkcDsUaMPPRQoRX5JCiLGadji');
    myHeaders.append('Access-Control-Request-Headers', '*');
    console.log("Otavio")
    const url = "https://sa-east-1.aws.data.mongodb-api.com/app/data-yxjjc/endpoint/data/v1/action/find"
    var body = {
        "dataSource": "rehearsal",
        "database": database,
        "collection": collection,
    };

    if (filter) {
        body = { ...body, filter: filter }
    }
console.log("Otavio")
    let response = await fetch(url, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
    }, { signal })

    console.log(response)
    return response.json()
};

