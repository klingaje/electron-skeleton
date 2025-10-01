/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

function listProducts(products) {
    for (prod of products) {
        document.getElementById('products').innerHTML += `<li id="prod-${prod.id}">${prod.name} </li>`
    }
}

async function getProduct(id) {
    product =  await window.exposed.getProducts(id) 
    console.log(product)
    document.getElementById('product-info').innerHTML += `${prod.id} ${prod.name}`
}

(async() => {

    // Run a function that gets data from main.js
    console.log(await window.exposed.getStuffFromMain())
    
    // Run a function sends data to main.js
    await window.exposed.sendStuffToMain('Stuff from renderer')

    listProducts( await window.exposed.getProducts() )
    
})()

document.getElementById('products').addEventListener('click',(e) => {
    getProduct(e.target.id.split('-')[1])
    // document.getElementById('product-info').innerHTML = `${prod.id} ${prod.name}`
    })

