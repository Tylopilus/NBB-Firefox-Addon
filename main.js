/*
Makeing ProductID a class to get 'get' and 'set'
*/
const productID = class ProductID {
	static setElement(e) {
		this.e = e
	}

	static getProductID() {
		//Get productID from Meta-Tag in Product-Detail-Page	
		const exprMeta = /.*\/products_id\/(\d*)\//
		const resMeta = exprMeta.exec(document.querySelector("meta[property='og:url']").getAttribute('content'))
		console.log("resMeta", resMeta)
		if(resMeta)
			return resMeta[1]
		
		//Get productID from clicked productImage in Listview
		const exprImg = /.*\/images\/products\/(\d*)\/(\d*)\//
		const resImg = exprImg.exec(this.e.target.src)
		console.log("resImg", resImg)
		if(resImg)
			return resImg[2]
		
		//no match, return null
		return null
	}
}

/*
handling communication with background.js - resolves promise with productID
*/
browser.runtime.onMessage.addListener((request) => {
	return Promise.resolve({productID: productID.getProductID()})
})

/*
generating menu entries upon right click
*/
document.addEventListener("mousedown", (e) => {
	if(e.button !== 2)
		return false
	productID.setElement(e)

	if(productID.getProductID() != null)
		browser.runtime.sendMessage({
			message: "updateContextMenu"
		})
	else {
		browser.runtime.sendMessage({
			message: "removeContextMenu"
		})
	}
	return false
}, true)