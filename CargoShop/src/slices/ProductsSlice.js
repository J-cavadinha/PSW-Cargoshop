import { createSlice } from '@reduxjs/toolkit';

const initialProducts = [
        // Beleza
        { id: 19, name: 'Batom', price: 20, description: 'Batom vermelho.', category: 'Beleza' },
        { id: 20, name: 'Rímel', price: 15, description: 'Rímel excelente.', category: 'Beleza' },
        // Bicicletas
        { id: 1, name: 'Mountain Bike Aro 29', price: 2500, description: 'Bicicleta ideal para trilhas e terrenos acidentados.', category: 'Bicicletas' },
        { id: 2, name: 'Bicicleta Speed', price: 3000, description: 'Bicicleta leve e aerodinâmica para longas distâncias.', category: 'Bicicletas' },
        // Compras
        { id: 3, name: 'Smartphone de última geração', price: 5000, description: 'Celular com câmera de alta resolução e processador potente.', category: 'Compras' },
        { id: 4, name: 'Smartwatch', price: 1500, description: 'Relógio inteligente para monitorar atividades físicas.', category: 'Compras' },
        // Eletrônicos
        { id: 5,  name: 'Notebook Gamer', price: 8000, description: 'Notebook com placa de vídeo potente para jogos.', category: 'Eletrônicos' },
        { id: 6,  name: 'Fones de Ouvido Sem Fio', price: 500, description: 'Fones de ouvido com alta qualidade de som e conexão Bluetooth.', category: 'Eletrônicos' },
        // Ferramentas
        { id: 7,  name: 'Parafusadeira', price: 300, description: 'Ferramenta versátil para diversos tipos de trabalho.', category: 'Ferramentas' },
        { id: 8,  name: 'Serra Circular', price: 800, description: 'Ferramenta para cortar madeira.', category: 'Ferramentas' },
        // Joalheria
        { id: 9,  name: 'Anel de Diamante', price: 10000, description: 'Joia elegante e sofisticada.', category: 'Joalheria' },
        { id: 10, name: 'Colar de Ouro', price: 5000, description: 'Colar clássico e atemporal.', category: 'Joalheria' },
        // Óculos
        { id: 11, name: 'Óculos de Sol', price: 300, description: 'Óculos com proteção UV para os olhos.', category: 'Óculos' },
        { id: 12, name: 'Óculos de Grau', price: 500, description: 'Óculos personalizados para correção visual.', category: 'Óculos' },
        // Papelaria
        { id: 13, name: 'Caderno Universitário', price: 20, description: 'Caderno para anotações e estudos.', category: 'Papelaria' },
        { id: 14, name: 'Canetas coloridas', price: 15, description: 'Conjunto de canetas para trabalhos criativos.', category: 'Papelaria' },
        // Relógios
        { id: 15, name: 'Relógio de Pulso Masculino', price: 800, description: 'Relógio elegante e funcional.', category: 'Relógios' },
        { id: 16, name: 'Relógio de Pulso Feminino', price: 700, description: 'Relógio delicado e feminino.', category: 'Relógios' },
    ];

const productSlice = createSlice({
    name: 'products',
    initialState: initialProducts,
    reducers: {
        addProduct(state, action) {
            let id = state.products.map(p => p.id).reduce((x, y) => Math.max(x, y));
            action.payload.id = id;
            state.products.push(action.payload);
        },
        updateProduct(state, action) {
            const { id, updatedProduct } = action.payload;
            const index = state.products.findIndex(product => product.id === id);
            state.products[index] = updatedProduct;
        },
        removeProduct(state, action) {
            const id = action.payload;
            state.products = state.products.filter(product => product.id !== id);
        },
    },
});

export const { addProduct, updateProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;