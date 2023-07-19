// datos de productos
const productsdata = [
  {
    id: "1",
    name: "Agustina",
    price: 5.0,
    image: "assets/img/Aros/ArosColgantes26.png",
    meaning:
      "Noble y llena de alegría, este aro representa la elegancia y la felicidad en cada ocasión.",
  },
  {
    id: "2",
    name: "Antonella",
    price: 2.5,
    image: "assets/img/Aros/ArosColgantes25.png",
    meaning:
      "Inspirado en el amor y la belleza, este aro simboliza el poder del amor y la seducción.",
  },
  {
    id: "3",
    name: "Ana",
    price: 10.4,
    image: "assets/img/Aros/ArosColgantes27.png",
    meaning:
      "La protección y la armonía.Brinda una sensación de calma y equilibrio.",
  },
  {
    id: "4",
    name: "Alicia",
    price: 7.999,
    image: "assets/img/Aros/ArosColgantes1.png",
    meaning:
      "Inspirado en el personaje de 'Alicia en el País de las Maravillas', este aro representa la curiosidad y la aventura en tu vida.",
  },
  {
    id: "5",
    name: "Maria",
    price: 2.899,
    image: "assets/img/Aros/ArosColgantes22.png",
    meaning:
      "A través de tu nombre, llevas contigo la sabiduría y el legado de generaciones pasadas. Eres una fuerza motriz en la vida de aquellos que te rodean, brindando apoyo y cuidado a quienes lo necesitan",
  },
  {
    id: "6",
    name: "Amalia",
    price: 3.56,
    image: "assets/img/Aros/ArosColgantes20.png",
    meaning:
      "Un aro que refleja la belleza y la sofisticación. Amalia simboliza la elegancia y el buen gusto.",
  },

  {
    id: "7",
    name: "Micaela",
    price: 2.9,
    image: "assets/img/Aros/ArosColgantes21.png",
    meaning:
      "Un nombre de origen griego que evoca elegancia y gracia. Este aro representa la belleza y el encanto atemporal.",
  },
  {
    id: "8",
    name: "Milagros",
    price: 6.0,
    image: "assets/img/Aros/ArosCorazon.png",
    meaning:
      "Evoca la magia y la capacidad de hacer posible lo imposible. Eres una mujer llena de fuerza interior y resiliencia, capaz de superar cualquier obstáculo que se presente en tu camino",
  },
  {
    id: "9",
    name: "Celeste",
    price: 4.99,
    image: "assets/img/Aros/ArosLoto.png",
    meaning:
      "Tu presencia es cautivadora y tu espíritu es inspirador. ¡Siembra semillas de alegría y colorea el mundo con su esencia única!",
  },
  {
    id: "10",
    name: "Carolina",
    price: 3.25,
    image: "assets/img/Aros/ArosHojas.png",
    meaning:
      " Espíritu libre y su corazón valiente. Es la encarnación de la determinación y la perseverancia",
  },
  {
    id: "11",
    name: "Lucía",
    price: 5.75,
    image: "assets/img/Aros/ArosColgantes15.png",
    meaning:
      "Un nombre que significa 'la que hace feliz'. Este aro representa la alegría y la felicidad que puedes encontrar en los detalles más pequeños.",
  },
  {
    id: "12",
    name: "Catalina",
    price: 2.999,
    image: "assets/img/Aros/ArosColgantes14.png",
    meaning:
      "Un nombre que evoca pureza y luminosidad. Este aro representa la claridad y la serenidad en cada elección que haces.",
  },
  {
    id: "13",
    name: "Brenda",
    price: 4.5,
    image: "assets/img/Aros/ArosPerlas.png",
    meaning:
      "Simboliza la pureza y la inocencia. Este aro representa la belleza en su forma más simple y auténtica.",
  },
  {
    id: "14",
    name: "Camila",
    price: 3.9,
    image: "assets/img/Aros/ArosColgantes23.png",
    meaning:
      "Un nombre de origen latino que significa 'la que está presente'. Este aro representa la importancia de estar presente en cada momento de tu vida.",
  },
  {
    id: "15",
    name: "Daniela",
    price: 6.99,
    image: "assets/img/Aros/ArosColgantes9.png",
    meaning:
      "Inspirado en el nombre hebreo que significa 'justicia de Dios'. Este aro simboliza la fuerza y la integridad en cada decisión que tomas.",
  },
  {
    id: "16",
    name: "Emma",
    price: 5.254,
    image: "assets/img/Aros/ArosColgante5.png",
    meaning:
      "Portadora de cualidades valiosas como la pureza, la fuerza, la elegancia y la sabiduría. Animate a abrazar y a reconocer tu poder. Tu determinación puede superar cualquier desafío.",
  },

  {
    id: "17",
    name: "Florencia",
    price: 6.5,
    image: "assets/img/Aros/ArosColgantes6.png",
    meaning:
      "Reflejo de tu gracia, valentía y pasión. Tu luz interior brilla intensamente, iluminando el mundo que te rodea. Audaz y dejas tu huella única en cada paso del camino!",
  },
  {
    id: "18",
    name: "Jazmín",
    price: 4.25,
    image: "assets/img/Aros/ArosColgantes10.png",
    meaning:
      "Inspirado en la delicada flor de jazmín, este aro simboliza la gracia y la belleza que se despliega con cada movimiento.",
  },
  {
    id: "19",
    name: "Isabella",
    price: 3.99,
    image: "assets/img/Aros/ArosColgantes11.png",
    meaning:
      "Este aro representa la autenticidad y la transparencia en todas tus acciones y decisiones.",
  },
  {
    id: "20",
    name: "Julieta",
    price: 7.99,
    image: "assets/img/Aros/ArosColgantes8.png",
    meaning:
      "Tu energía irradia alegría y tu determinación te impulsa a perseguir tus sueños con valentía. No temas tomar riesgos y explorar nuevas oportunidades, porque en cada paso encontrarás crecimiento y felicidad.",
  },
  {
    id: "21",
    name: "Lorena",
    price: 5.15,
    image: "assets/img/Aros/ArosClasicos.png",
    meaning:
      "Eres una mujer resiliente y valiente, capaz de superar cualquier desafío que se presente en tu camino. Tu determinación y espíritu luchador te llevan a alcanzar tus metas y a inspirar a los demás a nunca rendirse",
  },
  {
    id: "22",
    name: "Natalia",
    price: 3.5,
    image: "assets/img/Aros/ArosColgantes12.png",
    meaning:
      "Un nombre que evoca el nacimiento y la nueva vida. Este aro representa la esperanza y las oportunidades que cada nuevo día trae consigo.",
  },
  {
    id: "23",
    name: "Olivia",
    price: 8.25,
    image: "assets/img/Aros/ArosColgantes13.png",
    meaning:
      "Inspirado en el nombre latino que significa 'paz'. Este aro simboliza la tranquilidad y la armonía que puedes encontrar en momentos de calma.",
  },
  {
    id: "24",
    name: "Rocío",
    price: 5.75,
    image: "assets/img/Aros/ArosColgantes18.png",
    meaning:
      "Un nombre que evoca la paciencia y la lealtad. Este aro representa la perseverancia y la confianza en tus propias habilidades.",
  },
  {
    id: "25",
    name: "Melina",
    price: 4.9,
    image: "assets/img/Aros/ArosColgantes16.png",
    meaning:
      "Este aro simboliza la belleza y la singularidad en tu propia identidad. Sigue brillando con tu encanto único y deja que tu luz te guíe hacia el éxito y la felicidad",
  },
  {
    id: "26",
    name: "Romina",
    price: 6.8,
    image: "assets/img/Aros/ArosColgantes17.png",
    meaning:
      "Inspirado en el personaje bíblico, este aro representa la fuerza y la determinación para superar cualquier desafío que se presente en tu camino.",
  },
  {
    id: "27",
    name: "Yanina",
    price: 4.35,
    image: "assets/img/Aros/ArosColgantes19.png",
    meaning:
      "Un nombre que evoca la escucha y la comprensión. Este aro representa la empatía y la conexión profunda que puedes establecer con los demás.",
  },

  {
    id: "28",
    name: "Valentina",
    price: 3.99,
    image: "assets/img/Aros/ArosColgantes8.png",
    meaning:
      "Un nombre que significa 'valiente' o 'fuerte'. Este aro representa la determinación y el coraje que te impulsan a enfrentar cualquier desafío.",
  },
  {
    id: "29",
    name: "Sofia",
    price: 7.99,
    image: "assets/img/Aros/ArosColgante4.png",
    meaning:
      "Sofía, tu nombre evoca elegancia y sabiduría. Eres una mujer con una mente brillante y una perspectiva única sobre el mundo",
  },
  {
    id: "30",
    name: "Martina",
    price: 5.65,
    image: "assets/img/Aros/ArosColgantes3.png",
    meaning:
      "Tu espíritu independiente y tu habilidad para tomar decisiones te convierten en una líder natural. Posees una creatividad innata y un gran sentido de la originalidad",
  },

  {
    id: "31",
    name: "Victoria",
    price: 4.25,
    image: "assets/img/Aros/ArosGotasNaraja.png",
    meaning:
      "Este aro simboliza la gracia y la belleza que florecen en tu vida, aportando alegría y encanto a tu entorno.",
  },
  {
    id: "32",
    name: "Zoe",
    price: 8.759,
    image: "assets/img/Aros/ArosCogantes24.png",
    meaning:
      "Un nombre que significa 'vida' en griego. Este aro representa la vitalidad y la energía positiva que irradias en todo lo que haces.",
  },
];

// Función para asignar la categoría según el número de id
function assignCategoryById(id) {
  if (id <= 10) {
    return "bohemias";
  } else if (id <= 23) {
    return "elegantes";
  } else {
    id;
    return "audaces";
  }
}

// Agregar la propiedad de categoría a cada objeto de producto
productsdata.forEach((product) => {
  const categoryId = parseInt(product.id);
  product.category = assignCategoryById(categoryId);
  // console.log(
  //   `Categoría asignada para el producto ${product.id}: ${product.category}`
  // );
});

const divideArrayIntoGroups = (
  productsList,
  groupSize,
  firstGroupIndex,
  lastGroupIndex
) => {
  const groups = [];
  for (let i = firstGroupIndex; i <= lastGroupIndex; i++) {
    const start = i * groupSize;
    const end = start + groupSize;
    const group = productsList.slice(start, end);
    groups.push(group);
  }

  return groups;
};
let appState = {
  products: [],
  dividedGroups: [],
  groupSize: 8,
  firstGroupIndex: 0,
  lastGroupIndex: 3,
  slidePosition: 0,
};

appState.products = productsdata;
console.log();

appState.dividedGroups = divideArrayIntoGroups(
  appState.products,
  appState.groupSize,
  appState.firstGroupIndex,
  appState.lastGroupIndex
);
console.log(appState.dividedGroups);
