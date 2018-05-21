const axios = require('axios');

const key = `Bearer ${process.env.YELP_KEY}`;

const getBusinessData = async location => {
    try {
        const response = await axios({ 
            url: `https://api.yelp.com/v3/businesses/search?term=bar&location=${location}`, 
            method: "get", 
            headers: { "Authorization": key } });

        const businesses = response.data.businesses;
        let parseBusinessData = []; 
        let promises = [];

        for (let i = 0; i < businesses.length; i++) {

            let review = await axios({
                    url: `https://api.yelp.com/v3/businesses/${businesses[i].id}/reviews`,
                    method: "get",
                    headers: {
                        "Authorization": key
                    }
                });

            const business = {};
            business.id = businesses[i].id;
            business.name = businesses[i].name;
            business.img = businesses[i].image_url;            
            business.review = review.data.reviews[0].text;
            business.going = [];
            parseBusinessData.push(business);

        }
        return parseBusinessData;
    } catch (e) {
        return Promise.reject(e);
    }
}

module.exports = { getBusinessData };

