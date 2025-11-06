import { motion } from "framer-motion";

export default function V2() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center text-white p-10">
      <motion.div
        className="max-w-3xl text-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold mb-4">🚀 Bienvenido a la Versión 2</h1>
        <p className="text-lg mb-6">
          Esta es una página completamente independiente, donde puedes hacer pruebas o desarrollar otra interfaz sin afectar la principal.
        </p>
        <a
          href="/"
          className="bg-white text-purple-700 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          Volver a la principal
        </a>
      </motion.div>
    </div>
  );
}
