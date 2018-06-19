let index;
$(document).ready(function(){

	index = 0;
	search(index);
	let search_bar = $("#search");
	search_bar.keypress(function(ev){
		console.log("entered", );
		if(ev.which == 13){
			index = 0;
			search(index);
		}
	});
});



function search(offset){
	let searchValue = $("#search").val();
	let search = "";
	if(undefined != searchValue && null != searchValue && "" != searchValue){
		search = "&q=" + searchValue;
	}
	offsetValue = "&index=" + offset;

	console.log(searchValue);
	let url="http://api.shortlyst.com/v1/products?limit=10&merchantFilter=&trueDealFilter=false&mode=lite&apikey=e3ebd9fdf9704775c7fd6bb4f20e1798&genderFilter=" + search + offsetValue;
	$.ajax({
		type: "GET",
		url: url,
		success: function(response){
			localStorage.clear();
			console.log(response.productList);
			let resultsDom = $("#results");
			let pagination_text = $("#pagination_text");
			// console.log("pagination_text", pagination_text);
			pagination_text[0].textContent = "";
			while (resultsDom[0].firstChild) {
				resultsDom[0].removeChild(resultsDom[0].firstChild);
			}
			if(undefined != response.productList.length && null != response.productList.length && 0 != response.productList.length){
				if(offset+10 > response.numFound){
					pagination_text[0].textContent = (offset+1) + "-" + response.numFound + " of " + response.numFound;
					let nextBtn = $("#next_btn");
					nextBtn[0].classList.add("display_none");
				}
				else{
					pagination_text[0].textContent = (offset+1) + "-" + (offset+10) + " of " + response.numFound;
				}
				products = response.productList;
				console.log(resultsDom);
				for(let i=0; i<products.length; i++){
					let row = document.createElement("div");
					row.classList.add("row");
					row.classList.add("product_row_cls");
					row.appendChild(getChild(products[i], i));
					if((products[i+1])){
						row.appendChild(getChild(products[i+1], i+1));
						i++;
					}
					resultsDom[0].appendChild(row);
				}
			}
		},
		error:function(err){
			console.log(err);
		}
	});
}

// creating product childs
function getChild(product, index){
	// <div class="col-sm-4">.col-sm-4</div>
	let childElement = document.createElement("div");
	childElement.classList.add("col-sm-6");
	childElement.classList.add("product_cls");
	childElement.classList.add("thumbnail");
	childElement.classList.add("cls_"+index);

	// img
	let childImg = document.createElement("img");
	childImg.src = product.imageUrl;
	childImg.classList.add("cls_"+index);
	childElement.appendChild(childImg);
	// childImg.onclick = productClick;
	// childImg.click(function(){
	// 	console.log("productClick");
	// });
	
	// title
	let childTitle = document.createElement("div");
	childTitle.textContent = product.title;
	childTitle.classList.add("cls_"+index);
	childElement.appendChild(childTitle);

	// price
	if(product.salePrice > product.offerPrice){
		let childSale = document.createElement("div");
		childSale.textContent = "₹" + product.salePrice + ".00";
		childSale.classList.add("strike_through");
		childSale.classList.add("cls_"+index);
		childElement.appendChild(childSale);
	}

	let childPrice = document.createElement("div");
	childPrice.textContent = "₹" + product.offerPrice + ".00";
	childPrice.classList.add("cls_"+index);


	childElement.appendChild(childPrice);
	childElement.onclick = productClick;

	return childElement;
}


// next()
function next(){
	index = index + 10;
	search(index);
}

// previous()
function previous(){
	let nextBtn = $("#next_btn");
	nextBtn[0].classList.remove("display_none");
	if(index >= 10){
		index = index - 10;
		search(index);
	}
}

function productClick(ev){
	// console.log(ev.target.classList[ev.target.classList.length-1].split("_")[1]);
	// console.log(products[ev.target.classList[ev.target.classList.length-1].split("_")[1]].productId);
	localStorage.setItem("_id", products[ev.target.classList[ev.target.classList.length-1].split("_")[1]].productId);
	window.open("./views/product.html", "_top");
}
