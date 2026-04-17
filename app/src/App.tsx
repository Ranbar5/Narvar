import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, BookOpen, ChevronRight, ChevronLeft, CheckCircle, 
  Cpu, Network, Database, Target, Shield, Zap, BarChart3,
  AlertTriangle, Lightbulb, Code, Settings, RefreshCw,
  Award, TrendingUp, Users, Server, Sparkles, X, Home,
  Search, Filter, Eye, MessageCircle, Lock
} from 'lucide-react';

// Tipos
interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Topic {
  id: string;
  title: string;
  content: React.ReactNode;
  quiz: QuizQuestion[];
}

interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
  topics: Topic[];
  finalExam: QuizQuestion[];
}

// Componente de Quiz
function QuizComponent({ questions, onComplete }: { questions: QuizQuestion[]; onComplete: (score: number) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === questions[currentQuestion].correct;
    setAnswers([...answers, isCorrect]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      const correctCount = answers.filter(a => a).length + (selectedOption === questions[currentQuestion].correct ? 1 : 0);
      setFinalScore(correctCount);
      setIsFinished(true);
      onComplete(correctCount);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setAnswers([]);
    setIsFinished(false);
    setFinalScore(0);
  };

  if (isFinished) {
    return (
      <div className="glass-card p-6 mt-8 text-center animate-fade-in">
        <h4 className="text-2xl font-bold mb-4 text-cyan-400">Resultado de la Evaluación</h4>
        <div 
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
        >
          <span className="text-3xl font-bold text-white">{finalScore}/{questions.length}</span>
        </div>
        <p className="text-gray-400 mb-6 px-4">
          Necesitas al menos el 70% para aprobar este tema. Sigue practicando y vuelve a intentarlo.
        </p>
        <button 
          onClick={resetQuiz} 
          className="py-3 px-8 rounded-lg border border-gray-600 hover:border-cyan-500 hover:text-cyan-400 transition-all font-semibold flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="w-5 h-5" />
          Reintentar Evaluación
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="glass-card p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-bold text-cyan-400">Evaluación del Tema</h4>
        <span className="text-sm text-gray-400">Pregunta {currentQuestion + 1} de {questions.length}</span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
        <div 
          className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all"
          style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
        />
      </div>

      <p className="text-lg mb-6">{question.question}</p>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelect(index)}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedOption === index 
                ? 'border-cyan-400 bg-cyan-500/20' 
                : 'border-gray-700 hover:border-cyan-400/50'
            } ${
              showExplanation
                ? index === question.correct
                  ? 'border-green-500 bg-green-500/20'
                  : selectedOption === index
                  ? 'border-red-500 bg-red-500/20'
                  : ''
                : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option}</span>
            </div>
          </div>
        ))}
      </div>

      {!showExplanation ? (
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null}
          className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
        >
          Verificar Respuesta
        </button>
      ) : (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${selectedOption === question.correct ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            <p className={`font-semibold ${selectedOption === question.correct ? 'text-green-400' : 'text-red-400'}`}>
              {selectedOption === question.correct ? '✅ Correcto!' : '❌ Incorrecto'}
            </p>
            <p className="text-sm mt-2 text-gray-300">{question.explanation}</p>
          </div>
          <button 
            onClick={handleNext} 
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            {currentQuestion < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Evaluación'}
          </button>
        </div>
      )}
    </div>
  );
}

// Datos del Capítulo 1 - Tema 1
const c1t1Content = (
  <div className="space-y-6">
    <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
      <img src="/hero-ai-brain.jpg" alt="AI Brain" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-2xl font-bold text-white drop-shadow-lg">¿Qué es la Inteligencia Artificial?</h3>
      </div>
    </div>

    <p className="text-lg leading-relaxed">
      Imagina que tu cerebro funciona como una biblioteca gigante. Cada vez que necesitas tomar una decisión o resolver un problema, 
      tu mente busca en ese vasto archivo de recuerdos y experiencias pasadas para encontrar la mejor solución. 
      La <strong className="text-cyan-400">Inteligencia Artificial (IA)</strong> opera de manera similar: es el campo de estudio 
      dedicado a crear sistemas computacionales capaces de imitar el funcionamiento del cerebro humano, permitiéndoles 
      <span className="text-purple-400"> aprender de forma autónoma</span> sin necesidad de ser programados explícitamente para cada tarea.
    </p>

    <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-400 p-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <Lightbulb className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-cyan-400 mb-2">Definición Simple</h4>
          <p>La IA consiste en enseñar a las computadoras a pensar y aprender por sí mismas, en lugar de proporcionarles 
          instrucciones paso a paso para cada acción que deben realizar.</p>
        </div>
      </div>
    </div>

    <h3 className="text-xl font-bold text-purple-400 mt-8">¿Qué Puede Hacer la IA?</h3>
    <p className="leading-relaxed">
      La Inteligencia Artificial utiliza <strong>algoritmos</strong> —que funcionan como recetas matemáticas sofisticadas— 
      junto con tecnología avanzada para aprender automáticamente de los datos y realizar diversas tareas:
    </p>

    <div className="grid md:grid-cols-2 gap-4 mt-6">
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <Search className="w-5 h-5 text-cyan-400" />
          <h4 className="font-semibold">Identificar Patrones</h4>
        </div>
        <p className="text-sm text-gray-300">Como reconocer que todos los lunes llueve más en una ciudad específica</p>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <Filter className="w-5 h-5 text-purple-400" />
          <h4 className="font-semibold">Clasificar Información</h4>
        </div>
        <p className="text-sm text-gray-300">Separar correos importantes de spam automáticamente</p>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <Target className="w-5 h-5 text-pink-400" />
          <h4 className="font-semibold">Tomar Decisiones</h4>
        </div>
        <p className="text-sm text-gray-300">Recomendar qué película ver basándose en tus gustos</p>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <h4 className="font-semibold">Mejorar Continuamente</h4>
        </div>
        <p className="text-sm text-gray-300">Aprender de errores pasados para refinar sus predicciones</p>
      </div>
    </div>

    <div className="bg-gradient-to-r from-purple-500/10 to-transparent border-l-4 border-purple-400 p-4 rounded-r-lg mt-6">
      <div className="flex items-start gap-3">
        <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-purple-400 mb-2">Ejemplo Práctico: Netflix</h4>
          <p className="mb-3">Cuando Netflix te recomienda una película, está utilizando IA para:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li><strong>Analizar tu historial</strong> de visualización (datos históricos)</li>
            <li><strong>Identificar patrones</strong> en tus preferencias (te gustan las comedias románticas)</li>
            <li><strong>Predecir qué te gustará</strong> (te recomienda "Love Actually")</li>
            <li><strong>Aprender si acertó</strong> (registra si la viste o no)</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
);

const c1t1Quiz: QuizQuestion[] = [
  {
    question: "¿Cuál es la definición más adecuada de Inteligencia Artificial?",
    options: [
      "Programas que siguen instrucciones paso a paso",
      "Sistemas que imitan el funcionamiento del cerebro humano para aprender autónomamente",
      "Computadoras con mayor velocidad de procesamiento",
      "Bases de datos muy grandes"
    ],
    correct: 1,
    explanation: "La IA busca que las computadoras imiten el funcionamiento del cerebro humano, permitiéndoles aprender sin ser programadas explícitamente para cada tarea."
  },
  {
    question: "¿Qué hace Netflix cuando te recomienda una película?",
    options: [
      "Elige al azar entre las disponibles",
      "Analiza tu historial, identifica patrones y predice tus preferencias",
      "Muestra las películas más recientes",
      "Recomienda las más populares globalmente"
    ],
    correct: 1,
    explanation: "Netflix utiliza IA para analizar tu historial, identificar patrones en tus gustos, predecir qué te gustará y aprender de tus decisiones."
  },
  {
    question: "¿Qué son los algoritmos en el contexto de IA?",
    options: [
      "Hardware especializado",
      "Recetas matemáticas que permiten el aprendizaje",
      "Bases de datos de entrenamiento",
      "Interfaces de usuario"
    ],
    correct: 1,
    explanation: "Los algoritmos funcionan como recetas matemáticas sofisticadas que permiten a la IA aprender automáticamente de los datos."
  }
];

// Capítulo 1 - Tema 2
const c1t2Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">El Proceso de Aprendizaje</h3>
    <p className="leading-relaxed">
      El corazón de cualquier sistema de IA reside en su capacidad para aprender. Pero, ¿cómo logra esto una máquina? 
      El proceso es sorprendentemente similar a cómo los humanos adquirimos conocimiento.
    </p>

    <div className="relative h-56 rounded-2xl overflow-hidden my-6">
      <img src="/ml-process.jpg" alt="Machine Learning Process" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
    </div>

    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
      <h4 className="font-semibold text-purple-400 mb-4">Analogía: Enseñar a un Niño a Reconocer Perros</h4>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</span>
          <p>Le muestras muchas fotos de diferentes perros (<strong>datos de entrenamiento</strong>)</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</span>
          <p>Le dices "esto es un perro" cada vez (<strong>etiquetas</strong>)</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold flex-shrink-0">3</span>
          <p>El niño practica viendo más fotos (<strong>iteraciones</strong>)</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold flex-shrink-0">4</span>
          <p>Corrige sus errores cuando se equivoca (<strong>ajuste del modelo</strong>)</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold flex-shrink-0">5</span>
          <p>Finalmente, puede reconocer perros nuevos que nunca ha visto (<strong>modelo entrenado</strong>)</p>
        </div>
      </div>
    </div>

    <h3 className="text-xl font-bold text-purple-400 mt-8">Componentes Clave del Aprendizaje</h3>
    
    <div className="grid md:grid-cols-3 gap-4 mt-4">
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl text-center">
        <Code className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
        <h4 className="font-semibold text-cyan-400 mb-2">Algoritmo</h4>
        <p className="text-sm text-gray-300">Es la "receta" o método que utiliza la IA para aprender. Diferentes problemas requieren diferentes recetas.</p>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl text-center">
        <Brain className="w-10 h-10 text-purple-400 mx-auto mb-3" />
        <h4 className="font-semibold text-purple-400 mb-2">Modelo</h4>
        <p className="text-sm text-gray-300">Es el "cerebro" que se forma después de que la IA aprende. Como el conocimiento que adquiere el niño.</p>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl text-center">
        <Database className="w-10 h-10 text-pink-400 mx-auto mb-3" />
        <h4 className="font-semibold text-pink-400 mb-2">Datos de Entrenamiento</h4>
        <p className="text-sm text-gray-300">Es la "comida" que alimenta a la IA. Sin buenos datos, la IA no puede aprender correctamente.</p>
      </div>
    </div>

    <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-400 p-4 rounded-r-lg mt-6">
      <div className="flex items-start gap-3">
        <Target className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-cyan-400 mb-2">Ejemplo del Mundo Real: Predicción de Abandono</h4>
          <p className="mb-3"><strong>Problema:</strong> Predecir si un cliente abandonará tu servicio</p>
          <p className="font-semibold mb-2">Proceso:</p>
          <ol className="list-decimal list-inside space-y-1 ml-4 text-sm">
            <li>Reúnes datos históricos de clientes que se fueron y se quedaron</li>
            <li>Eliges un algoritmo adecuado para el problema</li>
            <li>Entrenas el modelo mostrándole esos datos repetidamente</li>
            <li>El modelo aprende patrones (ej: "clientes que llaman mucho a soporte suelen irse")</li>
            <li>Cuando llega un cliente nuevo, el modelo predice si probablemente se irá</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
);

const c1t2Quiz: QuizQuestion[] = [
  {
    question: "¿Cuál es el componente que se forma DESPUÉS de que la IA aprende?",
    options: [
      "El algoritmo",
      "Los datos de entrenamiento",
      "El modelo",
      "Las etiquetas"
    ],
    correct: 2,
    explanation: "El modelo es el 'cerebro' que se forma después de que la IA aprende, como el conocimiento que adquiere un niño después de ver muchas fotos."
  },
  {
    question: "En la analogía del niño y los perros, ¿qué representan las 'etiquetas'?",
    options: [
      "Las fotos de perros",
      "Cuando le decimos 'esto es un perro'",
      "Los perros nuevos que reconoce",
      "Los errores que comete"
    ],
    correct: 1,
    explanation: "Las etiquetas son las respuestas correctas que damos durante el entrenamiento, como decir 'esto es un perro' para cada foto."
  },
  {
    question: "¿Por qué son importantes los datos de entrenamiento?",
    options: [
      "Son opcionales para el aprendizaje",
      "Son la 'comida' que alimenta a la IA",
      "Solo sirven para almacenar información",
      "Son el resultado final del entrenamiento"
    ],
    correct: 1,
    explanation: "Los datos de entrenamiento son esenciales, como la 'comida' que alimenta a la IA. Sin buenos datos, la IA no puede aprender correctamente."
  }
];

// Continuar con más contenido...
// Continuación de App.tsx - Más temas del Capítulo 1

// Capítulo 1 - Tema 3
const c1t3Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">Las Dos Grandes Categorías</h3>
    <p className="leading-relaxed">
      Existen dos tipos principales de sistemas de IA, y comprender su diferencia es fundamental para aplicarlas correctamente en el mundo empresarial.
    </p>

    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <div className="bg-gray-800/50 border-l-4 border-cyan-400 p-6 rounded-r-xl">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-8 h-8 text-cyan-400" />
          <h4 className="text-xl font-bold text-cyan-400">IA PREDICTIVA</h4>
        </div>
        <p className="text-sm text-gray-300 mb-4"><strong>¿Qué hace?</strong> Analiza datos del pasado para predecir el futuro o apoyar decisiones.</p>
        
        <div className="bg-cyan-500/10 rounded-lg p-4 mb-4">
          <p className="text-sm italic">"Es como un meteorólogo que estudia patrones del clima para predecir si lloverá mañana."</p>
        </div>

        <p className="font-semibold mb-2">Ejemplos:</p>
        <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
          <li>Predecir ventas del próximo mes</li>
          <li>Detectar fraudes en tarjetas de crédito</li>
          <li>Recomendar productos</li>
          <li>Diagnosticar enfermedades</li>
        </ul>

        <div className="mt-4 pt-4 border-t border-cyan-500/30">
          <p className="font-semibold text-cyan-400 mb-2">Características:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
            <li>Trabaja con datos históricos</li>
            <li>Busca patrones y tendencias</li>
            <li>Hace predicciones numéricas o clasificaciones</li>
            <li>Apoya la toma de decisiones</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-800/50 border-l-4 border-purple-400 p-6 rounded-r-xl">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-purple-400" />
          <h4 className="text-xl font-bold text-purple-400">IA GENERATIVA</h4>
        </div>
        <p className="text-sm text-gray-300 mb-4"><strong>¿Qué hace?</strong> Crea contenido nuevo y original (texto, imágenes, música, código).</p>
        
        <div className="bg-purple-500/10 rounded-lg p-4 mb-4">
          <p className="text-sm italic">"Es como un artista que crea una pintura nueva basándose en lo que ha visto antes."</p>
        </div>

        <p className="font-semibold mb-2">Ejemplos:</p>
        <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
          <li>ChatGPT escribiendo un ensayo</li>
          <li>DALL-E creando imágenes</li>
          <li>Componer música original</li>
          <li>Generar código de programación</li>
        </ul>

        <div className="mt-4 pt-4 border-t border-purple-500/30">
          <p className="font-semibold text-purple-400 mb-2">Características:</p>
          <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
            <li>Crea contenido nuevo</li>
            <li>Es creativo e innovador</li>
            <li>Genera texto, imágenes, audio, video</li>
            <li>Produce algo que no existía antes</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl mt-6">
      <h4 className="font-semibold text-cyan-400 mb-4">Comparación Visual</h4>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="font-semibold text-cyan-400 mb-3">IA Predictiva:</p>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-400">Entrada:</span> Datos históricos de ventas</p>
            <p><span className="text-gray-400">Proceso:</span> Analiza patrones estacionales</p>
            <p><span className="text-gray-400">Salida:</span> "Las ventas subirán 15% en diciembre"</p>
          </div>
        </div>
        <div>
          <p className="font-semibold text-purple-400 mb-3">IA Generativa:</p>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-400">Entrada:</span> "Dibuja un gato astronauta"</p>
            <p><span className="text-gray-400">Proceso:</span> Combina conceptos de gatos y astronautas</p>
            <p><span className="text-gray-400">Salida:</span> Una imagen nueva de un gato en el espacio</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-yellow-500/10 to-transparent border-l-4 border-yellow-400 p-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <BookOpen className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-yellow-400 mb-2">Nota Importante</h4>
          <p>Este curso se enfoca específicamente en <strong>IA Predictiva</strong>, que es la más utilizada en el ámbito empresarial actualmente, 
          ya que permite tomar decisiones basadas en datos y patrones históricos.</p>
        </div>
      </div>
    </div>
  </div>
);

const c1t3Quiz: QuizQuestion[] = [
  {
    question: "¿Cuál es la principal diferencia entre IA Predictiva e IA Generativa?",
    options: [
      "La Predictiva es más rápida",
      "La Predictiva analiza datos pasados para predecir; la Generativa crea contenido nuevo",
      "La Generativa es más cara",
      "No hay diferencia significativa"
    ],
    correct: 1,
    explanation: "La IA Predictiva analiza datos históricos para hacer predicciones, mientras que la IA Generativa crea contenido completamente nuevo como imágenes, texto o música."
  },
  {
    question: "¿Cuál de estos es un ejemplo de IA Predictiva?",
    options: [
      "DALL-E creando imágenes",
      "ChatGPT escribiendo un ensayo",
      "Detectar fraudes en tarjetas de crédito",
      "Componer música original"
    ],
    correct: 2,
    explanation: "Detectar fraudes es IA Predictiva porque analiza patrones históricos de transacciones para predecir cuáles son fraudulentas."
  },
  {
    question: "¿Por qué este curso se enfoca en IA Predictiva?",
    options: [
      "Porque es la más moderna",
      "Porque es la más utilizada en el ámbito empresarial",
      "Porque es más fácil de implementar",
      "Porque es la única que existe"
    ],
    correct: 1,
    explanation: "La IA Predictiva es la más utilizada en el ámbito empresarial porque permite tomar decisiones basadas en datos y patrones históricos."
  }
];

// Capítulo 1 - Tema 4
const c1t4Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">Los 5 Grandes Tipos de Problemas</h3>
    <p className="leading-relaxed">
      La IA predictiva puede ayudarte a resolver cinco tipos principales de problemas empresariales. 
      Cada uno aborda un desafío específico que las empresas enfrentan diariamente.
    </p>

    <div className="space-y-6 mt-6">
      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <Search className="w-5 h-5 text-cyan-400" />
          </div>
          <h4 className="text-lg font-bold text-cyan-400">1. ANÁLISIS COMPLEJO</h4>
        </div>
        <p className="text-gray-300 mb-4">
          <strong>¿Qué es?</strong> Procesar grandes cantidades de datos diversos para obtener insights profundos.
        </p>
        <div className="bg-cyan-500/10 rounded-lg p-4 mb-4">
          <p className="text-sm"><strong>Problema que resuelve:</strong> Los humanos no podemos analizar manualmente millones de registros de datos.</p>
        </div>
        <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-400 p-4 rounded-r-lg">
          <p className="font-semibold mb-2">Ejemplo Práctico - Walmart:</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Millones de transacciones diarias</li>
            <li>Miles de productos en cientos de tiendas</li>
            <li>Datos de clima, economía, redes sociales</li>
          </ul>
          <p className="mt-2 text-sm"><strong>Resultado:</strong> La IA identifica que "cuando llueve y es fin de mes, las ventas de sopa aumentan 40%"</p>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Eye className="w-5 h-5 text-purple-400" />
          </div>
          <h4 className="text-lg font-bold text-purple-400">2. RECONOCIMIENTO GRÁFICO</h4>
        </div>
        <p className="text-gray-300 mb-4">
          <strong>¿Qué es?</strong> Reconocer objetos, caras, escritura en imágenes y videos.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-purple-500/10 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">Reconocimiento Facial</p>
            <p className="text-xs text-gray-400">Tu teléfono te desbloquea con tu cara</p>
          </div>
          <div className="bg-purple-500/10 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">Detección de Defectos</p>
            <p className="text-xs text-gray-400">Fábricas revisan 10,000 botellas/minuto</p>
          </div>
          <div className="bg-purple-500/10 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">Lectura de Documentos</p>
            <p className="text-xs text-gray-400">Escanear facturas y extraer datos automáticamente</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-pink-400" />
          </div>
          <h4 className="text-lg font-bold text-pink-400">3. ANÁLISIS DE LENGUAJE Y SENTIMIENTO</h4>
        </div>
        <p className="text-gray-300 mb-4">
          <strong>¿Qué es?</strong> Entender, interpretar y responder en lenguaje humano, incluyendo emociones.
        </p>
        <div className="bg-gradient-to-r from-pink-500/10 to-transparent border-l-4 border-pink-400 p-4 rounded-r-lg">
          <p className="font-semibold mb-2">Ejemplo - Chatbots Inteligentes:</p>
          <p className="text-sm mb-2">Cliente escribe: <em>"Estoy muy molesto, mi pedido llegó roto"</em></p>
          <p className="text-sm">La IA entiende:</p>
          <ul className="list-disc list-inside text-sm mt-1 ml-4">
            <li>El problema (pedido roto)</li>
            <li>El sentimiento (molesto/enojado)</li>
            <li>La urgencia (alta)</li>
          </ul>
          <p className="text-sm mt-2">Responde: <em>"Lamento mucho su molestia. Vamos a resolverlo inmediatamente..."</em></p>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h4 className="text-lg font-bold text-green-400">4. PREDICCIONES Y PRONÓSTICOS</h4>
        </div>
        <p className="text-gray-300 mb-4">
          <strong>¿Qué es?</strong> Predecir resultados y comportamientos futuros basados en patrones anteriores.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-500/10 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">Pronóstico de Ventas</p>
            <p className="text-xs text-gray-400">"Mañana esperar 350 clientes, pedir 50 kg de pollo, programar 8 meseros"</p>
          </div>
          <div className="bg-green-500/10 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">Predicción de Abandono (Churn)</p>
            <p className="text-xs text-gray-400">Identifica clientes en riesgo y actúa para retenerlos</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-yellow-400" />
          </div>
          <h4 className="text-lg font-bold text-yellow-400">5. TOMA DE DECISIONES AUTÓNOMA</h4>
        </div>
        <p className="text-gray-300 mb-4">
          <strong>¿Qué es?</strong> Delegar decisiones al sistema para que responda automáticamente a eventos.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-yellow-500/10 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">Vehículos Autónomos</p>
            <p className="text-xs text-gray-400">Toman miles de decisiones por minuto, más rápido que humanos</p>
          </div>
          <div className="bg-yellow-500/10 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">Trading Algorítmico</p>
            <p className="text-xs text-gray-400">Compra/venta en milisegundos basado en análisis</p>
          </div>
          <div className="bg-yellow-500/10 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">Aprobación de Crédito</p>
            <p className="text-xs text-gray-400">Decisión en 30 segundos, 10,000 solicitudes/hora</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const c1t4Quiz: QuizQuestion[] = [
  {
    question: "¿Cuál problema resuelve el reconocimiento gráfico?",
    options: [
      "Predecir ventas futuras",
      "Las computadoras tradicionalmente no 'ven' como los humanos",
      "Analizar sentimientos en texto",
      "Tomar decisiones automáticas"
    ],
    correct: 1,
    explanation: "El reconocimiento gráfico resuelve el problema de que las computadoras tradicionalmente no pueden 'ver' e interpretar imágenes como los humanos."
  },
  {
    question: "¿Qué tipo de problema es la predicción de abandono de clientes (Churn)?",
    options: [
      "Análisis complejo",
      "Reconocimiento gráfico",
      "Predicciones y pronósticos",
      "Toma de decisiones autónoma"
    ],
    correct: 2,
    explanation: "La predicción de churn es un problema de predicciones y pronósticos, ya que busca predecir comportamientos futuros basados en patrones históricos."
  },
  {
    question: "¿Cuál es la ventaja principal de la toma de decisiones autónoma?",
    options: [
      "Es más barata",
      "Puede tomar decisiones en milisegundos o a gran escala",
      "No necesita datos",
      "Siempre es correcta"
    ],
    correct: 1,
    explanation: "La toma de decisiones autónoma permite responder en milisegundos y operar a gran escala, algo imposible para los humanos."
  }
];

// Capítulo 1 - Tema 5
const c1t5Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">¿Por Qué las Empresas Necesitan IA Predictiva?</h3>
    <p className="leading-relaxed">
      Existen cuatro necesidades empresariales fundamentales que impulsan la adopción de IA predictiva en las organizaciones modernas.
    </p>

    <div className="space-y-6 mt-6">
      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-cyan-400" />
          </div>
          <h4 className="text-lg font-bold text-cyan-400">1. NECESIDAD DE MEJORAR LA TOMA DE DECISIONES</h4>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
            <p className="font-semibold text-red-400 mb-2">ANTES - Sin IA</p>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
              <li>Decisiones basadas en intuición</li>
              <li>Datos limitados (solo 10% de información)</li>
              <li>Método de prueba y error</li>
            </ul>
          </div>
          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
            <p className="font-semibold text-green-400 mb-2">DESPUÉS - Con IA</p>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
              <li>Análisis de múltiples fuentes de datos</li>
              <li>Predicciones basadas en patrones</li>
              <li>Decisiones informadas y precisas</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-400 p-4 rounded-r-lg">
          <p className="font-semibold mb-2">Ejemplo - Tienda de Ropa:</p>
          <p className="text-sm">La IA analiza ventas históricas, tendencias de moda en redes sociales, pronóstico del clima y comportamiento de competidores para decidir: 
          "Compra 30% más verde esmeralda, 20% menos azul, introduce rosa coral" → <strong>40% menos inventario sin vender, 25% más ganancias</strong></p>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <h4 className="text-lg font-bold text-purple-400">2. NECESIDAD DE DELEGAR LA TOMA DE DECISIONES</h4>
        </div>
        
        <p className="text-gray-300 mb-4">Los humanos tenemos límites: no podemos tomar 1,000 decisiones por minuto, nos cansamos, cometemos errores por fatiga.</p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-purple-500/10 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">Sin IA - Centro de Llamadas</p>
            <ul className="text-xs space-y-1 text-gray-400">
              <li>100 agentes, 8 horas/día</li>
              <li>Tiempo de espera: 15 minutos</li>
              <li>Costo: $500,000/mes</li>
            </ul>
          </div>
          <div className="bg-cyan-500/10 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">Con IA - Chatbot Inteligente</p>
            <ul className="text-xs space-y-1 text-gray-400">
              <li>10,000 conversaciones simultáneas</li>
              <li>Tiempo de respuesta: 2 segundos</li>
              <li>Costo: $5,000/mes</li>
            </ul>
          </div>
        </div>
        <p className="text-center mt-4 text-green-400 font-semibold">Ahorro: $495,000/mes + clientes más felices</p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-pink-400" />
          </div>
          <h4 className="text-lg font-bold text-pink-400">3. NECESIDAD DE ADAPTABILIDAD</h4>
        </div>
        
        <p className="text-gray-300 mb-4">Los sistemas tradicionales son rígidos: siguen reglas fijas, no aprenden ni se adaptan, el mundo cambia pero ellos no.</p>

        <div className="bg-gradient-to-r from-pink-500/10 to-transparent border-l-4 border-pink-400 p-4 rounded-r-lg">
          <p className="font-semibold mb-2">Ejemplo Comparativo:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-red-400 mb-1">Sistema Tradicional:</p>
              <p className="text-xs text-gray-400">Regla fija: "Si compró zapatos, recomendar calcetines"</p>
              <p className="text-xs text-gray-500 mt-1">→ Frustración del cliente</p>
            </div>
            <div>
              <p className="text-sm text-green-400 mb-1">Sistema con IA:</p>
              <p className="text-xs text-gray-400">Detecta cambios en preferencias y ajusta recomendaciones</p>
              <p className="text-xs text-gray-500 mt-1">→ Cliente satisfecho, más ventas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-400" />
          </div>
          <h4 className="text-lg font-bold text-green-400">4. NECESIDAD DE PREDECIR COMPORTAMIENTOS MALICIOSOS</h4>
        </div>
        
        <p className="text-gray-300 mb-4">Los ciberataques evolucionan constantemente: los hackers encuentran nuevas vulnerabilidades, los métodos de ataque cambian cada día.</p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-500/10 rounded-lg p-4">
            <p className="font-semibold text-red-400 mb-2">Sin IA - Defensa Reactiva</p>
            <p className="text-sm text-gray-400">Detectar ataques después de que ocurren, siempre un paso atrás de los atacantes</p>
          </div>
          <div className="bg-green-500/10 rounded-lg p-4">
            <p className="font-semibold text-green-400 mb-2">Con IA - Defensa Proactiva</p>
            <p className="text-sm text-gray-400">Predice ataques con 85% de probabilidad, actúa automáticamente para prevenirlos</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const c1t5Quiz: QuizQuestion[] = [
  {
    question: "¿Cuál es el principal beneficio de delegar decisiones a la IA?",
    options: [
      "Elimina completamente la necesidad de humanos",
      "Puede procesar miles de decisiones por minuto sin fatiga",
      "Siempre toma decisiones perfectas",
      "Es más barata en todos los casos"
    ],
    correct: 1,
    explanation: "La IA puede procesar miles de decisiones por minuto sin cansarse ni cometer errores por fatiga, algo imposible para los humanos."
  },
  {
    question: "¿Por qué los sistemas tradicionales son problemáticos?",
    options: [
      "Son demasiado caros",
      "Son rígidos: siguen reglas fijas y no se adaptan",
      "No pueden procesar datos",
      "Son demasiado lentos"
    ],
    correct: 1,
    explanation: "Los sistemas tradicionales son rígidos porque siguen reglas fijas, no aprenden ni se adaptan a los cambios del entorno."
  },
  {
    question: "¿Qué ventaja ofrece la IA en ciberseguridad?",
    options: [
      "Elimina todos los ataques",
      "Puede predecir y prevenir ataques antes de que ocurran",
      "No necesita actualizaciones",
      "Es imposible de hackear"
    ],
    correct: 1,
    explanation: "La IA puede analizar patrones de comportamiento de hackers y predecir ataques futuros, permitiendo una defensa proactiva."
  }
];

// Continuará con más temas...
// Continuación de App.tsx - Más temas y estructura de capítulos

// Capítulo 1 - Tema 6
const c1t6Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">¿Qué Hizo Posible la IA Predictiva Moderna?</h3>
    <p className="leading-relaxed">
      Tres avances tecnológicos clave permitieron que la IA predictiva sea lo que es hoy. Sin estos desarrollos, 
      la IA moderna no sería posible.
    </p>

    <div className="relative h-56 rounded-2xl overflow-hidden my-6">
      <img src="/data-center.jpg" alt="Data Center" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
    </div>

    <div className="space-y-6 mt-6">
      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <Network className="w-6 h-6 text-cyan-400" />
          </div>
          <h4 className="text-xl font-bold text-cyan-400">1. REDES NEURONALES ARTIFICIALES</h4>
        </div>
        
        <p className="text-gray-300 mb-4">
          Sistemas computacionales inspirados en el cerebro humano, con "neuronas" digitales conectadas en capas 
          que procesan información y toman decisiones.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-cyan-500/10 rounded-lg p-4 text-center">
            <p className="font-semibold text-cyan-400 mb-2">Capa de Entrada</p>
            <p className="text-xs text-gray-400">Recibe los datos iniciales</p>
          </div>
          <div className="bg-purple-500/10 rounded-lg p-4 text-center">
            <p className="font-semibold text-purple-400 mb-2">Capas Ocultas</p>
            <p className="text-xs text-gray-400">Procesan la información</p>
          </div>
          <div className="bg-pink-500/10 rounded-lg p-4 text-center">
            <p className="font-semibold text-pink-400 mb-2">Capa de Salida</p>
            <p className="text-xs text-gray-400">Entrega el resultado</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-400 p-4 rounded-r-lg">
          <p className="font-semibold mb-2">Ejemplo - Google Photos:</p>
          <p className="text-sm">Usa redes neuronales para reconocer caras, identificar objetos, clasificar fotos y permitir búsquedas como "perro" para encontrar todas las fotos con perros.</p>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Server className="w-6 h-6 text-purple-400" />
          </div>
          <h4 className="text-xl font-bold text-purple-400">2. INFRAESTRUCTURA EN LA NUBE</h4>
        </div>
        
        <p className="text-gray-300 mb-4">
          La revolución de servicios como AWS, Google Cloud y Azure democratizó el acceso a potencia computacional masiva.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-500/10 rounded-lg p-4">
            <p className="font-semibold text-red-400 mb-2">ANTES</p>
            <ul className="text-sm space-y-1 text-gray-400">
              <li>Servidor: $500,000</li>
              <li>Mantenimiento: $50,000/año</li>
              <li>Solo grandes empresas podían acceder</li>
            </ul>
          </div>
          <div className="bg-green-500/10 rounded-lg p-4">
            <p className="font-semibold text-green-400 mb-2">AHORA</p>
            <ul className="text-sm space-y-1 text-gray-400">
              <li>Nube: $100/mes</li>
              <li>Escalar cuando necesites</li>
              <li>Cualquier startup puede competir</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
            <Code className="w-6 h-6 text-pink-400" />
          </div>
          <h4 className="text-xl font-bold text-pink-400">3. ALGORITMOS DIVERSOS</h4>
        </div>
        
        <p className="text-gray-300 mb-4">
          Como una caja de herramientas, diferentes problemas requieren diferentes algoritmos especializados.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-pink-500/10 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">Regresión Lineal</p>
            <p className="text-xs text-gray-400">Para predecir precios de casas</p>
          </div>
          <div className="bg-cyan-500/10 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">Naive Bayes</p>
            <p className="text-xs text-gray-400">Para clasificar emails spam</p>
          </div>
          <div className="bg-purple-500/10 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">CNN</p>
            <p className="text-xs text-gray-400">Para reconocer imágenes</p>
          </div>
          <div className="bg-green-500/10 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">RNN</p>
            <p className="text-xs text-gray-400">Para series temporales</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const c1t6Quiz: QuizQuestion[] = [
  {
    question: "¿Qué son las redes neuronales artificiales?",
    options: [
      "Redes de computadoras conectadas",
      "Sistemas inspirados en el cerebro humano con neuronas digitales",
      "Internet de alta velocidad",
      "Bases de datos neuronales"
    ],
    correct: 1,
    explanation: "Las redes neuronales artificiales son sistemas computacionales inspirados en el cerebro humano, con neuronas digitales conectadas en capas."
  },
  {
    question: "¿Qué ventaja ofrece la infraestructura en la nube?",
    options: [
      "Mayor seguridad absoluta",
      "Democratiza el acceso a potencia computacional masiva",
      "Elimina la necesidad de internet",
      "Es más lenta que servidores locales"
    ],
    correct: 1,
    explanation: "La nube permite que cualquier startup acceda a la misma potencia que grandes empresas, pagando solo por lo que usa."
  },
  {
    question: "¿Por qué necesitamos diferentes algoritmos?",
    options: [
      "Para hacer el código más complejo",
      "Diferentes problemas requieren herramientas especializadas",
      "Para confundir a los usuarios",
      "No es necesario, uno solo basta"
    ],
    correct: 1,
    explanation: "Como una caja de herramientas, diferentes problemas requieren algoritmos especializados (CNN para imágenes, RNN para series temporales, etc.)"
  }
];

// Capítulo 1 - Tema 7
const c1t7Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">¿Qué Ganas al Implementar IA Predictiva?</h3>
    <p className="leading-relaxed">
      La IA predictiva ofrece siete beneficios principales que transforman radicalmente la forma de operar los negocios modernos.
    </p>

    <div className="space-y-4 mt-6">
      {[
        { icon: Target, color: 'cyan', title: 'Toma de Decisiones Informada', desc: 'Dejas de adivinar y empiezas a decidir con datos reales y predicciones precisas.' },
        { icon: Zap, color: 'purple', title: 'Soluciones con Capacidad de Respuesta', desc: 'Tu negocio reacciona instantáneamente a cambios del mercado.' },
        { icon: BookOpen, color: 'pink', title: 'Autoaprendizaje y Adaptabilidad', desc: 'El sistema mejora solo, sin intervención humana constante.' },
        { icon: Cpu, color: 'green', title: 'Soluciones Autónomas', desc: 'El sistema toma decisiones y actúa sin intervención humana.' },
        { icon: Settings, color: 'yellow', title: 'Gestión Automatizada', desc: 'Automatiza tareas repetitivas de gestión, liberando tiempo humano.' },
        { icon: Shield, color: 'red', title: 'Detección de Amenazas', desc: 'Protege tu negocio de comportamientos maliciosos 24/7.' },
        { icon: Brain, color: 'cyan', title: 'Resolución de Problemas Complejos', desc: 'Resuelve problemas que los humanos no podemos abordar manualmente.' }
      ].map((benefit, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl flex items-start gap-4"
        >
          <div className={`w-12 h-12 rounded-full bg-${benefit.color}-500/20 flex items-center justify-center flex-shrink-0`}>
            <benefit.icon className={`w-6 h-6 text-${benefit.color}-400`} />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">{benefit.title}</h4>
            <p className="text-gray-400 text-sm">{benefit.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl mt-6">
      <h4 className="font-semibold text-cyan-400 mb-4">Caso Real - Amazon</h4>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-cyan-500/10 rounded-lg p-4">
          <p className="font-semibold text-sm mb-2">Precio Dinámico</p>
          <p className="text-xs text-gray-400">Ajusta precios cada hora basado en demanda, competencia e inventario</p>
        </div>
        <div className="bg-purple-500/10 rounded-lg p-4">
          <p className="font-semibold text-sm mb-2">Inventario Inteligente</p>
          <p className="text-xs text-gray-400">Predice ventas y ordena automáticamente a proveedores</p>
        </div>
        <div className="bg-green-500/10 rounded-lg p-4">
          <p className="font-semibold text-sm mb-2">Logística Predictiva</p>
          <p className="text-xs text-gray-400">Mueve productos a almacenes estratégicos antes de la demanda</p>
        </div>
      </div>
      <p className="text-center mt-4 text-green-400 font-semibold">Resultado: Entrega en 24 horas, maximización de ganancias</p>
    </div>
  </div>
);

const c1t7Quiz: QuizQuestion[] = [
  {
    question: "¿Cuál es el beneficio principal de la toma de decisiones informada?",
    options: [
      "Elimina la necesidad de empleados",
      "Dejas de adivinar y decides con datos reales",
      "Es más rápida que cualquier otra forma",
      "No requiere inversión"
    ],
    correct: 1,
    explanation: "El beneficio principal es que las decisiones se basan en datos reales y predicciones precisas, no en intuición."
  },
  {
    question: "¿Qué significa que el sistema tenga 'autoaprendizaje'?",
    options: [
      "No necesita mantenimiento",
      "Mejora solo sin intervención humana constante",
      "Aprende de otros sistemas",
      "No comete errores"
    ],
    correct: 1,
    explanation: "El autoaprendizaje significa que el sistema mejora continuamente por sí mismo, adaptándose a nuevos datos sin intervención constante."
  },
  {
    question: "¿Cuál beneficio permite a Amazon hacer entregas en 24 horas?",
    options: [
      "Precio dinámico",
      "Logística predictiva",
      "Detección de amenazas",
      "Gestión automatizada"
    ],
    correct: 1,
    explanation: "La logística predictiva permite a Amazon mover productos a almacenes estratégicos ANTES de que se vendan, habilitando entregas rápidas."
  }
];

// Capítulo 1 - Tema 8
const c1t8Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">Lo Que Puede Salir Mal (y Cómo Evitarlo)</h3>
    <p className="leading-relaxed">
      La IA predictiva es poderosa, pero tiene desafíos. Conocerlos te ayuda a evitar problemas costosos y a implementar soluciones más robustas.
    </p>

    <div className="space-y-6 mt-6">
      <div className="bg-gray-800/50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          <h4 className="text-lg font-bold text-yellow-400">1. CURVA DE APRENDIZAJE Y DECISIONES INCOMPRENSIBLES</h4>
        </div>
        <p className="text-gray-300 mb-4">
          A veces, la IA toma decisiones que ni siquiera sus creadores entienden completamente.
        </p>
        <div className="bg-gradient-to-r from-yellow-500/10 to-transparent border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <p className="font-semibold mb-2">Ejemplo:</p>
          <p className="text-sm">Un banco usa IA para aprobar créditos. María, con buenos ingresos, es rechazada. Cuando pregunta por qué, el banco responde: "No sabemos, la IA lo decidió."</p>
        </div>
        <div className="mt-4 bg-green-500/10 rounded-lg p-4">
          <p className="font-semibold text-green-400 mb-2">Soluciones:</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Usar IA Explicable (XAI) que pueda explicar sus decisiones</li>
            <li>Mantener supervisión humana en decisiones críticas</li>
            <li>Documentar cómo se entrenó el modelo</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-800/50 border-l-4 border-purple-400 p-6 rounded-r-xl">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-purple-400" />
          <h4 className="text-lg font-bold text-purple-400">2. DESCONFIANZA POR PARTE DE LAS PERSONAS</h4>
        </div>
        <p className="text-gray-300 mb-4">
          Mucha gente teme que la IA les quite el trabajo. Esta desconfianza puede bloquear implementaciones exitosas.
        </p>
        <div className="bg-gradient-to-r from-purple-500/10 to-transparent border-l-4 border-purple-400 p-4 rounded-r-lg">
          <p className="font-semibold mb-2">Realidad:</p>
          <p className="text-sm">La IA <strong>transforma</strong> más que reemplaza. Los radiólogos ahora se enfocan en casos complejos mientras la IA hace diagnósticos iniciales. Amazon emplea más personas que nunca (1.5 millones) trabajando junto a robots.</p>
        </div>
      </div>

      <div className="bg-gray-800/50 border-l-4 border-red-400 p-6 rounded-r-xl">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-6 h-6 text-red-400" />
          <h4 className="text-lg font-bold text-red-400">3. HOSPEDAJE DE DATOS Y RESTRICCIONES</h4>
        </div>
        <p className="text-gray-300 mb-4">
          La IA necesita muchos datos, pero existen limitaciones legales y prácticas.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-red-500/10 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">Privacidad</p>
            <p className="text-xs text-gray-400">Leyes como HIPAA y GDPR protegen datos sensibles</p>
          </div>
          <div className="bg-orange-500/10 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">Ubicación</p>
            <p className="text-xs text-gray-400">Algunos datos no pueden salir del país</p>
          </div>
          <div className="bg-yellow-500/10 rounded-lg p-4">
            <p className="font-semibold text-sm mb-2">Volumen</p>
            <p className="text-xs text-gray-400">A veces no hay suficientes datos disponibles</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 border-l-4 border-green-400 p-6 rounded-r-xl">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <h4 className="text-lg font-bold text-green-400">4. GARANTÍA DE CALIDAD</h4>
        </div>
        <p className="text-gray-300 mb-4">
          ¿Cómo sabes que la IA funciona correctamente? El comportamiento impredecible es un riesgo real.
        </p>
        <div className="bg-gradient-to-r from-yellow-500/10 to-transparent border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <p className="font-semibold mb-2">Caso Real - Microsoft Tay (2016):</p>
          <p className="text-sm">Chatbot que aprendía de conversaciones en Twitter. En 24 horas, usuarios lo "entrenaron" para ser racista y ofensivo. Microsoft tuvo que apagarlo.</p>
        </div>
        <div className="mt-4 bg-green-500/10 rounded-lg p-4">
          <p className="font-semibold text-green-400 mb-2">Cómo Asegurar Calidad:</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Pruebas rigurosas con datos no usados en entrenamiento</li>
            <li>Monitoreo continuo de decisiones</li>
            <li>Validación cruzada</li>
            <li>Límites de seguridad: IA sugiere, humano aprueba</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const c1t8Quiz: QuizQuestion[] = [
  {
    question: "¿Cuál es el problema de las decisiones incomprensibles de la IA?",
    options: [
      "Son más lentas",
      "No se puede explicar por qué se tomó una decisión",
      "Son siempre incorrectas",
      "No hay problema"
    ],
    correct: 1,
    explanation: "El problema es que cuando la IA toma decisiones que no podemos explicar, surgen problemas legales y éticos, especialmente en sectores regulados."
  },
  {
    question: "¿Qué pasó con Microsoft Tay?",
    options: [
      "Se volvió el chatbot más popular",
      "Usuarios maliciosos lo entrenaron para comportarse mal en 24 horas",
      "Fue vendido a otra empresa",
      "Nunca funcionó"
    ],
    correct: 1,
    explanation: "Microsoft Tay fue un chatbot que aprendía de Twitter. Usuarios lo entrenaron intencionalmente para ser racista y ofensivo en solo 24 horas."
  },
  {
    question: "¿Cómo se puede asegurar la calidad de un sistema de IA?",
    options: [
      "No usarlo en producción",
      "Pruebas rigurosas, monitoreo continuo y límites de seguridad",
      "Dejar que aprenda sin supervisión",
      "Usar solo un tipo de dato"
    ],
    correct: 1,
    explanation: "La calidad se asegura con pruebas rigurosas, monitoreo continuo, validación cruzada y manteniendo supervisión humana en decisiones críticas."
  }
];


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
            <Sparkles className="w-5 h-5 text-purple-400" />
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

// Continuará con Capítulo 2...
// Continuación de App.tsx - Capítulo 2 completo

// Capítulo 2 - Tema 1 (Repaso)
const c2t1Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">Lo Esencial que Debes Recordar</h3>
    <p className="leading-relaxed">
      Antes de avanzar, repasemos los conceptos fundamentales del Capítulo 1 que son la base para comprender los temas avanzados.
    </p>

    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
      <h4 className="font-semibold text-cyan-400 mb-4">Conceptos Clave</h4>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-cyan-500/10 rounded-lg p-4">
          <p className="font-semibold text-cyan-400 mb-1">IA Predictiva</p>
          <p className="text-sm text-gray-400">Analiza datos del pasado para predecir el futuro</p>
        </div>
        <div className="bg-purple-500/10 rounded-lg p-4">
          <p className="font-semibold text-purple-400 mb-1">Modelo</p>
          <p className="text-sm text-gray-400">El "cerebro" que resulta después de entrenar una IA</p>
        </div>
        <div className="bg-pink-500/10 rounded-lg p-4">
          <p className="font-semibold text-pink-400 mb-1">Algoritmo</p>
          <p className="text-sm text-gray-400">La "receta" matemática que usa la IA para aprender</p>
        </div>
        <div className="bg-green-500/10 rounded-lg p-4">
          <p className="font-semibold text-green-400 mb-1">Redes Neuronales</p>
          <p className="text-sm text-gray-400">Sistemas inspirados en el cerebro humano</p>
        </div>
      </div>
    </div>

    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
      <h4 className="font-semibold text-purple-400 mb-4">Los 3 Tipos Principales de Redes</h4>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left p-3">Red</th>
            <th className="text-left p-3">Para qué sirve</th>
            <th className="text-left p-3">Ejemplo práctico</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-800">
            <td className="text-cyan-400 font-semibold p-3">FFNN</td>
            <td className="p-3">Predicciones numéricas</td>
            <td className="p-3">Predecir precio de una casa</td>
          </tr>
          <tr className="border-b border-gray-800">
            <td className="text-purple-400 font-semibold p-3">CNN</td>
            <td className="p-3">Análisis de imágenes</td>
            <td className="p-3">Detectar defectos en productos</td>
          </tr>
          <tr>
            <td className="text-pink-400 font-semibold p-3">RNN</td>
            <td className="p-3">Datos secuenciales</td>
            <td className="p-3">Pronóstico de ventas mensuales</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-400 p-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <Lightbulb className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-cyan-400 mb-2">Recuerda</h4>
          <p><strong>Sin datos de calidad, no hay IA de calidad.</strong> Los datos son el combustible que alimenta todo el sistema de aprendizaje.</p>
        </div>
      </div>
    </div>
  </div>
);

const c2t1Quiz: QuizQuestion[] = [
  {
    question: "¿Qué es un modelo en IA?",
    options: [
      "El algoritmo de entrenamiento",
      "El 'cerebro' que resulta después de entrenar",
      "Los datos de entrada",
      "La interfaz de usuario"
    ],
    correct: 1,
    explanation: "El modelo es el 'cerebro' resultante del entrenamiento, que contiene el conocimiento aprendido por la IA."
  },
  {
    question: "¿Para qué sirve una CNN (Red Neuronal Convolucional)?",
    options: [
      "Predicciones numéricas",
      "Análisis de imágenes",
      "Datos secuenciales",
      "Procesamiento de texto"
    ],
    correct: 1,
    explanation: "Las CNN están especializadas en análisis de imágenes, como detectar defectos en productos o reconocer objetos."
  },
  {
    question: "¿Cuál es el 'combustible' de la IA?",
    options: [
      "Los algoritmos",
      "Los datos de calidad",
      "La computadora",
      "El modelo"
    ],
    correct: 1,
    explanation: "Sin datos de calidad, no hay IA de calidad. Los datos son el combustible que alimenta el aprendizaje."
  }
];

// Capítulo 2 - Tema 2 (Tipos de Aprendizaje)
const c2t2Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">Aprendizaje Supervisado, No Supervisado y Semi-Supervisado</h3>
    <p className="leading-relaxed">
      La gran diferencia entre estos enfoques radica en las <strong>etiquetas</strong>: las respuestas correctas que damos a la IA durante el entrenamiento.
    </p>

    <div className="grid md:grid-cols-3 gap-4 mt-6">
      <div className="bg-gray-800/50 border-t-4 border-cyan-400 p-5 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
          <h4 className="font-bold text-cyan-400">SUPERVISADO</h4>
        </div>
        <p className="text-sm text-gray-400 mb-3">"Con Maestro"</p>
        <p className="text-sm mb-4">Tienes datos de entrada + respuestas correctas (etiquetas)</p>
        
        <div className="bg-cyan-500/10 rounded-lg p-3 mb-3">
          <p className="text-xs font-semibold mb-1">Analogía:</p>
          <p className="text-xs text-gray-400">Maestro dice "Esto es una manzana" 🍎</p>
        </div>
        
        <p className="text-xs font-semibold mb-1">Cuándo usar:</p>
        <ul className="list-disc list-inside text-xs text-gray-400">
          <li>Tienes datos etiquetados</li>
          <li>Clasificación o regresión</li>
          <li>Alta precisión desde inicio</li>
        </ul>
      </div>

      <div className="bg-gray-800/50 border-t-4 border-purple-400 p-5 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
          <h4 className="font-bold text-purple-400">NO SUPERVISADO</h4>
        </div>
        <p className="text-sm text-gray-400 mb-3">"Autodidacta"</p>
        <p className="text-sm mb-4">Tienes datos de entrada, pero SIN etiquetas</p>
        
        <div className="bg-purple-500/10 rounded-lg p-3 mb-3">
          <p className="text-xs font-semibold mb-1">Analogía:</p>
          <p className="text-xs text-gray-400">"Encuentra similitudes y agrúpalas"</p>
        </div>
        
        <p className="text-xs font-semibold mb-1">Cuándo usar:</p>
        <ul className="list-disc list-inside text-xs text-gray-400">
          <li>No tienes datos etiquetados</li>
          <li>Descubrir patrones ocultos</li>
          <li>Segmentación de clientes</li>
        </ul>
      </div>

      <div className="bg-gray-800/50 border-t-4 border-pink-400 p-5 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-pink-400"></div>
          <h4 className="font-bold text-pink-400">SEMI-SUPERVISADO</h4>
        </div>
        <p className="text-sm text-gray-400 mb-3">"Lo Mejor de Ambos"</p>
        <p className="text-sm mb-4">Combinas pocos datos etiquetados + muchos sin etiquetar</p>
        
        <div className="bg-pink-500/10 rounded-lg p-3 mb-3">
          <p className="text-xs font-semibold mb-1">Analogía:</p>
          <p className="text-xs text-gray-400">20 frutas etiquetadas + 80 sin etiquetar</p>
        </div>
        
        <p className="text-xs font-semibold mb-1">Cuándo usar:</p>
        <ul className="list-disc list-inside text-xs text-gray-400">
          <li>Etiquetar es costoso</li>
          <li>Pocos datos etiquetados</li>
          <li>Maximizar precisión</li>
        </ul>
      </div>
    </div>

    <div className="bg-gradient-to-r from-purple-500/10 to-transparent border-l-4 border-purple-400 p-4 rounded-r-lg mt-6">
      <div className="flex items-start gap-3">
        <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-purple-400 mb-2">Ejemplo Práctico - Diagnóstico Médico</h4>
          <p className="text-sm mb-2"><strong>Situación:</strong> 1,000 radiografías etiquetadas (costoso: $50 c/u) + 50,000 sin etiquetar</p>
          <p className="text-sm"><strong>Solución Semi-Supervisada:</strong></p>
          <ol className="list-decimal list-inside text-sm mt-1 ml-4">
            <li>Entrenar modelo con 1,000 etiquetadas</li>
            <li>Usar modelo para pre-etiquetar las 50,000 restantes</li>
            <li>Filtrar predicciones con alta confianza (&gt;95%)</li>
            <li>Re-entrenar con conjunto expandido</li>
          </ol>
          <p className="text-sm mt-2 text-green-400"><strong>Resultado:</strong> Precisión 94% vs 87% con solo 1,000 datos. Ahorro: $2.4 millones</p>
        </div>
      </div>
    </div>
  </div>
);

const c2t2Quiz: QuizQuestion[] = [
  {
    question: "¿Cuál es la diferencia clave entre aprendizaje supervisado y no supervisado?",
    options: [
      "La velocidad de entrenamiento",
      "La presencia o ausencia de etiquetas en los datos",
      "El tipo de algoritmo usado",
      "El tamaño del dataset"
    ],
    correct: 1,
    explanation: "La gran diferencia es que el supervisado usa datos con etiquetas (respuestas correctas), mientras que el no supervisado trabaja sin ellas."
  },
  {
    question: "¿Cuándo es útil el aprendizaje semi-supervisado?",
    options: [
      "Cuando tienes muchos datos etiquetados",
      "Cuando etiquetar es costoso y tienes pocos datos etiquetados pero muchos sin etiquetar",
      "Cuando no tienes ningún dato",
      "Cuando necesitas respuestas inmediatas"
    ],
    correct: 1,
    explanation: "El aprendizaje semi-supervisado es ideal cuando etiquetar es costoso o lento, pero tienes muchos datos sin etiquetar disponibles."
  },
  {
    question: "¿Qué tipo de aprendizaje usarías para segmentar clientes sin saber de antemano los segmentos?",
    options: [
      "Supervisado",
      "No supervisado",
      "Semi-supervisado",
      "Ninguno"
    ],
    correct: 1,
    explanation: "El aprendizaje no supervisado es ideal para segmentación porque descubre patrones y agrupaciones por sí mismo, sin necesidad de etiquetas previas."
  }
];

// Capítulo 2 - Tema 3 (Etiquetas)
const c2t3Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">El Poder de las Etiquetas en los Datos</h3>
    
    <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-400 p-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <Target className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-cyan-400 mb-2">Definición Simple</h4>
          <p>Una etiqueta es la <strong>"respuesta correcta"</strong> que le das a la IA durante el entrenamiento.</p>
        </div>
      </div>
    </div>

    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
      <h4 className="font-semibold text-purple-400 mb-4">Analogía del Examen Escolar</h4>
      <div className="bg-purple-500/10 rounded-lg p-4">
        <p className="mb-2"><span className="text-gray-400">Pregunta (dato de entrada):</span> "2 + 2 = ?"</p>
        <p className="mb-2"><span className="text-purple-400">Respuesta correcta (etiqueta):</span> "4"</p>
        <div className="mt-3 space-y-1 text-sm">
          <p>❌ Si la IA responde "5" → <span className="text-red-400">Error</span> → Ajusta sus parámetros</p>
          <p>✅ Si la IA responde "4" → <span className="text-green-400">Correcto</span> → Refuerza ese conocimiento</p>
        </div>
      </div>
    </div>

    <h4 className="font-semibold text-cyan-400 mt-6">Tipos de Etiquetas</h4>
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm">A</div>
          <h5 className="font-semibold">Binarias (Sí/No)</h5>
        </div>
        <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
          <li>Email → "spam" o "no spam"</li>
          <li>Transacción → "fraudulenta" o "legítima"</li>
          <li>Imagen médica → "con tumor" o "sin tumor"</li>
        </ul>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">B</div>
          <h5 className="font-semibold">Multiclase</h5>
        </div>
        <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
          <li>Imagen → "zapato", "camisa", "pantalón"</li>
          <li>Texto → "queja", "consulta", "felicitación"</li>
          <li>Producto → categorías múltiples</li>
        </ul>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-sm">C</div>
          <h5 className="font-semibold">Numéricas</h5>
        </div>
        <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
          <li>Casa → "$285,000"</li>
          <li>Ventas → "1,250 unidades"</li>
          <li>Temperatura → "23.5°C"</li>
        </ul>
      </div>
    </div>

    <div className="bg-gradient-to-r from-yellow-500/10 to-transparent border-l-4 border-yellow-400 p-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-yellow-400 mb-2">⚠ ADVERTENCIA: "Basura entra, basura sale"</h4>
          <p className="text-sm mb-3">La calidad de las etiquetas determina directamente la calidad del modelo.</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Problema</th>
                <th className="text-left p-2">Consecuencia</th>
                <th className="text-left p-2">Solución</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="p-2">Etiquetas incorrectas</td>
                <td className="p-2">IA aprende patrones erróneos</td>
                <td className="p-2">Revisión por expertos</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-2">Etiquetas inconsistentes</td>
                <td className="p-2">Confusión en el aprendizaje</td>
                <td className="p-2">Criterios claros</td>
              </tr>
              <tr>
                <td className="p-2">Clases desbalanceadas</td>
                <td className="p-2">Sesgo hacia clase mayoritaria</td>
                <td className="p-2">Técnicas de balanceo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const c2t3Quiz: QuizQuestion[] = [
  {
    question: "¿Qué es una etiqueta en el contexto de IA?",
    options: [
      "Un marcador físico en los datos",
      "La 'respuesta correcta' que damos durante el entrenamiento",
      "El nombre del archivo de datos",
      "Un tipo de algoritmo"
    ],
    correct: 1,
    explanation: "Una etiqueta es la 'respuesta correcta' que le damos a la IA durante el entrenamiento para que aprenda el patrón correcto."
  },
  {
    question: "¿Qué significa 'Basura entra, basura sale' (Garbage In, Garbage Out)?",
    options: [
      "Hay que limpiar físicamente los datos",
      "La calidad de las etiquetas determina la calidad del modelo",
      "Los datos deben ser de color gris",
      "La IA solo funciona con datos de basura"
    ],
    correct: 1,
    explanation: "Significa que si usamos etiquetas de mala calidad, el modelo aprenderá patrones incorrectos y tendrá mal rendimiento."
  },
  {
    question: "¿Cuál estrategia de etiquetado es mejor para datos médicos críticos?",
    options: [
      "Crowdsourcing",
      "Etiquetado por expertos",
      "Active Learning",
      "Etiquetado automático"
    ],
    correct: 1,
    explanation: "Para datos médicos críticos se recomienda etiquetado por expertos, ya que ofrece la más alta calidad aunque sea más costoso."
  }
];

// Continuará con más temas del Capítulo 2...
// Continuación de App.tsx - Más temas del Capítulo 2

// Capítulo 2 - Tema 4 (Preprocesamiento)
const c2t4Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">Técnicas Avanzadas de Preprocesamiento</h3>
    
    <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-400 p-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <Code className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-cyan-400 mb-2">Analogía de la Cocina</h4>
          <p>Ingredientes crudos (datos brutos) → Lavar, pelar, cortar (preprocesamiento) → Cocinar (entrenar modelo) → Platillo delicioso (predicciones precisas)</p>
        </div>
      </div>
    </div>

    <div className="space-y-6 mt-6">
      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <h4 className="font-semibold text-cyan-400 mb-4">A) Limpieza de Datos: Eliminar el "Ruido"</h4>
        <div className="bg-black/50 border border-gray-700 rounded-lg p-4 font-mono text-sm">
          <p className="text-gray-400 mb-2"># 1. Valores faltantes (NaN, null)</p>
          <p className="text-green-400">✅ Bien:</p>
          <p className="text-gray-300 ml-4">• Si &lt;5% faltantes: Eliminar filas</p>
          <p className="text-gray-300 ml-4">• Si 5-30%: Imputar con media/mediana</p>
          <p className="text-gray-300 ml-4">• Si &gt;30%: Considerar eliminar columna</p>
          
          <p className="text-gray-400 mt-4 mb-2"># 2. Valores atípicos (outliers)</p>
          <p className="text-green-400">✅ Bien:</p>
          <p className="text-gray-300 ml-4">• Analizar si es error → Corregir/Eliminar</p>
          <p className="text-gray-300 ml-4">• Si es valor real → Transformar (log, sqrt)</p>
          
          <p className="text-gray-400 mt-4 mb-2"># 3. Duplicados</p>
          <p className="text-green-400">✅ Siempre eliminar duplicados exactos</p>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <h4 className="font-semibold text-purple-400 mb-4">B) Normalización y Estandarización</h4>
        <p className="text-gray-300 mb-4">¿Por qué importa? Sin normalizar, características con números grandes dominan sobre otras igualmente importantes.</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-cyan-500/10 rounded-lg p-4">
            <p className="font-semibold text-cyan-400 mb-2">Normalización Min-Max (0-1)</p>
            <code className="text-sm text-gray-300 block">valor_norm = (valor - min) / (max - min)</code>
            <p className="text-xs text-gray-500 mt-2">✅ Cuando sabes los límites</p>
          </div>
          <div className="bg-purple-500/10 rounded-lg p-4">
            <p className="font-semibold text-purple-400 mb-2">Estandarización Z-score</p>
            <code className="text-sm text-gray-300 block">valor_std = (valor - media) / desv_std</code>
            <p className="text-xs text-gray-500 mt-2">✅ Cuando hay outliers</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <h4 className="font-semibold text-pink-400 mb-4">C) Codificación de Variables Categóricas</h4>
        <p className="text-gray-300 mb-4">Las redes neuronales solo entienden números. Debemos convertir texto a números.</p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-pink-500/10 rounded-lg p-4">
            <p className="font-semibold text-pink-400 mb-2">Label Encoding</p>
            <p className="text-xs text-gray-400 mb-2">Para variables ordinales (tienen orden)</p>
            <code className="text-xs text-gray-300 block">bajo→0, medio→1, alto→2</code>
          </div>
          <div className="bg-cyan-500/10 rounded-lg p-4">
            <p className="font-semibold text-cyan-400 mb-2">One-Hot Encoding</p>
            <p className="text-xs text-gray-400 mb-2">Para variables nominales (sin orden)</p>
            <code className="text-xs text-gray-300 block">rojo→[1,0,0], azul→[0,1,0]</code>
          </div>
          <div className="bg-purple-500/10 rounded-lg p-4">
            <p className="font-semibold text-purple-400 mb-2">Embeddings</p>
            <p className="text-xs text-gray-400 mb-2">Para muchas categorías o texto</p>
            <code className="text-xs text-gray-300 block">rojo→[0.23,-0.45,0.78,...]</code>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
        <h4 className="font-semibold text-green-400 mb-4">D) Manejo de Datos Desbalanceados</h4>
        <div className="bg-gradient-to-r from-yellow-500/10 to-transparent border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <p className="text-sm mb-2"><strong>Problema:</strong> Dataset de fraude con 99,000 transacciones legítimas (99%) y 1,000 fraudulentas (1%)</p>
          <p className="text-sm">❌ Riesgo: La IA aprende a predecir SIEMPRE "legítima" → Precisión 99% pero NO detecta NINGÚN fraude</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-3 mt-4">
          <div className="bg-cyan-500/10 rounded-lg p-3 text-center">
            <p className="font-semibold text-sm mb-1">Oversampling</p>
            <p className="text-xs text-gray-400">Aumentar clase minoritaria (SMOTE)</p>
          </div>
          <div className="bg-purple-500/10 rounded-lg p-3 text-center">
            <p className="font-semibold text-sm mb-1">Undersampling</p>
            <p className="text-xs text-gray-400">Reducir clase mayoritaria</p>
          </div>
          <div className="bg-pink-500/10 rounded-lg p-3 text-center">
            <p className="font-semibold text-sm mb-1">Pesos de Clase</p>
            <p className="text-xs text-gray-400">Penalizar errores en minoritaria</p>
          </div>
          <div className="bg-green-500/10 rounded-lg p-3 text-center">
            <p className="font-semibold text-sm mb-1">Métricas Adecuadas</p>
            <p className="text-xs text-gray-400">Usar Precision, Recall, F1</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const c2t4Quiz: QuizQuestion[] = [
  {
    question: "¿Por qué es importante la normalización?",
    options: [
      "Hace los datos más bonitos",
      "Evita que características con números grandes dominen sobre otras",
      "Reduce el tamaño del dataset",
      "Elimina valores faltantes"
    ],
    correct: 1,
    explanation: "La normalización evita que características con números grandes (como metros cuadrados: 50-500) dominen sobre otras igualmente importantes (como baños: 1-5)."
  },
  {
    question: "¿Qué técnica usarías para convertir colores a números?",
    options: [
      "Normalización Min-Max",
      "One-Hot Encoding",
      "Estandarización Z-score",
      "Eliminar la columna"
    ],
    correct: 1,
    explanation: "One-Hot Encoding es ideal para variables categóricas sin orden natural como colores: rojo→[1,0,0], azul→[0,1,0], verde→[0,0,1]"
  },
  {
    question: "¿Cuál es el problema con datos desbalanceados?",
    options: [
      "El modelo puede aprender a predecir siempre la clase mayoritaria",
      "Los datos ocupan más espacio",
      "El entrenamiento es más lento",
      "No hay problema"
    ],
    correct: 0,
    explanation: "Con datos desbalanceados, el modelo puede aprender a predecir siempre la clase mayoritaria, alcanzando alta precisión pero siendo inútil para detectar la clase minoritaria."
  }
];

// Capítulo 2 - Tema 5 (Métricas)
const c2t5Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">Métricas para Evaluar tus Modelos</h3>
    
    <div className="bg-gradient-to-r from-yellow-500/10 to-transparent border-l-4 border-yellow-400 p-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-yellow-400 mb-2">El Problema del 99% Engañoso</h4>
          <p className="text-sm">En diagnóstico de enfermedad rara (1% prevalencia), un modelo que SIEMPRE predice "NO tiene enfermedad" alcanza 99% de accuracy... pero detecta 0 enfermos de 100.</p>
        </div>
      </div>
    </div>

    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
      <h4 className="font-semibold text-cyan-400 mb-4">Matriz de Confusión</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-center">
          <thead>
            <tr className="border-b border-gray-700">
              <th></th>
              <th colSpan={2} className="text-cyan-400 p-3">PREDICHO</th>
            </tr>
            <tr className="border-b border-gray-700">
              <th></th>
              <th className="p-3">POSITIVO</th>
              <th className="p-3">NEGATIVO</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800">
              <td rowSpan={2} className="text-purple-400 font-semibold p-3">REAL</td>
              <td className="bg-green-500/20 p-4">
                <span className="text-green-400 font-bold block">VP</span>
                <span className="text-xs">Verdadero Positivo</span>
              </td>
              <td className="bg-red-500/20 p-4">
                <span className="text-red-400 font-bold block">FN</span>
                <span className="text-xs">Falso Negativo</span>
              </td>
            </tr>
            <tr>
              <td className="bg-red-500/20 p-4">
                <span className="text-red-400 font-bold block">FP</span>
                <span className="text-xs">Falso Positivo</span>
              </td>
              <td className="bg-green-500/20 p-4">
                <span className="text-green-400 font-bold block">VN</span>
                <span className="text-xs">Verdadero Negativo</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <h4 className="font-semibold text-cyan-400 mb-3">Precisión (Precision)</h4>
        <code className="text-sm text-gray-300 block mb-3 bg-black/50 p-2 rounded">VP / (VP + FP)</code>
        <p className="text-sm text-gray-400">"Cuando digo que SÍ, ¿cuántas veces tengo razón?"</p>
        <p className="text-xs text-green-400 mt-2">✅ Importante cuando Falsos Positivos son costosos</p>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <h4 className="font-semibold text-purple-400 mb-3">Exhaustividad (Recall)</h4>
        <code className="text-sm text-gray-300 block mb-3 bg-black/50 p-2 rounded">VP / (VP + FN)</code>
        <p className="text-sm text-gray-400">"De todos los que eran SÍ, ¿cuántos detecté?"</p>
        <p className="text-xs text-green-400 mt-2">✅ Importante cuando Falsos Negativos son graves</p>
      </div>
    </div>

    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
      <h4 className="font-semibold text-green-400 mb-4">F1-Score: El Equilibrio Perfecto</h4>
      <code className="text-sm text-gray-300 block mb-3 bg-black/50 p-2 rounded">F1 = 2 × (Precisión × Recall) / (Precisión + Recall)</code>
      <p className="text-sm text-gray-400">Es la media armónica que penaliza valores extremos. Útil cuando necesitas balance entre Precisión y Recall.</p>
    </div>

    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
      <h4 className="font-semibold text-pink-400 mb-4">Métricas para Regresión (Predicción de Números)</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-3">Métrica</th>
              <th className="text-left p-3">Fórmula</th>
              <th className="text-left p-3">Cuándo usar</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800">
              <td className="text-cyan-400 p-3">MAE</td>
              <td className="p-3">Promedio de |real - predicho|</td>
              <td className="p-3">Errores pesan igual</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="text-purple-400 p-3">RMSE</td>
              <td className="p-3">√(promedio de errores²)</td>
              <td className="p-3">Penaliza errores grandes</td>
            </tr>
            <tr>
              <td className="text-pink-400 p-3">R²</td>
              <td className="p-3">1 - (var_error/var_real)</td>
              <td className="p-3">% de variación explicada</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const c2t5Quiz: QuizQuestion[] = [
  {
    question: "¿Qué mide la Precisión (Precision)?",
    options: [
      "De todos los positivos reales, cuántos detecté",
      "Cuando digo que SÍ, cuántas veces tengo razón",
      "El porcentaje total de aciertos",
      "La velocidad del modelo"
    ],
    correct: 1,
    explanation: "La Precisión mide: 'Cuando digo que SÍ, ¿cuántas veces tengo razón?' = VP / (VP + FP)"
  },
  {
    question: "¿Cuál métrica es más importante para detectar cáncer?",
    options: [
      "Precisión",
      "Recall (Exhaustividad)",
      "Accuracy",
      "F1-Score"
    ],
    correct: 1,
    explanation: "El Recall es más importante porque los Falsos Negativos (no detectar un cáncer) tienen consecuencias graves."
  },
  {
    question: "¿Qué penaliza fuertemente los errores grandes en regresión?",
    options: [
      "MAE",
      "RMSE",
      "R²",
      "Accuracy"
    ],
    correct: 1,
    explanation: "RMSE (Root Mean Square Error) penaliza fuertemente los errores grandes porque eleva los errores al cuadrado antes de promediarlos."
  }
];

// Capítulo 2 - Tema 6 (Overfitting/Underfitting)
const c2t6Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">Overfitting y Underfitting: El Equilibrio Perfecto</h3>
    
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
      <h4 className="font-semibold text-purple-400 mb-4">Analogía del Estudiante</h4>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
          <p className="font-semibold text-red-400 mb-2">❌ UNDERFITTING</p>
          <p className="text-sm text-gray-400 mb-2">"El que no estudió"</p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• No aprendió conceptos básicos</li>
            <li>• Falla en todo</li>
            <li>• Solución: Modelo más complejo</li>
          </ul>
        </div>
        <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
          <p className="font-semibold text-green-400 mb-2">✅ BUEN AJUSTE</p>
          <p className="text-sm text-gray-400 mb-2">"El que entendió"</p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• Aprendió principios</li>
            <li>• Generaliza bien</li>
            <li>• ¡Este es el objetivo!</li>
          </ul>
        </div>
        <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/30">
          <p className="font-semibold text-yellow-400 mb-2">❌ OVERFITTING</p>
          <p className="text-sm text-gray-400 mb-2">"El que memorizó"</p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• Memorizó respuestas</li>
            <li>• Falla en datos nuevos</li>
            <li>• Solución: Simplificar</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
      <h4 className="font-semibold text-cyan-400 mb-4">Cómo Detectar Cada Situación</h4>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="font-semibold text-red-400 mb-3">Señales de Underfitting:</p>
          <ul className="list-disc list-inside text-sm space-y-2 text-gray-400">
            <li>Baja precisión en entrenamiento (&lt;70%)</li>
            <li>Baja precisión en validación</li>
            <li>Modelo demasiado simple</li>
          </ul>
          <div className="mt-4 bg-cyan-500/10 rounded-lg p-3">
            <p className="text-xs text-cyan-400">💡 Soluciones: Más capas, más características, más épocas</p>
          </div>
        </div>
        <div>
          <p className="font-semibold text-yellow-400 mb-3">Señales de Overfitting:</p>
          <ul className="list-disc list-inside text-sm space-y-2 text-gray-400">
            <li>Alta precisión en entrenamiento (&gt;95%)</li>
            <li>Baja precisión en validación</li>
            <li>Brecha grande &gt;10-15%</li>
          </ul>
          <div className="mt-4 bg-cyan-500/10 rounded-lg p-3">
            <p className="text-xs text-cyan-400">💡 Soluciones: Más datos, regularización, dropout, early stopping</p>
          </div>
        </div>
      </div>
    </div>

    <h4 className="font-semibold text-purple-400 mt-6">Técnicas para Combatir Overfitting</h4>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <h5 className="font-semibold text-cyan-400 mb-3">Regularización L1 y L2</h5>
        <p className="text-sm text-gray-400 mb-3">Agrega un "costo" a los pesos grandes del modelo</p>
        <div className="bg-black/50 rounded-lg p-3 font-mono text-xs">
          <p className="text-gray-400"># L1 (Lasso): Tiende a llevar pesos a CERO</p>
          <p className="text-gray-400"># L2 (Ridge): Reduce pesos proporcionalmente</p>
        </div>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <h5 className="font-semibold text-purple-400 mb-3">Dropout</h5>
        <p className="text-sm text-gray-400 mb-3">"Apaga" aleatoriamente neuronas durante entrenamiento</p>
        <div className="bg-black/50 rounded-lg p-3 font-mono text-xs">
          <p className="text-gray-400"># Valores típicos: 0.2-0.5 (20-50%)</p>
          <p className="text-gray-400"># Evita dependencia excesiva de neuronas</p>
        </div>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <h5 className="font-semibold text-pink-400 mb-3">Early Stopping</h5>
        <p className="text-sm text-gray-400 mb-3">Detener entrenamiento cuando validación deja de mejorar</p>
        <div className="bg-black/50 rounded-lg p-3 font-mono text-xs">
          <p className="text-gray-400"># Guarda el modelo en el mejor punto</p>
          <p className="text-gray-400"># Evita seguir entrenando cuando empieza overfitting</p>
        </div>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <h5 className="font-semibold text-green-400 mb-3">Data Augmentation</h5>
        <p className="text-sm text-gray-400 mb-3">Crear variaciones sintéticas de los datos</p>
        <div className="bg-black/50 rounded-lg p-3 font-mono text-xs">
          <p className="text-gray-400"># Imágenes: rotar, voltear, cambiar brillo</p>
          <p className="text-gray-400"># Texto: sinónimos, back-translation</p>
        </div>
      </div>
    </div>
  </div>
);

const c2t6Quiz: QuizQuestion[] = [
  {
    question: "¿Qué indica el overfitting?",
    options: [
      "El modelo no aprende nada",
      "Alta precisión en entrenamiento pero baja en validación",
      "El modelo es demasiado simple",
      "Faltan datos de entrenamiento"
    ],
    correct: 1,
    explanation: "Overfitting ocurre cuando el modelo memoriza los datos de entrenamiento (alta precisión) pero no generaliza bien a datos nuevos (baja precisión en validación)."
  },
  {
    question: "¿Qué hace el Dropout?",
    options: [
      "Elimina datos del dataset",
      "Apaga aleatoriamente neuronas durante entrenamiento",
      "Detiene el entrenamiento temprano",
      "Aumenta la tasa de aprendizaje"
    ],
    correct: 1,
    explanation: "Dropout apaga aleatoriamente un porcentaje de neuronas durante el entrenamiento, forzando al modelo a no depender demasiado de neuronas específicas."
  },
  {
    question: "¿Cuál es el objetivo ideal?",
    options: [
      "Overfitting con 100% de precisión",
      "Buen ajuste que generaliza bien",
      "Underfitting simple",
      "Modelo con máxima complejidad"
    ],
    correct: 1,
    explanation: "El objetivo es un buen ajuste donde el modelo aprende los patrones generales y puede generalizar bien a datos nuevos, sin memorizar ni sub-ajustar."
  }
];

// Continuará con más temas...
// Continuación de App.tsx - Temas finales del Capítulo 2 y estructura principal

// Capítulo 2 - Tema 7 (Validación Cruzada)
const c2t7Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">Validación Cruzada: Tu Seguro de Calidad</h3>
    
    <div className="bg-gradient-to-r from-yellow-500/10 to-transparent border-l-4 border-yellow-400 p-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-yellow-400 mb-2">El Problema de la Validación Simple</h4>
          <p className="text-sm">Dividir datos 80/20 una sola vez puede dar una estimación poco confiable. ¿Y si la división fue "afortunada"? ¿Y si el 20% no representa bien la realidad?</p>
        </div>
      </div>
    </div>

    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
      <h4 className="font-semibold text-cyan-400 mb-4">Validación Cruzada K-Fold</h4>
      <p className="text-gray-300 mb-4">En lugar de 1 división, haces K divisiones (típicamente K=5 o K=10):</p>
      
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 w-16">Fold 1:</span>
          <div className="flex-1 h-8 bg-gray-800 rounded flex">
            <div className="flex-[4] bg-cyan-500/40 rounded-l flex items-center justify-center text-xs">Train (80%)</div>
            <div className="flex-1 bg-purple-500/60 rounded-r flex items-center justify-center text-xs">Val (20%)</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 w-16">Fold 2:</span>
          <div className="flex-1 h-8 bg-gray-800 rounded flex">
            <div className="flex-[3] bg-cyan-500/40 rounded-l flex items-center justify-center text-xs">Train</div>
            <div className="flex-1 bg-purple-500/60 flex items-center justify-center text-xs">Val</div>
            <div className="flex-1 bg-cyan-500/40 rounded-r flex items-center justify-center text-xs">Train</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 w-16">Fold 3:</span>
          <div className="flex-1 h-8 bg-gray-800 rounded flex">
            <div className="flex-[2] bg-cyan-500/40 rounded-l flex items-center justify-center text-xs">Train</div>
            <div className="flex-1 bg-purple-500/60 flex items-center justify-center text-xs">Val</div>
            <div className="flex-[2] bg-cyan-500/40 rounded-r flex items-center justify-center text-xs">Train</div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-green-500/10 rounded-lg p-4">
        <p className="text-sm text-green-400">✅ Promedio de K estimaciones → Más estable y confiable</p>
        <p className="text-sm text-green-400">✅ Desviación estándar → Medida de incertidumbre</p>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <h5 className="font-semibold text-cyan-400 mb-3">Stratified K-Fold</h5>
        <p className="text-sm text-gray-400 mb-2">Mantiene proporciones de clases en cada fold</p>
        <p className="text-xs text-gray-500">✅ Útil para clases desbalanceadas</p>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <h5 className="font-semibold text-purple-400 mb-3">Time Series Split</h5>
        <p className="text-sm text-gray-400 mb-2">Entrena con pasado, valida con futuro</p>
        <p className="text-xs text-gray-500">✅ Para datos temporales (ventas, acciones)</p>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <h5 className="font-semibold text-pink-400 mb-3">Leave-One-Out</h5>
        <p className="text-sm text-gray-400 mb-2">Cada muestra es validación una vez</p>
        <p className="text-xs text-gray-500">✅ Para muy pocos datos (&lt;100)</p>
      </div>
    </div>

    <div className="bg-gradient-to-r from-purple-500/10 to-transparent border-l-4 border-purple-400 p-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <Lightbulb className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-purple-400 mb-2">Cuándo NO Usar Validación Cruzada</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Datos masivos (&gt;1 millón): Una división 80/10/10 es suficiente</li>
            <li>Datos con dependencia temporal fuerte: Usar Time Series Split</li>
            <li>Datos con grupos naturales: Usar Group K-Fold</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const c2t7Quiz: QuizQuestion[] = [
  {
    question: "¿Cuál es la ventaja de K-Fold sobre una sola división?",
    options: [
      "Es más rápida",
      "Proporciona estimaciones más estables y confiables",
      "Usa menos datos",
      "No requiere entrenamiento"
    ],
    correct: 1,
    explanation: "K-Fold proporciona K estimaciones que se promedian, dando una medida más estable y confiable del rendimiento del modelo."
  },
  {
    question: "¿Qué validación usarías para datos temporales como ventas mensuales?",
    options: [
      "K-Fold aleatorio",
      "Stratified K-Fold",
      "Time Series Split",
      "Leave-One-Out"
    ],
    correct: 2,
    explanation: "Time Series Split es ideal para datos temporales porque respeta el orden cronológico: entrena con pasado y valida con futuro."
  },
  {
    question: "¿Cuándo NO es recomendable usar validación cruzada?",
    options: [
      "Con datasets pequeños",
      "Con datos masivos (&gt;1 millón)",
      "Con datos desbalanceados",
      "Con redes neuronales"
    ],
    correct: 1,
    explanation: "Con datos masivos (&gt;1 millón), una sola división 80/10/10 es suficiente y más rápida que K-Fold."
  }
];

// Capítulo 2 - Tema 8 (Hiperparámetros)
const c2t8Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">Optimización de Hiperparámetros: Ajuste Fino</h3>
    
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
      <h4 className="font-semibold text-purple-400 mb-4">Parámetros vs Hiperparámetros</h4>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-cyan-500/10 rounded-lg p-4">
          <p className="font-semibold text-cyan-400 mb-2">PARÁMETROS (la IA los aprende)</p>
          <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
            <li>Pesos de conexiones</li>
            <li>Coeficientes en regresión</li>
            <li>❌ No los eliges tú</li>
          </ul>
        </div>
        <div className="bg-purple-500/10 rounded-lg p-4">
          <p className="font-semibold text-purple-400 mb-2">HIPERPARÁMETROS (tú los eliges)</p>
          <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
            <li>Tasa de aprendizaje</li>
            <li>Número de capas</li>
            <li>✅ Los configuras ANTES</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
      <h4 className="font-semibold text-cyan-400 mb-4">Hiperparámetros Clave en Redes Neuronales</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-3">Hiperparámetro</th>
              <th className="text-left p-3">Valores típicos</th>
              <th className="text-left p-3">Efecto</th>
              <th className="text-left p-3">Consejo</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800">
              <td className="text-cyan-400 p-3">Tasa de aprendizaje</td>
              <td className="p-3">0.0001 - 0.1</td>
              <td className="p-3">Velocidad de convergencia</td>
              <td className="p-3">Empezar con 0.001</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="text-purple-400 p-3">Tamaño de lote</td>
              <td className="p-3">16, 32, 64, 128</td>
              <td className="p-3">Estabilidad vs velocidad</td>
              <td className="p-3">32-64 es buen inicio</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="text-pink-400 p-3">Neuronas por capa</td>
              <td className="p-3">10 - 1000</td>
              <td className="p-3">Capacidad del modelo</td>
              <td className="p-3">Empezar simple</td>
            </tr>
            <tr>
              <td className="text-green-400 p-3">Dropout rate</td>
              <td className="p-3">0.0 - 0.5</td>
              <td className="p-3">Regularización</td>
              <td className="p-3">0.2-0.3 para empezar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <h4 className="font-semibold text-purple-400 mt-6">Estrategias de Búsqueda</h4>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <h5 className="font-semibold text-cyan-400 mb-3">Grid Search</h5>
        <p className="text-sm text-gray-400 mb-3">Prueba TODAS las combinaciones en una cuadrícula</p>
        <div className="bg-cyan-500/10 rounded-lg p-3">
          <p className="text-xs text-cyan-400">✅ Encuentra el mejor en el grid</p>
          <p className="text-xs text-red-400">❌ Costo crece exponencialmente</p>
        </div>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <h5 className="font-semibold text-purple-400 mb-3">Random Search</h5>
        <p className="text-sm text-gray-400 mb-3">Muestrea combinaciones aleatorias</p>
        <div className="bg-purple-500/10 rounded-lg p-3">
          <p className="text-xs text-green-400">✅ Explora espacio más amplio</p>
          <p className="text-xs text-yellow-400">⚠ No garantiza óptimo</p>
        </div>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <h5 className="font-semibold text-pink-400 mb-3">Bayesian Optimization</h5>
        <p className="text-sm text-gray-400 mb-3">Usa resultados previos para guiar búsqueda</p>
        <div className="bg-pink-500/10 rounded-lg p-3">
          <p className="text-xs text-green-400">✅ Encuentra buenos valores con menos iteraciones</p>
          <p className="text-xs text-yellow-400">⚠ Más complejo de implementar</p>
        </div>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <h5 className="font-semibold text-green-400 mb-3">Búsqueda Manual</h5>
        <p className="text-sm text-gray-400 mb-3">Prueba y error con criterio</p>
        <div className="bg-green-500/10 rounded-lg p-3">
          <p className="text-xs text-cyan-400">✅ Desarrollas intuición</p>
          <p className="text-xs text-red-400">❌ Lento, no garantiza óptimo</p>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-400 p-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <Target className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-cyan-400 mb-2">Enfoque por Etapas Recomendado</h4>
          <ol className="list-decimal list-inside text-sm space-y-1">
            <li><strong>Exploración rápida:</strong> Random Search con 20-50 combinaciones (horas)</li>
            <li><strong>Refinamiento:</strong> Grid Search en rangos prometedores (días)</li>
            <li><strong>Validación final:</strong> Evaluar en conjunto de prueba no usado antes</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
);

const c2t8Quiz: QuizQuestion[] = [
  {
    question: "¿Cuál es la diferencia entre parámetros e hiperparámetros?",
    options: [
      "No hay diferencia",
      "Los parámetros los aprende la IA; los hiperparámetros los configuras tú",
      "Los hiperparámetros son más importantes",
      "Los parámetros son solo para redes neuronales"
    ],
    correct: 1,
    explanation: "Los parámetros (pesos, coeficientes) los aprende la IA durante el entrenamiento. Los hiperparámetros (tasa de aprendizaje, capas) los configuras ANTES del entrenamiento."
  },
  {
    question: "¿Qué estrategia explora el espacio más amplio con el mismo presupuesto?",
    options: [
      "Grid Search",
      "Random Search",
      "Búsqueda manual",
      "Ninguna"
    ],
    correct: 1,
    explanation: "Random Search explora un espacio más amplio porque no está limitado a una cuadrícula predefinida, permitiendo encontrar buenas combinaciones inesperadas."
  },
  {
    question: "¿Qué valor es recomendado para empezar con la tasa de aprendizaje?",
    options: [
      "0.1",
      "0.001",
      "1.0",
      "0.00001"
    ],
    correct: 1,
    explanation: "0.001 es un buen punto de partida para la tasa de aprendizaje. Se puede ajustar hacia arriba o abajo según el comportamiento del modelo."
  }
];

// Capítulo 2 - Tema 9 (Transfer Learning)
const c2t9Content = (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-cyan-400">Transfer Learning: Aprender de lo Ya Aprendido</h3>
    
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
      <h4 className="font-semibold text-purple-400 mb-4">Analogía del Políglota</h4>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-red-500/10 rounded-lg p-4">
          <p className="font-semibold text-red-400 mb-2">❌ Desde cero</p>
          <p className="text-sm text-gray-400">Aprender alemán desde cero: 2 años de estudio</p>
        </div>
        <div className="bg-green-500/10 rounded-lg p-4">
          <p className="font-semibold text-green-400 mb-2">✅ Con Transfer Learning</p>
          <p className="text-sm text-gray-400">Ya sabes inglés y neerlandés. Alemán comparte raíces → 6 meses</p>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-400 p-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <Lightbulb className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-cyan-400 mb-2">¿Qué es Transfer Learning?</h4>
          <p>Tomar un modelo pre-entrenado en una tarea grande y general, adaptarlo a tu tarea específica con pocos datos, obteniendo mejor rendimiento en menos tiempo.</p>
        </div>
      </div>
    </div>

    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
      <h4 className="font-semibold text-green-400 mb-4">¿Cuándo Usar Transfer Learning?</h4>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold text-green-400 mb-2">✅ Ideal cuando:</p>
          <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
            <li>Tienes pocos datos etiquetados (&lt;10,000)</li>
            <li>Tu tarea es similar a una bien estudiada</li>
            <li>Necesitas resultados rápidos</li>
            <li>Recursos computacionales limitados</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-red-400 mb-2">❌ Menos útil cuando:</p>
          <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
            <li>Tienes muchos datos etiquetados (&gt;100,000)</li>
            <li>Tu tarea es muy diferente</li>
            <li>Necesitas control total de arquitectura</li>
          </ul>
        </div>
      </div>
    </div>

    <h4 className="font-semibold text-purple-400 mt-6">Estrategias de Transfer Learning</h4>
    <div className="space-y-4">
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <h5 className="font-semibold text-cyan-400 mb-3">A) Feature Extraction</h5>
        <p className="text-sm text-gray-400 mb-3">Usar el modelo pre-entrenado como extractor de características</p>
        <div className="bg-black/50 rounded-lg p-3 font-mono text-xs">
          <p className="text-gray-400">1. Tomar modelo pre-entrenado</p>
          <p className="text-gray-400">2. Congelar todas las capas (no actualizar)</p>
          <p className="text-gray-400">3. Remover capa de salida original</p>
          <p className="text-gray-400">4. Agregar nueva capa para TU tarea</p>
          <p className="text-gray-400">5. Entrenar SOLO la nueva capa</p>
        </div>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl">
        <h5 className="font-semibold text-purple-400 mb-3">B) Fine-Tuning</h5>
        <p className="text-sm text-gray-400 mb-3">Ajustar capas finales del modelo pre-entrenado</p>
        <div className="bg-black/50 rounded-lg p-3 font-mono text-xs">
          <p className="text-gray-400">1. Tomar modelo pre-entrenado</p>
          <p className="text-gray-400">2. Congelar primeras 70-80% de capas</p>
          <p className="text-gray-400">3. Descongelar capas finales</p>
          <p className="text-gray-400">4. Entrenar con tasa de aprendizaje MUY baja</p>
        </div>
      </div>
    </div>

    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
      <h4 className="font-semibold text-pink-400 mb-4">Modelos Pre-entrenados Populares</h4>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-pink-500/10 rounded-lg p-4">
          <p className="font-semibold text-pink-400 mb-2">🖼 Para Imágenes</p>
          <p className="text-xs text-gray-400">ResNet50, EfficientNet, VGG16</p>
          <p className="text-xs text-gray-500 mt-1">Pre-entrenados en ImageNet (1.2M imágenes)</p>
        </div>
        <div className="bg-cyan-500/10 rounded-lg p-4">
          <p className="font-semibold text-cyan-400 mb-2">📝 Para Texto</p>
          <p className="text-xs text-gray-400">BERT, RoBERTa, DistilBERT</p>
          <p className="text-xs text-gray-500 mt-1">Pre-entrenados en miles de millones de palabras</p>
        </div>
        <div className="bg-purple-500/10 rounded-lg p-4">
          <p className="font-semibold text-purple-400 mb-2">📈 Para Series Temporales</p>
          <p className="text-xs text-gray-400">LSTM pre-entrenadas, TFT</p>
          <p className="text-xs text-gray-500 mt-1">Datos financieros, sensores IoT</p>
        </div>
      </div>
    </div>
  </div>
);

const c2t9Quiz: QuizQuestion[] = [
  {
    question: "¿Qué es Transfer Learning?",
    options: [
      "Transferir datos entre computadoras",
      "Usar un modelo pre-entrenado y adaptarlo a tu tarea",
      "Cambiar de algoritmo durante el entrenamiento",
      "Copiar pesos de un modelo a otro idéntico"
    ],
    correct: 1,
    explanation: "Transfer Learning consiste en tomar un modelo pre-entrenado en una tarea grande y adaptarlo a tu tarea específica con pocos datos."
  },
  {
    question: "¿Cuándo es ideal usar Transfer Learning?",
    options: [
      "Cuando tienes millones de datos etiquetados",
      "Cuando tienes pocos datos etiquetados",
      "Cuando tu tarea es completamente nueva",
      "Cuando necesitas crear un algoritmo desde cero"
    ],
    correct: 1,
    explanation: "Transfer Learning es ideal cuando tienes pocos datos etiquetados (&lt;10,000) pero tu tarea es similar a una bien estudiada."
  },
  {
    question: "¿Cuál es la diferencia entre Feature Extraction y Fine-Tuning?",
    options: [
      "No hay diferencia",
      "Feature Extraction congela todas las capas; Fine-Tuning ajusta algunas",
      "Feature Extraction es más lento",
      "Fine-Tuning requiere menos datos"
    ],
    correct: 1,
    explanation: "En Feature Extraction se congelan todas las capas y solo se entrena la nueva capa de salida. En Fine-Tuning se descongelan algunas capas finales para ajustarlas."
  }
];

// Estructura de capítulos
const chapters: Chapter[] = [
  {
    id: 'chapter1',
    number: 1,
    title: 'Fundamentos de IA Predictiva',
    description: 'Conceptos esenciales, tipos de sistemas, beneficios y retos de la IA predictiva en el mundo empresarial.',
    topics: [
      { id: 'c1-t1', title: '1. Introducción a la Inteligencia Artificial', content: c1t1Content, quiz: c1t1Quiz },
      { id: 'c1-t2', title: '2. ¿Cómo Aprenden los Sistemas de IA?', content: c1t2Content, quiz: c1t2Quiz },
      { id: 'c1-t3', title: '3. Tipos de Sistemas de IA', content: c1t3Content, quiz: c1t3Quiz },
      { id: 'c1-t4', title: '4. Problemas de Negocio que Resuelve la IA', content: c1t4Content, quiz: c1t4Quiz },
      { id: 'c1-t5', title: '5. Factores de Negocio Clave', content: c1t5Content, quiz: c1t5Quiz },
      { id: 'c1-t6', title: '6. Factores Tecnológicos Habilitadores', content: c1t6Content, quiz: c1t6Quiz },
      { id: 'c1-t7', title: '7. Beneficios de la IA Predictiva', content: c1t7Content, quiz: c1t7Quiz },
      { id: 'c1-t8', title: '8. Retos y Riesgos Comunes', content: c1t8Content, quiz: c1t8Quiz },
      { id: 'c1-t9', title: '9. Tipos de Sistemas de IA Predictiva', content: c1t9Content, quiz: c1t9Quiz },
      { id: 'c1-t10', title: '10. Diseños Funcionales de IA', content: c1t10Content, quiz: c1t10Quiz },
      { id: 'c1-t11', title: '11. Fundamentos de los Datos', content: c1t11Content, quiz: c1t11Quiz },
      { id: 'c1-t12', title: '12. Modelos, Algoritmos y Redes Neuronales', content: c1t12Content, quiz: c1t12Quiz },
      { id: 'c1-t13', title: '13. Redes Neuronales: FFNN, CNN y RNN', content: c1t13Content, quiz: c1t13Quiz },
      { id: 'c1-t14', title: '14. Cómo Construir Sistemas de IA Predictiva', content: c1t14Content, quiz: c1t14Quiz },
      { id: 'c1-t15', title: '15. Buenas Prácticas', content: c1t15Content, quiz: c1t15Quiz }
    ],
    finalExam: [
      {
        question: "¿Cuál es la definición fundamental de Inteligencia Artificial?",
        options: [
          "Sistemas que siguen instrucciones programadas paso a paso",
          "Campo de estudio que busca que computadoras imiten el funcionamiento del cerebro humano",
          "Computadoras con mayor capacidad de procesamiento",
          "Bases de datos avanzadas para almacenar información"
        ],
        correct: 1,
        explanation: "La IA es el campo de estudio que busca que las computadoras imiten el funcionamiento del cerebro humano, permitiéndoles aprender sin ser programadas explícitamente."
      },
      {
        question: "¿Cuál es la principal diferencia entre IA Predictiva e IA Generativa?",
        options: [
          "La Predictiva es más moderna",
          "La Predictiva analiza datos pasados para predecir; la Generativa crea contenido nuevo",
          "La Generativa es más cara de implementar",
          "No hay diferencia significativa entre ellas"
        ],
        correct: 1,
        explanation: "La IA Predictiva analiza datos históricos para hacer predicciones, mientras que la IA Generativa crea contenido completamente nuevo como imágenes, texto o música."
      },
      {
        question: "¿Qué son los tres componentes clave del aprendizaje en IA?",
        options: [
          "Hardware, software y datos",
          "Algoritmo, modelo y datos de entrenamiento",
          "Input, proceso y output",
          "CPU, GPU y RAM"
        ],
        correct: 1,
        explanation: "Los tres componentes clave son: el Algoritmo (la receta), el Modelo (el cerebro resultante) y los Datos de Entrenamiento (la comida que alimenta el aprendizaje)."
      },
      {
        question: "¿Cuál de estos NO es uno de los 5 problemas de negocio que resuelve la IA Predictiva?",
        options: [
          "Análisis complejo de grandes volúmenes de datos",
          "Creación de contenido artístico original",
          "Reconocimiento gráfico de imágenes",
          "Predicciones y pronósticos de comportamientos"
        ],
        correct: 1,
        explanation: "La creación de contenido artístico original es una capacidad de la IA Generativa, no de la IA Predictiva."
      },
      {
        question: "¿Qué factor tecnológico hizo posible la IA moderna al democratizar el acceso a potencia computacional?",
        options: [
          "El desarrollo de nuevos lenguajes de programación",
          "La infraestructura en la nube (AWS, Google Cloud, Azure)",
          "La invención del transistor",
          "El aumento de velocidad de internet"
        ],
        correct: 1,
        explanation: "La infraestructura en la nube permitió que cualquier startup acceda a la misma potencia computacional que grandes empresas, pagando solo por lo que usa."
      }
    ]
  },
  {
    id: 'chapter2',
    number: 2,
    title: 'IA Predictiva Avanzada',
    description: 'Técnicas avanzadas de aprendizaje, preprocesamiento, evaluación, validación y optimización de modelos.',
    topics: [
      { id: 'c2-t1', title: '1. Repaso del Capítulo 1', content: c2t1Content, quiz: c2t1Quiz },
      { id: 'c2-t2', title: '2. Tipos de Aprendizaje', content: c2t2Content, quiz: c2t2Quiz },
      { id: 'c2-t3', title: '3. El Poder de las Etiquetas', content: c2t3Content, quiz: c2t3Quiz },
      { id: 'c2-t4', title: '4. Preprocesamiento de Datos', content: c2t4Content, quiz: c2t4Quiz },
      { id: 'c2-t5', title: '5. Métricas de Evaluación', content: c2t5Content, quiz: c2t5Quiz },
      { id: 'c2-t6', title: '6. Overfitting y Underfitting', content: c2t6Content, quiz: c2t6Quiz },
      { id: 'c2-t7', title: '7. Validación Cruzada', content: c2t7Content, quiz: c2t7Quiz },
      { id: 'c2-t8', title: '8. Optimización de Hiperparámetros', content: c2t8Content, quiz: c2t8Quiz },
      { id: 'c2-t9', title: '9. Transfer Learning', content: c2t9Content, quiz: c2t9Quiz }
    ],
    finalExam: [
      {
        question: "¿Cuál es la principal diferencia entre aprendizaje supervisado y no supervisado?",
        options: [
          "La velocidad de entrenamiento",
          "La presencia o ausencia de etiquetas en los datos",
          "El tipo de algoritmo utilizado",
          "El tamaño del dataset requerido"
        ],
        correct: 1,
        explanation: "El aprendizaje supervisado usa datos con etiquetas (respuestas correctas), mientras que el no supervisado encuentra patrones sin etiquetas previas."
      },
      {
        question: "¿Qué significa 'Basura entra, basura sale' (Garbage In, Garbage Out)?",
        options: [
          "Hay que limpiar físicamente los datos",
          "La calidad de las etiquetas determina la calidad del modelo",
          "Los datos deben ser de color gris",
          "La IA funciona mejor con datos desordenados"
        ],
        correct: 1,
        explanation: "Significa que si usamos etiquetas de mala calidad, el modelo aprenderá patrones incorrectos y tendrá mal rendimiento."
      },
      {
        question: "¿Cuál métrica es más importante cuando los Falsos Negativos tienen consecuencias graves?",
        options: [
          "Precisión (Precision)",
          "Recall (Exhaustividad)",
          "Accuracy",
          "F1-Score"
        ],
        correct: 1,
        explanation: "El Recall (Exhaustividad) es crucial cuando los Falsos Negativos son graves, como no detectar una enfermedad o un fraude."
      },
      {
        question: "¿Qué indica que un modelo está sufriendo de overfitting?",
        options: [
          "Baja precisión tanto en entrenamiento como en validación",
          "Alta precisión en entrenamiento pero baja en validación",
          "El modelo es demasiado simple",
          "Faltan datos de entrenamiento"
        ],
        correct: 1,
        explanation: "Overfitting ocurre cuando el modelo memoriza los datos de entrenamiento (alta precisión) pero no generaliza bien a datos nuevos (baja precisión en validación)."
      },
      {
        question: "¿Cuál es la ventaja principal de la validación cruzada K-Fold?",
        options: [
          "Es más rápida que una sola división",
          "Proporciona estimaciones más estables y confiables del rendimiento",
          "Usa menos datos para entrenamiento",
          "No requiere dividir los datos"
        ],
        correct: 1,
        explanation: "K-Fold proporciona K estimaciones que se promedian, dando una medida más estable y confiable del rendimiento del modelo."
      }
    ]
  }
];

// Componente principal
function App() {
  const [currentView, setCurrentView] = useState<'home' | 'chapter' | 'topic'>('home');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(new Set());
  const [showFinalExam, setShowFinalExam] = useState(false);
  const [examScore, setExamScore] = useState<number | null>(null);

  const handleTopicComplete = (topicId: string) => {
    setCompletedTopics(prev => new Set([...prev, topicId]));
  };

  const handleChapterComplete = (chapterId: string) => {
    setCompletedChapters(prev => new Set([...prev, chapterId]));
    setShowFinalExam(false);
    setExamScore(null);
  };

  const selectChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setCurrentView('chapter');
  };

  const selectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentView('topic');
  };

  const goHome = () => {
    setCurrentView('home');
    setSelectedChapter(null);
    setSelectedTopic(null);
    setShowFinalExam(false);
    setExamScore(null);
  };

  const goBack = () => {
    if (currentView === 'topic') {
      setCurrentView('chapter');
      setSelectedTopic(null);
    } else if (currentView === 'chapter') {
      setCurrentView('home');
      setSelectedChapter(null);
    }
  };

  const getTopicProgress = (chapter: Chapter) => {
    const completed = chapter.topics.filter(t => completedTopics.has(t.id)).length;
    return (completed / chapter.topics.length) * 100;
  };

  const getChapterProgress = (chapter: Chapter) => {
    const completedTopicsCount = chapter.topics.filter(t => completedTopics.has(t.id)).length;
    const hasCompletedExam = completedChapters.has(chapter.id);
    const totalItems = chapter.topics.length + 1;
    const completedItems = completedTopicsCount + (hasCompletedExam ? 1 : 0);
    return (completedItems / totalItems) * 100;
  };

  const getOverallProgress = () => {
    const totalItems = chapters.reduce((acc, c) => acc + c.topics.length + 1, 0);
    const completedItems = completedTopics.size + completedChapters.size;
    return (completedItems / totalItems) * 100;
  };

  // Renderizar vista de inicio
  const renderHome = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)'
      }}
    >
      {/* Grid Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Hero Section */}
      <div className="relative z-10 pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Brain className="w-20 h-20 text-cyan-400" />
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter" style={{ textShadow: '0 0 40px rgba(6, 182, 212, 0.6)' }}>
              NAR<span className="text-purple-500 italic">VAR</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Curso completo de fundamentos a técnicas avanzadas de Inteligencia Artificial Predictiva
            </p>
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 p-6 rounded-2xl max-w-md mx-auto mb-12"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Progreso General</span>
              <span className="text-cyan-400 font-bold">{Math.round(getOverallProgress())}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all"
                style={{ 
                  width: `${getOverallProgress()}%`,
                  background: 'linear-gradient(90deg, #06b6d4, #a855f7, #ec4899)'
                }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-3">
              {completedTopics.size + completedChapters.size} de {chapters.reduce((acc, c) => acc + c.topics.length + 1, 0)} pasos completados
            </p>
          </motion.div>
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="relative z-10 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Contenido del Curso
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                onClick={() => selectChapter(chapter)}
                className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 cursor-pointer transition-all hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10"
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                <div 
                  className="absolute top-0 left-0 w-full h-1"
                  style={{ background: 'linear-gradient(90deg, #06b6d4, #a855f7, #ec4899)' }}
                />
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold"
                    style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
                  >
                    {chapter.number}
                  </div>
                  {completedChapters.has(chapter.id) && (
                    <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      <span>Completado</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{chapter.title}</h3>
                <p className="text-gray-400 mb-6">{chapter.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BookOpen className="w-4 h-4" />
                    <span>{chapter.topics.length} temas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-cyan-400">
                      {Math.round(getChapterProgress(chapter))}%
                    </span>
                    <ChevronRight className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                  <div 
                    className="h-2 rounded-full transition-all"
                    style={{ 
                      width: `${getChapterProgress(chapter)}%`,
                      background: 'linear-gradient(90deg, #06b6d4, #a855f7)'
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2024 IA Predictiva Avanzada - Curso Interactivo</p>
        </div>
      </footer>
    </motion.div>
  );

  // Renderizar vista de capítulo
  const renderChapter = () => {
    if (!selectedChapter) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen"
        style={{
          background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)'
        }}
      >
        {/* Grid Overlay */}
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Header */}
        <header className="relative z-10 border-b border-gray-800 bg-black/50 backdrop-blur-lg sticky top-0">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={goBack}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <p className="text-sm text-gray-500">Capítulo {selectedChapter.number}</p>
                <h1 className="text-xl font-bold">{selectedChapter.title}</h1>
              </div>
            </div>
            <button 
              onClick={goHome}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="relative z-10 px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 p-6 rounded-2xl mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Progreso del Capítulo</h2>
                <span className="text-cyan-400 font-bold">
                  {Math.round(getChapterProgress(selectedChapter))}% Completado
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all"
                  style={{ 
                    width: `${getChapterProgress(selectedChapter)}%`,
                    background: 'linear-gradient(90deg, #06b6d4, #a855f7)'
                  }}
                />
              </div>
            </div>

            <div className="space-y-3">
              {selectedChapter.topics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => selectTopic(topic)}
                  className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all hover:bg-gray-800/50 ${
                    completedTopics.has(topic.id) ? 'border-l-4 border-green-500 bg-green-500/5' : 'border border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      completedTopics.has(topic.id) 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-cyan-500/20 text-cyan-400'
                    }`}>
                      {completedTopics.has(topic.id) ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="font-bold">{index + 1}</span>
                      )}
                    </div>
                    <span className="font-medium">{topic.title}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </motion.div>
              ))}
            </div>

            {/* Final Exam Button */}
            {getTopicProgress(selectedChapter) === 100 && !completedChapters.has(selectedChapter.id) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <button 
                  onClick={() => setShowFinalExam(true)}
                  className="w-full py-4 px-6 rounded-xl text-lg font-semibold text-white transition-all hover:shadow-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)'
                  }}
                >
                  <Award className="w-6 h-6 inline mr-2" />
                  Realizar Examen Final del Capítulo
                </button>
              </motion.div>
            )}

            {completedChapters.has(selectedChapter.id) && (
              <div className="mt-8 bg-gray-800/50 border border-green-500/30 p-6 rounded-2xl text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-400 mb-2">¡Capítulo Completado!</h3>
                <p className="text-gray-400">Has aprobado el examen final de este capítulo.</p>
              </div>
            )}
          </div>
        </main>

        {/* Final Exam Dialog */}
        {showFinalExam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="bg-gray-800/90 backdrop-blur-xl border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-cyan-400">
                  Examen Final - {selectedChapter.title}
                </h2>
                <button 
                  onClick={() => setShowFinalExam(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {examScore === null ? (
                <QuizComponent 
                  questions={selectedChapter.finalExam} 
                  onComplete={(score) => setExamScore(score)}
                />
              ) : (
                <div className="text-center py-8">
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
                  >
                    <span className="text-3xl font-bold">{examScore}/{selectedChapter.finalExam.length}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {examScore >= selectedChapter.finalExam.length * 0.7 ? (
                      <span className="text-green-400">¡Aprobado!</span>
                    ) : (
                      <span className="text-yellow-400">Sigue practicando</span>
                    )}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {examScore >= selectedChapter.finalExam.length * 0.7 
                      ? 'Has demostrado un buen dominio de los conceptos.' 
                      : 'Revisa los temas y vuelve a intentarlo.'}
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button 
                      onClick={() => {
                        if (examScore >= selectedChapter.finalExam.length * 0.7) {
                          handleChapterComplete(selectedChapter.id);
                        } else {
                          setExamScore(null);
                        }
                      }}
                      className="py-3 px-6 rounded-lg text-white font-semibold transition-all hover:shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
                    >
                      {examScore >= selectedChapter.finalExam.length * 0.7 ? 'Continuar' : 'Reintentar'}
                    </button>
                    {examScore >= selectedChapter.finalExam.length * 0.7 && (
                      <button 
                        onClick={() => setShowFinalExam(false)}
                        className="py-3 px-6 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"
                      >
                        Cerrar
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  // Renderizar vista de tema
  const renderTopic = () => {
    if (!selectedTopic || !selectedChapter) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen"
        style={{
          background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)'
        }}
      >
        {/* Grid Overlay */}
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Header */}
        <header className="relative z-10 border-b border-gray-800 bg-black/50 backdrop-blur-lg sticky top-0">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={goBack}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="hidden md:block">
                <p className="text-sm text-gray-500">{selectedChapter.title}</p>
                <h1 className="text-lg font-bold truncate max-w-md">{selectedTopic.title}</h1>
              </div>
            </div>
            <button 
              onClick={goHome}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="relative z-10 px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 p-8 rounded-2xl"
            >
              <h1 
                className="text-3xl font-bold mb-8 text-center"
                style={{ 
                  background: 'linear-gradient(90deg, #06b6d4, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {selectedTopic.title}
              </h1>
              
              <div className="prose prose-invert max-w-none">
                {selectedTopic.content}
              </div>
            </motion.div>

            {/* Quiz */}
            {!completedTopics.has(selectedTopic.id) && (
              <QuizComponent 
                questions={selectedTopic.quiz} 
                onComplete={(score) => {
                  if (score >= selectedTopic.quiz.length * 0.7) {
                    handleTopicComplete(selectedTopic.id);
                  }
                }}
              />
            )}

            {completedTopics.has(selectedTopic.id) && (
              <div className="bg-gray-800/50 border border-green-500/30 p-6 rounded-2xl mt-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-green-400">¡Tema Completado!</h3>
                <p className="text-gray-400 mt-2">Has aprobado la evaluación de este tema.</p>
                <button 
                  onClick={goBack}
                  className="mt-4 py-3 px-6 rounded-lg text-white font-semibold transition-all hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
                >
                  Volver al Capítulo
                </button>
              </div>
            )}
          </div>
        </main>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen text-white relative">
      {/* Navbar Premium */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/40 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={goHome}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center border border-white/20 shadow-lg shadow-cyan-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter">NAR<span className="text-purple-500 italic">VAR</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-1">Tu Progreso</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500"
                    style={{ width: `${getOverallProgress()}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-cyan-400 font-bold">{Math.round(getOverallProgress())}%</span>
              </div>
            </div>
            <button 
              onClick={goHome}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
            >
              Panel Principal
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentView === 'home' && renderHome()}
        {currentView === 'chapter' && renderChapter()}
        {currentView === 'topic' && renderTopic()}
      </AnimatePresence>
    </div>
  );
}

export default App;
