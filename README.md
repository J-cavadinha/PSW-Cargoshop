**Dados iniciais de teste**

products = [
  {
    "image": "https://images.pexels.com/photos/2587370/pexels-photo-2587370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "seller": "Leonardo Pinto",
    "category": "Beleza",
    "price": 25,
    "description": "Batom vermelho bom.",
    "name": "Batom",
  },
  {
    "name": "Rímel",
    "price": 15,
    "description": "Bom rímel",
    "category": "Beleza",
    "seller": "Leonardo Pinto",
    "image": "https://images.pexels.com/photos/2637820/pexels-photo-2637820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    "image": "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "seller": "Leonardo Pinto",
    "category": "Bicicletas",
    "price": 2500,
    "description": "Bicicleta ideal para trilhas e terrenos acidentados.",
    "name": "Mountain Bike Aro",
  },
  {
    "name": "Bicicleta Speed",
    "price": 3000,
    "description": "Bicicleta leve e aerodinâmica para longas distâncias.",
    "category": "Bicicletas",
    "seller": "Leonardo Pinto",
    "image": "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    "name": "Smartphone",
    "price": 5000,
    "description": "Celular com câmera de alta resolução e processador potente.",
    "category": "Compras",
    "seller": "Leonardo Pinto",
    "image": "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    "name": "Smartwatch",
    "price": 1500,
    "description": "Relógio inteligente para monitorar atividades físicas.",
    "category": "Compras",
    "seller": "Leonardo Pinto",
    "image": "https://images.pexels.com/photos/2861929/pexels-photo-2861929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    "name": "Notebook",
    "price": 8000,
    "description": "Notebook com placa de vídeo potente para jogos.",
    "category": "Eletrônicos",
    "seller": "Leonardo Pinto",
    "image": "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    "name": "Fones de Ouvido Sem Fio",
    "price": 500,
    "description": "Fones de ouvido com alta qualidade de som e conexão Bluetooth.",
    "category": "Eletrônicos",
    "seller": "Leonardo Pinto",
    "image": "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    "name": "Parafusadeira",
    "price": 300,
    "description": "Ferramenta versátil para diversos tipos de trabalho.",
    "category": "Ferramentas",
    "seller": "Leonardo Pinto",
    "image": "https://images.pexels.com/photos/5974048/pexels-photo-5974048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    "name": "Serra Circular",
    "price": 800,
    "description": "Ferramenta para cortar madeira.",
    "category": "Ferramentas",
    "seller": "Leonardo Pinto",
    "image": "https://images.pexels.com/photos/5466152/pexels-photo-5466152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    "name": "Anel de Diamante",
    "price": 10000,
    "description": "Jóia elegante e sofisticada.",
    "category": "Joalheria",
    "seller": "Leonardo Pinto",
    "image": "https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    "name": "Colar de Ouro",
    "price": 5000,
    "description": "Colar clássico e atemporal.",
    "category": "Joalheria",
    "seller": "Leonardo Pinto",
    "image": "https://images.pexels.com/photos/6858599/pexels-photo-6858599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    "name": "Óculos de Sol",
    "price": 300,
    "description": "Óculos com proteção UV para os olhos.",
    "category": "Óculos",
    "seller": "Leonardo Pinto",
    "image": "https://images.pexels.com/photos/255305/pexels-photo-255305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    "name": "Óculos de Grau",
    "price": 500,
    "description": "Óculos personalizados para correção visual.",
    "category": "Óculos",
    "seller": "Leonardo Pinto",
    "image": "https://images.pexels.com/photos/131018/pexels-photo-131018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    "image": "https://images.pexels.com/photos/942872/pexels-photo-942872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "seller": "Leonardo Pinto",
    "category": "Papelaria",
    "price": 20,
    "description": "Caderno para anotações e estudos.",
    "name": "Caderno",
  },
  {
    "name": "Canetas coloridas",
    "price": 15,
    "description": "Conjunto de canetas para trabalhos criativos.",
    "category": "Papelaria",
    "seller": "Leonardo Pinto",
    "image": "https://images.pexels.com/photos/5839519/pexels-photo-5839519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    "name": "Relógio de Pulso Masculino",
    "price": 800,
    "description": "Relógio elegante e funcional.",
    "category": "Relógios",
    "seller": "Leonardo Pinto",
    "image": "https://images.pexels.com/photos/3829441/pexels-photo-3829441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    "name": "Relógio de Pulso Feminino",
    "price": 700,
    "description": "Relógio delicado e feminino.",
    "category": "Relógios",
    "seller": "Leonardo Pinto",
    "image": "https://images.pexels.com/photos/14808296/pexels-photo-14808296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
]