// Capítulo 1 - Tema 14
const c1t14Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">Cómo Construir Sistemas de IA Predictiva</h3>
    <p className="leading-relaxed">
      Implementar IA es una metodología estructurada, no arte de magia. El ciclo de desarrollo fluye orgánicamente pasando desde la definición del negocio puro, hasta la puesta en marcha hiper-parametrizada.
    </p>

    <div className="mt-8 relative border-l-2 border-gray-700 ml-4 pb-4">
      
      <div className="mb-6 ml-6 relative">
        <span className="absolute -left-[35px] bg-cyan-500 rounded-full w-4 h-4 mt-1"></span>
        <h4 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
          Paso 1: Definir el Problema 🎯
        </h4>
        <p className="text-sm text-gray-400 mt-1">Identificar la métrica y restricción a optimizar. (Ej, "Predecir qué clientes abandonarán a fin de mes"). Debe ser claro y medible.</p>
      </div>

      <div className="mb-6 ml-6 relative">
        <span className="absolute -left-[35px] bg-purple-500 rounded-full w-4 h-4 mt-1"></span>
        <h4 className="text-lg font-bold text-purple-400 flex items-center gap-2">
           Paso 2: Elegir Enfoque y Diseño Funcional ⚙️
        </h4>
        <p className="text-sm text-gray-400 mt-1">Determinar si se requerirá <b className="text-gray-300">Aprendizaje Supervisado/No Supervisado</b> y según qué tipo de dato asentar el diseño (Visión, Robótica, Series de tiempo).</p>
      </div>

      <div className="mb-6 ml-6 relative">
        <span className="absolute -left-[35px] bg-pink-500 rounded-full w-4 h-4 mt-1"></span>
        <h4 className="text-lg font-bold text-pink-400 flex items-center gap-2">
           Paso 3 y 4: Arquitectura Neural e Hiperparámetros 🧠
        </h4>
        <p className="text-sm text-gray-400 mt-1">
          Elegir la Red adecuada (CNN para foto, RNN para texto, FFNN para Excel).<br/>
          Estipular la Tasa de Aprendizaje, cantidad de neuronas, capas a utilizar, Epocas de Entrenamiento y los lotes. 
        </p>
      </div>

      <div className="ml-6 relative">
        <span className="absolute -left-[35px] bg-green-500 rounded-full w-4 h-4 mt-1"></span>
        <h4 className="text-lg font-bold text-green-400 flex items-center gap-2">
           Paso 5: Validación Cruzada y Despliegue ✅
        </h4>
        <p className="text-sm text-gray-400 mt-1">Abolir el "Overfitting" o sobreajuste cruzando muestras variadas del dataset de entrenamiento. Comprobarlo empíricamente y habilitar su pase a productivo (realidad) para ser monitoreado perpetuamente.</p>
      </div>

    </div>
  </div>
);

const c1t14Quiz: QuizQuestion[] = [
  {
    question: "Si entras en la fase en la cual ajustas mecánicamente métricas como 'El Nro de Épocas', 'El Batch Size (Tamaño del Lote)', 'y la Tasa de Aprendizaje'.. ¿En qué etapa funcional te hallas?",
    options: [
      "Definiendo el alcance del problema en Negocios",
      "Buscando las reglas para la Base de Datos Iniciales",
      "Fijando y ajustando los Hiperparámetros antes del Entrenamiento",
      "La validación continua en productivo"
    ],
    correct: 2,
    explanation: "Las tasas de aprendizaje, lotes y épocas son Hiperparámetros, botones manuales en la mesa de mezclado que tú ajustas para dictarle a la red CÓMO asimilará los datos a lo largo del entrenamiento."
  },
  {
    question: "¿Por qué el Paso 5 insiste compulsivamente en realizar 'Validación Cruzada (K-Fold)' con los datasets recabados?",
    options: [
      "Porque optimiza visualmente la Interfaz de la app",
      "Para evitar el 'Overfitting' (Memorización) verificando si el modelo se generaliza inteligentemente contra datos mezclables",
      "Para abaratar el coste en la nube",
      "Para generar nuevos PDFs sintéticos"
    ],
    correct: 1,
    explanation: "El overffiting provoca que tu IA 'memorice' el bloque de preguntas inicial volviéndose un inútil respondiendo casos reales variables. La Validación Cruzada destruye ese falso mito iterando el desglose."
  },
  {
    question: "Teniendo en cuenta los primeros pasos iniciales, ¿cuál de los siguientes es un Problema de Negocio BIEN definido para un proyecto de Machine Learning?",
    options: [
      "'Quiero usar Inteligencia Artificial de vanguardia en la empresa'",
      "'Pondré un bot que responda bien rápido a absolutamente todo el mundo'",
      "'Deseo detectar fraude corporativo interno'",
      "'Predecir la tasa de abandono de los clientes a fin del segundo trimestre logrando una precisión mayor al 85% para actuar preventivamente con alertas en tiempo real (<2s)'"
    ],
    correct: 3,
    explanation: "Las metas de Inteligencia de Negocios para proyectos de IA deben estar milimétricamente descritas, con KPI y limitantes técnicos medibles a cumplir obligatoriamente como el tiempo o la cuota de error."
  }
];

// Capítulo 1 - Tema 15
const c1t15Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">Buenas Prácticas</h3>
    <p className="leading-relaxed">
      Sistematizar principios lógicos para mitigar riesgos e impulsar la eficiencia técnica del proyecto es la clave tras bambalinas.
    </p>

    <div className="grid md:grid-cols-2 gap-4 mt-6">
      
      <div className="bg-gray-800/80 p-5 rounded-xl border border-gray-700">
        <h4 className="font-semibold text-green-400 flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5"/> Educar y Tomar Decisiones Claras
        </h4>
        <p className="text-sm text-gray-300">Educar transversalmente a ejecutivos y usuarios mitiga el pánico, rechazo o expectativas irrealizables e imposibles en las que dictan que "la IA resolverá magia sin esfuerzo tecnológico".</p>
      </div>

      <div className="bg-gray-800/80 p-5 rounded-xl border border-gray-700">
        <h4 className="font-semibold text-cyan-400 flex items-center gap-2 mb-2">
          <Settings className="w-5 h-5"/> Optar por lo Sencillo (Navaja de Occam)
        </h4>
        <p className="text-sm text-gray-300">Si un Algoritmo complejo gigante da un 93% de precisión, y una red pequeñísima/algoritmo clásico saca un 92% pero en fracciones de coste, asume la ligereza. Más rápido es más mantenible y menos susceptible al error o saturación de red.</p>
      </div>

      <div className="bg-gray-800/80 p-5 rounded-xl border border-gray-700">
        <h4 className="font-semibold text-yellow-400 flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5"/> Prevención de Caos Funcional
        </h4>
        <p className="text-sm text-gray-300">Estructurar casos de uso (Business case) evaluando el ROI. La IA jamás se debe implementar 'por capricho modernizador' ciego que aboque irremediablemente al fracaso por la disociación rentabilidad/ejecución.</p>
      </div>

      <div className="bg-gray-800/80 p-5 rounded-xl border border-gray-700">
        <h4 className="font-semibold text-purple-400 flex items-center gap-2 mb-2">
          <RefreshCw className="w-5 h-5"/> Evaluación en el Tiempo
        </h4>
        <p className="text-sm text-gray-300">Un modelo exitoso no lo es de por vida (por ejemplo, el brutal cambio que impuso la pandemia a las estadísticas minoristas que sepultaron viejos sistemas de recomendación). Reajusta, monitorea (Dashboards) y actualiza sistemáticamente el bucle entrenado usando MLOps.</p>
      </div>
    </div>
  </div>
);

const c1t15Quiz: QuizQuestion[] = [
  {
    question: "¿Qué es preferible tecnológicamente bajo el principio de las 'Buenas Prácticas (La Navaja de Occam)' si las presiones de performance son muy estacionales?",
    options: [
      "Involucrarse ciegamente en AGI puramente para abaratar costos sin límites",
      "Utilizar un modelo sencillo y rápido si la diferencia de precisión contra una red compleja monstruosa es ínfima, aligerando despliegue y mantenimiento",
      "Siempre usar las redes con más millones de parámetros independientemente del caso o coste para ser de alta gama",
      "Usar exclusivamente PLN en todos los casos"
    ],
    correct: 1,
    explanation: "Por Mantenibilidad e impacto Cloud: las soluciones más simples que resuelvan robustamente el dilema ganan. Si los árboles de decisiones arrojan un rendimiento similar a redes profundas con la mitad del poder.. prefiere simpleza."
  },
  {
    question: "La constante alteración social de compras/usos diarios hacen que un modelo brillante de Inteligencia Artificial resulte mediocre 6 meses después... ¿Cuál es la buena práctica preventiva?",
    options: [
      "Aumentar en una capa perimetral el Hardware GPU del centro logístico",
      "Tirar la Base de Datos Históricas e Iniciar el proyecto de cero al año",
      "Implementar Dashboards de tiempo real para medir desvarios y forzar Re-Entrenamiento regular insertando lotes de los datos contextualizados actualizados",
      "Esperar a la IA General (AGI)"
    ],
    correct: 2,
    explanation: "Los modelos sufren 'Desajuste de concepto/Data Drift' en entornos naturales si el mercado de las personas interfiere con hábitos inéditos. Se reentrena de forma planificada sistemáticamente integrándolo en el modelo orgánico."
  },
  {
    question: "Una regla de oro antes del despliegue masivo orientada directamente al 'Equipo de Negocio vs Ejecutores de Máquina' es:",
    options: [
      "Educar transversalmente para fijar un ROI realista, despejar miedos infundados de reemplazo laboral y estructurar metas de viabilidad técnica lógicas",
      "Lanzar masivamente la aplicación web en modo Beta y leer quejas",
      "Imponer castigos y normativas laborales",
      "Utilizar lenguaje cifrado ocultando el objetivo"
    ],
    correct: 0,
    explanation: "Si gerentes y empleados están desconectados y mal informados, esperan 'Inteligencia General Mágica' al instante, frustrándose, arruinando su uso en entornos productivos, y derivando al despilfarro."
  }
];
