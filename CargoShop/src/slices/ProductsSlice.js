import { createSlice } from '@reduxjs/toolkit';

const initialProducts = [
        // Beleza
        { id: 19, name: 'Batom', price: 20, description: 'Batom vermelho.', category: 'Beleza', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/2587370/pexels-photo-2587370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 20, name: 'Rímel', price: 15, description: 'Rímel excelente.', category: 'Beleza', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/2637820/pexels-photo-2637820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
        // Bicicletas
        { id: 1, name: 'Mountain Bike Aro 29', price: 2500, description: 'Bicicleta ideal para trilhas e terrenos acidentados.', category: 'Bicicletas', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
        { id: 2, name: 'Bicicleta Speed', price: 3000, description: 'Bicicleta leve e aerodinâmica para longas distâncias.', category: 'Bicicletas', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
        // Compras
        { id: 3, name: 'Smartphone de última geração', price: 5000, description: 'Celular com câmera de alta resolução e processador potente.', category: 'Compras', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
        { id: 4, name: 'Smartwatch', price: 1500, description: 'Relógio inteligente para monitorar atividades físicas.', category: 'Compras', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/2861929/pexels-photo-2861929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
        // Eletrônicos
        { id: 5,  name: 'Notebook Gamer', price: 8000, description: 'Notebook com placa de vídeo potente para jogos.', category: 'Eletrônicos', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 6,  name: 'Fones de Ouvido Sem Fio', price: 500, description: 'Fones de ouvido com alta qualidade de som e conexão Bluetooth.', category: 'Eletrônicos', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        // Ferramentas
        { id: 7,  name: 'Parafusadeira', price: 300, description: 'Ferramenta versátil para diversos tipos de trabalho.', category: 'Ferramentas', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/5974048/pexels-photo-5974048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 8,  name: 'Serra Circular', price: 800, description: 'Ferramenta para cortar madeira.', category: 'Ferramentas', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/5466152/pexels-photo-5466152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        // Joalheria
        { id: 9,  name: 'Anel de Diamante', price: 10000, description: 'Joia elegante e sofisticada.', category: 'Joalheria', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 10, name: 'Colar de Ouro', price: 5000, description: 'Colar clássico e atemporal.', category: 'Joalheria', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/6858599/pexels-photo-6858599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        // Óculos
        { id: 11, name: 'Óculos de Sol', price: 300, description: 'Óculos com proteção UV para os olhos.', category: 'Óculos', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/255305/pexels-photo-255305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 12, name: 'Óculos de Grau', price: 500, description: 'Óculos personalizados para correção visual.', category: 'Óculos', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/131018/pexels-photo-131018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        // Papelaria
        { id: 13, name: 'Caderno Universitário', price: 20, description: 'Caderno para anotações e estudos.', category: 'Papelaria', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/942872/pexels-photo-942872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 14, name: 'Canetas coloridas', price: 15, description: 'Conjunto de canetas para trabalhos criativos.', category: 'Papelaria', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/5839519/pexels-photo-5839519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        // Relógios
        { id: 15, name: 'Relógio de Pulso Masculino', price: 800, description: 'Relógio elegante e funcional.', category: 'Relógios', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/3829441/pexels-photo-3829441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 16, name: 'Relógio de Pulso Feminino', price: 700, description: 'Relógio delicado e feminino.', category: 'Relógios', seller: 'Leonardo Pinto', image: 'https://images.pexels.com/photos/14808296/pexels-photo-14808296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    ];

function addProductReducer(produtos, produto) {
    let id;
    try {
        id = 1 + produtos.map(p => p.id).reduce((x, y) => Math.max(x, y));
    } catch {id = 1}
    return produtos.concat([{...produto, id: id}]);
}

function updateProductReducer(produtos, produto) {
    let index = produtos.map(p => p.id).indexOf(produto.id);
    produtos.splice(index, 1, produto);
    return produtos;
}

function removeProductReducer(produtos, id) {
    return produtos.filter((p) => p.id !== id);
}

const productSlice = createSlice({
    name: 'products',
    initialState: initialProducts,
    reducers: {
        addProduct: (state, action) => addProductReducer(state, action.payload),
        updateProduct: (state, action) => updateProductReducer(state, action.payload),
        removeProduct: (state, action) => removeProductReducer(state, action.payload)
    },
});

export const { addProduct, updateProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;