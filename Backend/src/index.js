
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar Express e Prisma
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middlewares globais
app.use(helmet()); // Segurança
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rota de teste
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Servidor do Condomínio rodando!',
        timestamp: new Date().toISOString()
    });
});

// Rota de teste do banco
app.get('/api/db-test', async (req, res) => {
    try {
        // Teste simples de conexão
        const userCount = await prisma.user.count();
        res.json({ 
            status: 'OK', 
            message: 'Banco conectado com sucesso!',
            userCount: userCount
        });
    } catch (error) {
        console.error('Erro no banco:', error);
        res.status(500).json({ 
            status: 'ERROR', 
            message: 'Erro na conexão com banco',
            error: error.message
        });
    }
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        status: 'ERROR', 
        message: 'Algo deu errado!' 
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🗄️  Database test: http://localhost:${PORT}/api/db-test`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Encerrando servidor...');
    await prisma.$disconnect();
    process.exit(0);
});