// Capítulo 1 - Tema 11
const c1t11Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">Fundamentos de los Datos</h3>
    <p className="leading-relaxed">
      Sin datos, la IA no puede aprender. Los datos son el "combustible" de la inteligencia artificial. A mayor cantidad y calidad de datos, mejor aprende el modelo.
    </p>

    <div className="space-y-6 mt-6">
      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <h4 className="text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
          <Database className="w-5 h-5" /> 1. Tipos de Datos
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-cyan-500/10 rounded-lg p-4">
            <h5 className="font-semibold text-cyan-400 mb-2">Estructurados</h5>
            <p className="text-sm text-gray-300">Organizados en filas y columnas (Excel, BD SQL). Son fáciles de analizar e ideales para predicciones clásicas.</p>
          </div>
          <div className="bg-purple-500/10 rounded-lg p-4">
            <h5 className="font-semibold text-purple-400 mb-2">No Estructurados</h5>
            <p className="text-sm text-gray-300">Carecen de organización fija. Representan el 80% del mundo (Imágenes, audios, emails, videos). Requieren IA Avanzada.</p>
          </div>
          <div className="bg-pink-500/10 rounded-lg p-4">
            <h5 className="font-semibold text-pink-400 mb-2">Semiestructurados</h5>
            <p className="text-sm text-gray-300">Poseen etiquetas y etiquetas pero con campos libres de longitud variable (JSON, XML o estructura de un email).</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl border-l-4 border-l-green-400">
        <h4 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
          <Server className="w-5 h-5" /> 2. Conjuntos de Datos (Datasets)
        </h4>
        <p className="text-gray-300 mb-4 text-sm">
          Un Dataset es la colección total usada para enseñar al algoritmo. Generalmente se divide obligatoriamente en tres partes:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
          <li><strong className="text-white">Dataset de Entrenamiento (~70%):</strong> Los datos que se muestran a la IA para "enseñarle" y descubrir los patrones.</li>
          <li><strong className="text-white">Dataset de Validación (~15%):</strong> Usado durante el aprendizaje como "exámenes de prueba" para ir ajustando qué tan bien va asimilando e ir afinando iterativamente el rendimiento.</li>
          <li><strong className="text-white">Dataset de Prueba (~15%):</strong> Información que el modelo JAMÁS ha visto. Sirve como prueba final inamovible simulando la vida real.</li>
        </ul>
      </div>
    </div>
  </div>
);

const c1t11Quiz: QuizQuestion[] = [
  {
    question: "¿Qué tipo de datos incluye colecciones de imágenes médicas (como radiografías) o videos de seguridad?",
    options: [
      "Datos Estructurados",
      "Datos Semiestructurados",
      "Datos Relacionales",
      "Datos No Estructurados"
    ],
    correct: 3,
    explanation: "Las imágenes, videos y audios son datos no estructurados ya que carecen de un esquema predefinido de campos tabulares y contienen información en crudo."
  },
  {
    question: "En un proyecto de IA, ¿qué rol juega el 'Dataset de Prueba' (Test Dataset)?",
    options: [
      "Se utiliza para ajustar hiperparámetros repetidamente.",
      "Es el volumen mayoritario con el cual la IA aprende y descubre patrones en su primer intento.",
      "Es información inédita reservada para validar si el modelo realmente aprendió o si sufre de sobreajuste (memorizó la data).",
      "Se usa únicamente cuando no se tienen etiquetas correctas."
    ],
    correct: 2,
    explanation: "El Dataset de Prueba simula la vida real, ya que el modelo nunca ha visto esta información durante la etapa de aprendizaje."
  },
  {
    question: "¿Cuál de estas tecnologías almacena habitualmente 'Datos Estructurados' a la perfección?",
    options: [
      "Bases de Datos Relacionales (SQL)",
      "Un directorio de carpetas con archivos de audio MP3",
      "Carpeta comprimida de Fotografías CR2 / JPEG",
      "Páginas de artículos de revistas esparcidas en PDF"
    ],
    correct: 0,
    explanation: "Las Bases de Datos Relacionales como MySQL o Excel organizan los datos de manera estructurada mediante tablas, filas y columnas muy estrictas."
  }
];

// Capítulo 1 - Tema 12
const c1t12Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">Modelos, Algoritmos y Redes Neuronales</h3>
    <p className="leading-relaxed">
      Diferenciar y comprender correctamente las piezas del entrenamiento. Un <strong>Algoritmo</strong> es la "receta matemática", mientras que el <strong>Modelo</strong> es el "cerebro terminado y cocinado". 
    </p>

    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl mt-6">
      <h4 className="text-lg font-bold text-purple-400 mb-3 flex items-center gap-2">
        <Network className="w-5 h-5" /> Enfoques de Aprendizaje
      </h4>
      <div className="space-y-4">
        <div className="bg-purple-500/10 p-4 rounded-lg">
          <p className="font-semibold text-purple-300">Supervisado (👨‍🏫)</p>
          <p className="text-xs text-gray-400">Le otorgas a la IA datos con las RESPUESTAS CORRECTAS (etiquetas). Ejemplo: Le das miles de fotos de tumores diciendo si son "benigno" o "maligno". Todo entra pre-clasificado.</p>
        </div>
        <div className="bg-cyan-500/10 p-4 rounded-lg">
          <p className="font-semibold text-cyan-300">No Supervisado (🔍)</p>
          <p className="text-xs text-gray-400">Le otorgas a la IA miles de registros desordenados SIN etiquetas. La propia IA debe clasificar, separar grupos (clusters) y sacar conclusiones de las relaciones matemáticas, como hipersegmentar a clientes ciegamente.</p>
        </div>
        <div className="bg-green-500/10 p-4 rounded-lg">
          <p className="font-semibold text-green-300">Semi-Supervisado (🤝)</p>
          <p className="text-xs text-gray-400">Un pequeño porcentaje de datos etiquetados se utilizan para guiar un gigantesco cúmulo de información sin identificar, ahorrando enormes sumas monetarias de personal etiquetador.</p>
        </div>
      </div>
    </div>

    <div className="mt-8 border-t border-gray-700 pt-6">
      <h4 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
        <Brain className="w-6 h-6" /> Anatomía de una Red Neuronal Artificial
      </h4>
      <p className="text-sm mt-3 text-gray-300">Su funcionamiento imita abstractamente las sinapsis biológicas ordenándose en Capas:</p>
      
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl text-center shadow-lg shadow-black/50">
          <h5 className="font-semibold text-cyan-400">1. Capa de Entrada</h5>
          <p className="text-xs text-gray-400 mt-2">Recibe los datos iniciales (variables o píxeles crudos). Equivalente funcional a los ojos o los oídos.</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-purple-500/40 p-4 rounded-xl text-center shadow-inner shadow-purple-500/20">
          <h5 className="font-semibold text-purple-400">2. Capas Ocultas</h5>
          <p className="text-xs text-gray-400 mt-2">Deducen fórmulas en cadena. Aquí surgen los pesos y atenciones y se emplean <b>Funciones de Activación</b> (como ReLU o Sigmoide) que apagan/encienden neuronas.</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl text-center shadow-lg shadow-black/50">
          <h5 className="font-semibold text-pink-400">3. Capa de Salida</h5>
          <p className="text-xs text-gray-400 mt-2">El cálculo termina generando un array predictivo, usualmente como nivel probabilístico ("Es en 98% un cáncer").</p>
        </div>
      </div>
    </div>
  </div>
);

const c1t12Quiz: QuizQuestion[] = [
  {
    question: "Dentro del machine learning, si te dan un excel inmenso de registros diarios de venta históricos donde NADA especifica las 'categorías' y la IA debe deducir patrones separando perfiles de clientes, estamos hablando de:",
    options: [
      "Aprendizaje Supervisado",
      "Aprendizaje por Refuerzo Positivo",
      "Aprendizaje Semi-Supervisado",
      "Aprendizaje No Supervisado"
    ],
    correct: 3,
    explanation: "El Aprendizaje No Supervisado es aquel que procesa conjuntos de información bruta en los que NO hay 'respuestas', dejándole deducir segmentos o relaciones."
  },
  {
    question: "¿En qué componente de una Red Neuronal se procesa el núcleo principal de la información, dándole 'peso' a ciertos cruces de variables matemáticamente?",
    options: [
      "La Capa de Salida",
      "Las Capas Ocultas (Hidden Layers)",
      "El Dataset Inicial",
      "La Capa de Entrada (Receptora)"
    ],
    correct: 1,
    explanation: "Las Capas Ocultas toman los datos de entrada, combinan patrones en cadena usando Funciones de Activación y calculan la lógica fundamental oculta a simple vista."
  },
  {
    question: "La 'regresión lineal', la 'regresión logística', los 'árboles de decisión' y las redes neuronales... todas estas piezas son:",
    options: [
      "Diversas familias de Algoritmos",
      "Tipos de Datasets estructurados",
      "Las Capas de Salida",
      "Estructuras de Bases de Datos Cloud"
    ],
    correct: 0,
    explanation: "Estos son distintos tipos matemáticos de Algoritmos. Como una caja de herramientas, se emplean distintamente según los recursos y exigencia (tabulares o imágenes)."
  }
];

// Capítulo 1 - Tema 13
const c1t13Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">Diversos Formatos de Redes Neuronales</h3>
    <p className="leading-relaxed text-gray-300">
      Una red neuronal biológica es compleja, pero en informática existen arquitecturas especializadas altamente documentadas orientadas a procesar diferentes realidades como el texto, el sonido o la visión computacional.
    </p>

    <div className="grid md:grid-cols-1 gap-6 mt-6">
      <div className="bg-gray-800/40 p-6 rounded-2xl border-l-4 border-l-cyan-500 shadow-xl">
        <h4 className="text-xl font-bold text-cyan-400 mb-2 flex items-center gap-2">
          <Database className="w-6 h-6" /> FFNN (Feedforward Neural Networks)
        </h4>
        <p className="text-sm text-gray-400 mt-2">
          <b>Funcionamiento Básico:</b> Las redes más sencillas. El flujo corre exclusivamente en un único sentido hacia adelante. La magia cruza cada capa y llega a la evaluación. Son rápidas, y muy óptimas para <strong>tablas de datos e información numérica / de clientes</strong>.
        </p>
        <p className="text-sm text-cyan-300 mt-2 bg-black/20 p-2 rounded">
          💡 Ideal para: Predicción en excels (créditos, predecir el número de ventas de la siguiente quincena, detección genérica de abandono de usuarios).
        </p>
      </div>

      <div className="bg-gray-800/40 p-6 rounded-2xl border-l-4 border-l-pink-500 shadow-xl">
        <h4 className="text-xl font-bold text-pink-400 mb-2 flex items-center gap-2">
          <Eye className="w-6 h-6" /> CNN (Convolutional Neural Networks)
        </h4>
        <p className="text-sm text-gray-400 mt-2">
          <b>Visión Computacional:</b> Fueron creadas para optimizar el hiper-procesamiento de <strong>Imágenes y Videos</strong>. Ya que cada píxel sería una locura procesarlo aplanado, construyen "filtros" que deambulan escaneando los bordes, reconociendo objetos orgánicos, rostros y varianzas visuales tridimensionales.
        </p>
        <p className="text-sm text-pink-300 mt-2 bg-black/20 p-2 rounded">
          💡 Ideal para: Detección óptica de daños/defectos en una fábrica, diagnósticos de radiografías automatizados o vehículos que "miran".
        </p>
      </div>

      <div className="bg-gray-800/40 p-6 rounded-2xl border-l-4 border-l-yellow-500 shadow-xl">
        <h4 className="text-xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
          <RefreshCw className="w-6 h-6" /> RNN (Recurrent Neural Networks)
        </h4>
        <p className="text-sm text-gray-400 mt-2">
          <b>Eventos en Secuencia (Tiempo / Lenguaje):</b> Están diseñadas con "Memoria interna" y un bucle de alimentación retrospectivo donde el output recae parcialmente en el input. Usan como pivote el factor "TIEMPO / Contexto" siendo brillantes para saber qué pasa en el lapso del entorno.
        </p>
        <p className="text-sm text-yellow-300 mt-2 bg-black/20 p-2 rounded">
          💡 Ideal para: Pronósticos del clima/bolsas de valores a través del transcurso cíclico temporal y tareas NLP (procesamiento de texto como traducción de idiomas).
        </p>
      </div>
    </div>
  </div>
);

const c1t13Quiz: QuizQuestion[] = [
  {
    question: "Si fueras el CTO de un hospital que quiere entrenar un modelo ultrapreciso y rápido en detectar micro-anomalías pulmonares analizando millones de Rayos X, ¿qué capa arquitectónica deberás usar prioritariamente?",
    options: [
      "RNN (Redes Neuronales Recurrentes)",
      "FFNN (Redes Neuronales Prealimentadas Simples)",
      "CNN (Redes Neuronales Convolucionales)",
      "Regresión Logística Pura"
    ],
    correct: 2,
    explanation: "Las Redes Neuronales Convolucionales (CNN) son excepcionalmente poderosas para descifrar datos visuales crudos. Se inventaron precisamente para entender 'imágenes y formas'."
  },
  {
    question: "¿En qué red neuronal el sistema logra retener 'memoria retrospectiva', usando el evento anterior como parámetro de alimentación base para entender el devenir temporal?",
    options: [
      "RNN (Red Recurrente)",
      "FFNN (Feedforward)",
      "CNN (Convolucional)",
      "Ninguna lo logra"
    ],
    correct: 0,
    explanation: "Las RNNs (Recurrent Neural Networks) son como la memoria de corto plazo; aplican para texto, audio o la caída/alza temporal en la bolsa ya que logran rastrear cronologías de causa-efecto secuencial."
  },
  {
    question: "A diferencia de las RNN o las complejas CNN.. las Redes 'FeedForward (FFNN)' donde los datos circulan en un solo sentido directo sin bucles, suelen rendir increíblemente mejor procesando:",
    options: [
      "Grabaciones en audio MP3 de baja calidad",
      "Documentos enormes en formato JSON o planillas (Predicciones con tablas numéricas)",
      "Textos de literatura universal o diccionarios",
      "Miles de radiografías en formato RAW"
    ],
    correct: 1,
    explanation: "Las FFNN son las maestras tradicionales operando a través de bases de datos estructuradas tabulares, calculando un score de fraude bancario simple, abandono o estimación monetaria de compra."
  }
];
