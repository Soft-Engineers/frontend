module.exports = {
    // Las rutas donde Jest busca archivos de prueba
    roots: ["<rootDir>/public/tests"],

    // Transforma archivos .js utilizando Babel y excluye node_modules
    transform: {
        "^.+\\.js$": "babel-jest"
    },

};