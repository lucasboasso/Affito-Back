const mongoose = require("mongoose");

let isConnected = null; // Variable para almacenar la conexión activa

const connectDB = async () => {
    if (isConnected) {
        console.log("Reutilizando conexión existente a MongoDB");
        return isConnected; // Retorna la conexión existente si ya está activa
    }

    mongoose.set("strictQuery", true);

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = conn.connection; // Almacena la conexión activa
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return isConnected; // Retorna la conexión establecida
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1); // Finaliza la aplicación si hay un error
    }
};

module.exports = connectDB;