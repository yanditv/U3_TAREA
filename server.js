const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config');
const db = require('./db');
const routes = require('./network/routes');

const app = express();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración de CORS
app.use(cors({
    origin: 'http://127.0.0.1:5500', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Habilitar cookies para el origen
}));

// Conectar a la base de datos
db(config.DB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Usuarios',
            version: '1.0.0',
            description: 'APIs para gestionar usuarios',
        },
        servers: [
            {
                url: `http://localhost:${config.PORT}`,
                description: 'Servidor local',
            },
        ],
    },
    apis: ['./components/usuario/interface.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', express.static('public'));

routes(app);

// Iniciar el servidor
app.listen(config.PORT, () => {
    console.log(`La aplicación se encuentra arriba en http://localhost:${config.PORT}/`);
    console.log(`Documentación Swagger disponible en http://localhost:${config.PORT}/api-docs`);
});
