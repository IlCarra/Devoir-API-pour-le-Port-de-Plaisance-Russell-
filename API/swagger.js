const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json'; // Dove verrà salvato il file swagger.json generato
const endpointsFiles = ['./routes/index.js', './routes/users.js', './routes/catway.js']; // I tuoi file di route

const doc = {
    openapi: '3.1.0',
    info: {
        title: 'API del Port de Plaisance di Russell',
        version: '1.0.0',
        description: 'Documentation de l\'API de Gestion du Port de Plaisance de Russell',
    },
    servers: [
        {
            url: 'http://localhost:3000',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Insert your JWT token'
            },
        },
    },
};

swaggerAutogen(outputFile, endpointsFiles, doc);