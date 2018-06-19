console.log(localStorage._id);


let url = "http://api.shortlyst.com/v1/products/" + localStorage._id + "?apikey=e3ebd9fdf9704775c7fd6bb4f20e1798";

$.ajax({
    type: "GET",
    url: url,
    success: function(response){
        console.log(response);
        let titleElem = $("#title");
        titleElem[0].textContent = response.title;
        
        let offerElem = $("#offer_price");
        offerElem[0].textContent = "₹"+response.offerPrice+".00";
        
        if(response.salePrice > response.offerPrice){
            let saleElem = $("#sale_price");
            saleElem[0].textContent = "₹"+response.salePrice+".00";
        }

        let imgElem = $("#product_image");
        imgElem[0].src = response.imageUrl;

        let descElem = $("#description");
        descElem[0].innerHTML = response.description;
    },
    error: function (error) {
        console.log(error);
    }
});