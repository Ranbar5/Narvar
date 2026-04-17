// Capítulo 1 - Tema 9
const c1t9Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">Clasificación por Nivel de Inteligencia</h3>
    <p className="leading-relaxed">
      Los sistemas de IA se clasifican en seis tipos, desde los más simples hasta los más complejos.
    </p>

    <div className="space-y-6 mt-6">
      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-cyan-400" />
          </div>
          <h4 className="text-lg font-bold text-cyan-400">1. IA ESTRECHA (Narrow AI)</h4>
        </div>
        <p className="text-gray-300 mb-4">
          <strong>¿Qué es?</strong> IA especializada en UNA tarea específica. Es la IA que existe HOY.
        </p>
        <div className="bg-cyan-500/10 rounded-lg p-4">
          <p className="font-semibold mb-2">Ejemplos:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
            <li>Siri/Alexa: Excelente en entender comandos de voz, pero no puede conducir un auto.</li>
            <li>IA de Ajedrez: Mejor que cualquier humano, pero no sabe jugar damas.</li>
            <li>Filtros de Spam: Perfectos detectando emails basura.</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Star className="w-5 h-5 text-purple-400" />
          </div>
          <h4 className="text-lg font-bold text-purple-400">2. IA GENERAL (AGI)</h4>
        </div>
        <p className="text-gray-300 mb-4">
          <strong>¿Qué es?</strong> IA que puede aprender y hacer CUALQUIER tarea intelectual como un humano. Aún NO EXISTE.
        </p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-pink-400" />
          </div>
          <h4 className="text-lg font-bold text-pink-400">3. MÁQUINA REACTIVA</h4>
        </div>
        <p className="text-gray-300 mb-4">
          <strong>¿Qué es?</strong> IA que reacciona al momento, sin memoria. No recuerda el pasado.
        </p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <Database className="w-5 h-5 text-green-400" />
          </div>
          <h4 className="text-lg font-bold text-green-400">4. MEMORIA LIMITADA</h4>
        </div>
        <p className="text-gray-300 mb-4">
          <strong>¿Qué es?</strong> IA que puede usar datos del pasado reciente para decidir. La mayoría de la IA actual es de este tipo.
        </p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-yellow-400" />
          </div>
          <h4 className="text-lg font-bold text-yellow-400">5. TEORÍA DE LA MENTE</h4>
        </div>
        <p className="text-gray-300 mb-4">
          <strong>¿Qué es?</strong> IA que puede entender emociones, intenciones y pensamientos. Está en desarrollo.
        </p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
            <Network className="w-5 h-5 text-red-400" />
          </div>
          <h4 className="text-lg font-bold text-red-400">6. AUTOCONCIENCIA</h4>
        </div>
        <p className="text-gray-300 mb-4">
          <strong>¿Qué es?</strong> IA que tiene conciencia de sí misma. Puramente teórico / Ciencia ficción.
        </p>
      </div>
    </div>
  </div>
);

const c1t9Quiz: QuizQuestion[] = [
  {
    question: "¿Qué tipo de inteligencia artificial es la más común en la actualidad, como Siri, Alexa o los filtros de spam?",
    options: [
      "IA General (AGI)",
      "IA Estrecha (Narrow AI)",
      "Teoría de la Mente",
      "Autoconciencia"
    ],
    correct: 1,
    explanation: "La IA Estrecha (Narrow AI) es la que se especializa en una tarea puntual y es la que usamos en la actualidad masivamente."
  },
  {
    question: "¿Cuál es la principal característica de la IA de Memoria Limitada?",
    options: [
      "Reacciona al instante sin guardar contexto",
      "Es consciente de su propia existencia",
      "Entiende emociones humanas",
      "Usa datos del pasado reciente para tomar decisiones"
    ],
    correct: 3,
    explanation: "La memoria limitada permite a la IA almacenar un historial reciente y tomar decisiones con ese contexto, como ocurre con los autos autónomos o chatbots actuales."
  },
  {
    question: "¿Qué IA se define como teórica y comprende cualquier tarea intelectual a nivel humano?",
    options: [
      "Máquina Reactiva",
      "IA General (AGI)",
      "IA Estrecha",
      "Teoría de la Mente"
    ],
    correct: 1,
    explanation: "La Inteligencia Artificial General (AGI) tendría la misma capacidad de aprender y razonar que un cerebro humano para cualquier tema, pero actualmente no existe."
  }
];

// Capítulo 1 - Tema 10
const c1t10Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">¿Cómo Se Aplica la IA en la Práctica?</h3>
    <p className="leading-relaxed">
      Existen diferentes <strong>diseños funcionales</strong> para implementar la IA predictiva resolviendo problemas de negocio específicos.
    </p>

    <div className="space-y-6 mt-6">
      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl border-l-4 border-l-cyan-400">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="w-8 h-8 text-cyan-400" />
          <h4 className="text-xl font-bold text-cyan-400">1. Visión Artificial</h4>
        </div>
        <p className="text-gray-300 mb-4">
          Aporta a las computadoras la forma de "ver" e interpretar imágenes y videos, como reconocimiento de defectos, caras o texto (OCR).
        </p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl border-l-4 border-l-purple-400">
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-8 h-8 text-purple-400" />
          <h4 className="text-xl font-bold text-purple-400">2. Reconocimiento de Patrones</h4>
        </div>
        <p className="text-gray-300 mb-4">
          Encuentra similitudes y conexiones ocultas en inmensas bases de datos. Resulta clave en marketing (segmentando clientes) y ciberseguridad (detectando fraude y anomalías).
        </p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl border-l-4 border-l-pink-400">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="w-8 h-8 text-pink-400" />
          <h4 className="text-xl font-bold text-pink-400">3. Robótica Avanzada</h4>
        </div>
        <p className="text-gray-300 mb-4">
          Robots que aprenden y planifican autónomamente, optimizando almacenes, asistiendo cirugías y atendiendo huéspedes.
        </p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl border-l-4 border-l-green-400">
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle className="w-8 h-8 text-green-400" />
          <h4 className="text-xl font-bold text-green-400">4. Procesamiento del Lenguaje Natural (PLN)</h4>
        </div>
        <p className="text-gray-300 mb-4">
          Comprensión de significado, sintaxis y sentimiento del lenguaje para chatbots resolutivos, traducción natural y análisis de emociones en redes sociales.
        </p>
      </div>
    </div>
  </div>
);

const c1t10Quiz: QuizQuestion[] = [
  {
    question: "¿Qué diseño funcional procesa el lenguaje humano y comprende la intención detrás de un mensaje (ej. si el cliente está enojado)?",
    options: [
      "Visión Artificial",
      "Reconocimiento de Patrones",
      "Procesamiento del Lenguaje Natural (PLN)",
      "Robótica"
    ],
    correct: 2,
    explanation: "El Procesamiento de Lenguaje Natural (PLN) es el motor detrás de chatbots avanzados y análisis de sentimientos, ya que interpreta contexto humano."
  },
  {
    question: "¿Qué técnica de IA usarías en una fábrica para retirar automáticamente botellas rotas pasando por una cinta transportadora?",
    options: [
      "PLN y Análisis Semántico",
      "Visión Artificial (Computer Vision)",
      "Procesamiento Reactivo",
      "Predicción de Abandono"
    ],
    correct: 1,
    explanation: "La Visión artificial permite a las computadoras inspeccionar imágenes frame por frame y automatizar controles de calidad en fracciones de segundo."
  },
  {
    question: "¿Para qué caso empresarial se utiliza frecuentemente el Reconocimiento de Patrones?",
    options: [
      "Interpretar fotografías y videos médicos",
      "Detectar transacciones fraudulentas comparando ubicaciones y compras inusuales",
      "Mover robots y carga dentro de un almacén",
      "Traducir idiomas en tiempo real"
    ],
    correct: 1,
    explanation: "La detección de fraudes es uno de los mayores éxitos del Reconocimiento de Patrones, aislando actividades atípicas dentro de millones de transacciones."
  }
];
