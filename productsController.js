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
	// (get) Root - Mostrar todos los productos
	index: (req, res) => {
		res.render("products.ejs", {
			products: products
		})
	},

	// (get) Detail - Detalle de un producto
	detail: (req, res) => {
		const id = req.params.id;
		const product = products.find(product => {
			return product.id == id
		})

		res.render("detail.ejs", {
			product: product
		})
	},

	// (get) Create - Formulario para crear
	create: (req, res) => {
		res.render("product-create-form.ejs");
	},
	
	// (post) Create - Método para guardar la info
	store: (req, res) => {
		const newProduct = {
			id: products[products.length - 1].id +1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			/* ...req.body, */
			image: req.file.filename
		}
		products.push(newProduct);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
		res.redirect("/");
	},

	// (get) Update - Formulario para editar
	edit: (req, res) => {
		const id = req.params.id;
		const product = products.find(product => {
			return product.id == id
		})

		res.render("product-edit-form", {
			product: product
		})
	},

	// (post) Update - Método para actualizar la info
	update: (req, res) => {
		const id = req.params.id;
		let productToEdit = products.find(product => product.id == id);
		
		productToEdit = {
			id: productToEdit.id,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			/* ...req.body, */
			image: req.file ? req.file.filename : productToEdit.image
		}

		let newProducts = products;
		newProducts[id-1] = productToEdit;

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, " "));
		res.redirect("/")
	},

	// (delete) Delete - Eliminar un producto de la DB
	destroy : (req, res) => {
		const id = req.params.id;
		let finalProducts = products.filter(product => product.id != id);

		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		res.redirect("/")
	}
};

module.exports = controller;