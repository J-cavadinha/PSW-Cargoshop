import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductServer, selectProductsById, updateProductServer } from '../slices/ProductsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema } from './ProductSchema';

function ProductForm() {
    let { id } = useParams();

    const productFound = useSelector(state => selectProductsById(state, id));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [actionType, ] = useState(
        id ? productFound ? 'update' : 'add' : 'add'
    );

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(productSchema)
    });

    const [productOnLoad] = useState(
        id ? productFound ?? productSchema.cast({}) : productSchema.cast({})
    );

    function onSubmit(product) {
        if (actionType === "add") {
            dispatch(addProductServer(product));
        } else {
            dispatch(updateProductServer({ ...product, id: productFound.id }));
        }

        navigate('/');
    };

    return (
        <div className="container">
            <br/>
            <div className="text-center"><h1>Produto</h1></div>
            <br/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input 
                        placeholder="Insira o nome do produto"
                        type="text"
                        className="form-control"
                        id="name"
                        autoComplete="off"
                        defaultValue={productOnLoad.name}
                        {...register("name")}
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descrição</label>
                    <textarea 
                        placeholder="Insira uma descrição para o produto"
                        className="form-control"
                        id="description"
                        defaultValue={productOnLoad.description}
                        {...register("description")}
                    />
                    {errors.description && <span>{errors.description.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Preço</label>
                    <div className="input-group">
                        <span className="input-group-text">R$</span>
                        <input
                            placeholder="Insira o valor do produto"
                            type="number"
                            step="0.01"
                            min={1}
                            className="form-control"
                            id="price"
                            defaultValue={productOnLoad.price}
                            {...register("price")}
                        />
                    </div>
                    {errors.price && <span>{errors.price.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Categoria</label>
                    <select
                        className="form-select"
                        id="category"
                        defaultValue={productOnLoad.category}
                        {...register("category")}
                    >
                        <option value="Todas">Geral</option>
                        <option value="Beleza">Beleza</option>
                        <option value="Bicicletas">Bicicletas</option>
                        <option value="Compras">Compras</option>
                        <option value="Eletrônicos">Eletrônicos</option>
                        <option value="Ferramentas">Ferramentas</option>
                        <option value="Joalheria">Joalheria</option>
                        <option value="Óculos">Óculos</option>
                        <option value="Papelaria">Papelaria</option>
                        <option value="Relógios">Relógios</option>
                    </select>
                    {errors.category && <span>{errors.category.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Imagem</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        defaultValue={productOnLoad.image}
                        {...register("image")}
                    />
                    {errors.image && <span>{errors.image.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default ProductForm;
