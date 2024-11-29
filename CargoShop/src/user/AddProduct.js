import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../slices/ProductsSlice';
import { useNavigate, useParams } from 'react-router-dom';

function ProductForm() {

    let { id } = useParams();
    id = parseInt(id);

    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [product, setProduct] = useState(
        id ? products.filter((p) => p.id === id)[0] ?? {name: '', description: '', id: 0, price: 0, seller: 'Leonardo Pinto', category: '', image: 'https://escoladegoverno.rs.gov.br/wp-content/uploads/2023/05/placeholder-1.png'
        } : {name: '', description: '', id: 0, price: 0, seller: 'Leonardo Pinto', category: '', image: 'https://escoladegoverno.rs.gov.br/wp-content/uploads/2023/05/placeholder-1.png'
        }
    );

    const [actionType, ] = useState(
        id ? products.filter((p) => p.id === id)[0] ? 'update' : 'add' : 'add'
    );

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (event) => {
        setProduct({ ...product, image: event.target.files[0] });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (actionType === 'add')
            dispatch(addProduct(product));
        else
            dispatch(updateProduct(product));
        navigate('/');
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={product.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name="description" value={product.description} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" className="form-control" id="price" name="price" value={product.price} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select className="form-select" id="category" name="category" value={product.category} onChange={handleChange}>
                <option value="Todas">Categoria</option>
                <option value="Beleza">Beleza</option>
                <option value="Bicicletas">Bicicletas</option>
                <option value="Compras">Compras</option>
                <option value="Eletrônicos">Eletrônicos</option>
                <option value="Ferramentas">Ferramentas</option>
                <option value="Joalheria">Joalheria</option>
                <option value="Óculos">Óculos</option>
                <option value="Papelaria">Papelaria</option>
                <option value="Relógios">Relógios</option>
                <option value="Todas">Geral</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">Image</label>
                <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default ProductForm;