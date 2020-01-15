/*
Handle error for MenuItems
*/
const onCreated = () => {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}


/*
Create MenuItems
*/
browser.runtime.onMessage.addListener((request) => {
  if(request.message === "updateContextMenu" ){
    browser.menus.removeAll()
   
    let title = "Preise && Verfügbarkeit"
    browser.menus.create({
      id: "price",
      title: title,
      contexts: ["all"],
      documentUrlPatterns: ["*://*.notebooksbilliger.de/*"]
    },onCreated)

    title = "Stamm"
    browser.menus.create({
      id: "section_main_data",
      title: title,
      contexts: ["all"],
      documentUrlPatterns: ["*://*.notebooksbilliger.de/*"]
    },onCreated)

    title = "Artikelbeschreibung"
    browser.menus.create({
      id: "section_article_description",
      title: title,
      contexts: ["all"],
      documentUrlPatterns: ["*://*.notebooksbilliger.de/*"]
    },onCreated)

    title = "Dateien"
    browser.menus.create({
      id: "section_files",
      title: title,
      contexts: ["all"],
      documentUrlPatterns: ["*://*.notebooksbilliger.de/*"]
    },onCreated)

    title = "Eigenschaften"
    browser.menus.create({
      id: "section_properties",
      title: title,
      contexts: ["all"],
      documentUrlPatterns: ["*://*.notebooksbilliger.de/*"]
    },onCreated)
  }
  else if(request.message === "removeContextMenu")
    browser.menus.removeAll()
})

/*
On MenuItem selection communicate with content_script
*/
browser.menus.onClicked.addListener((info, tab) => {
  browser.tabs.sendMessage(tab.id, {})
  .then((response) => {
    let URL
    if(info.menuItemId === "price")
      URL = "https://backend.notebooksbilliger.de/admin/products.php?section=" + info.menuItemId + "&action=show&pID=" + response.productID; 		
    else
      URL = "https://backend.notebooksbilliger.de/admin/admin.php/product/physical/edit/"+ response.productID + "#" + info.menuItemId;
    browser.tabs.create({url: URL});
	})
})
