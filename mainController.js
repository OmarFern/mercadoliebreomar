const fs = require('fs');
const path = require('path');

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, './productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* La constante "toThousand" deben enviarla como parametro en el res.render,
les ayudará para mostrar el precio final adecuadamente con 
una cantidad de decimales fija. Es una función, solamente deben poner
como parámetro el precio final (en el archivo ejs): toThousand(finalPrice)*/
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	
	index: (req, res) => {
		const visitedProducts = products.filter(product => {
			return product.category == "visited"
		});
		const saleProducts = products.filter(product => {
			return product.category == "in-sale"
		});

		res.render("index.ejs",{
			visitedProducts: visitedProducts,
			saleProducts: saleProducts,
			toThousand: toThousand
		})
	},

	search: (req, res) => {
		let search = req.query.keywords;
		let filteredProducts = products.filter(product => {
			return product.name.toLowerCase().includes(search)	
		});

		res.render('results', { 
			filteredProducts: filteredProducts, 
			search: search,
			toThousand: toThousand,
		});
		res.render("results")
	},
};

module.exports = controller;
