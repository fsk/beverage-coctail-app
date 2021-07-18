const axios = require("axios").default;

const getAllBeverage = (req, res) => {
    let options = {
        method: "GET",
        url: "https://the-cocktail-db.p.rapidapi.com/popular.php",
        headers: {
            "x-rapidapi-key": "5a2e95825amsh338fdb93843cd22p1c89f4jsn2a1f9509e7db",
            "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
        },
    };
    axios
        .request(options)
        .then((response) => {
            const beverages = response.data.drinks;

            const payload = beverages.map((item) => {
                const ingredient = [];
                for (let i = 1; i <= 15; i++) {
                    if (item[`strIngredient${i}`] !== null) {
                        ingredient.push(item[`strIngredient${i}`]);
                    }
                }
                return {
                    id: item.idDrink,
                    name: item.strDrink,
                    tag: item.strTags?.split(","),
                    instructions: item.strInstructions,
                    image: item.strDrinkThumb,
                    imageSouce: item.strImageSource,
                    ingredient,
                };
            });

            res.render("./beverage/allBeverages", { payload });
        })
        .catch((err) => {
            console.log(err.message);
            console.log(err.response.status);
            res.json({
                message: "Error: " + err.message,
            });
        });
};

const getBeverageByName = (req, res) => {
    let beverageName = req.params.coctailName;

    let options = {
        method: "GET",
        url: "https://the-cocktail-db.p.rapidapi.com/search.php",
        params: { i: `${beverageName}` },
        headers: {
            "x-rapidapi-key": "5a2e95825amsh338fdb93843cd22p1c89f4jsn2a1f9509e7db",
            "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
        },
    };

    axios
        .request(options)
        .then((response) => {
            const beverage = response.data.ingredients[0];
            const payloadBeverage = {
                name: beverage.strIngredient,
                description: beverage.strDescription
            };

            console.log(payloadBeverage);
            res.render("./beverage/beverageByName", { payloadBeverage });
        })
        .catch((err) => {
            console.log(err.message);
            //console.log(err.response.status);
            res.json({
                message: "Error: " + err.message,
            });
        });
};



const search = (req, res) => {
    // let beverageName = req.body.search;

    // let options = {
    //     method: "GET",
    //     url: "https://the-cocktail-db.p.rapidapi.com/search.php",
    //     params: { i: `${beverageName}` },
    //     headers: {
    //         "x-rapidapi-key": "5a2e95825amsh338fdb93843cd22p1c89f4jsn2a1f9509e7db",
    //         "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
    //     },
    // };

    // axios
    //     .request(options)
    //     .then((response) => {
    //         const beverage = response.data.ingredients[0];
    //         const payloadBeverage = {
    //             name: beverage.strIngredient,
    //             description: beverage.strDescription
    //         };

    //         console.log(payloadBeverage);
    //         res.render("./beverage/beverageByName", { payloadBeverage });
    //     })
    //     .catch((err) => {
    //         console.log(err.message);
    //         //console.log(err.response.status);
    //         res.json({
    //             message: "Error: " + err.message,
    //         });
    //     });
};

module.exports = {
    getAllBeverage,
    getBeverageByName,
    search
};