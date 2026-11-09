# DinDin — Bot de controle financeiro

Bot do Telegram para registrar despesas, organizar categorias e lembrar os usuários de pagamentos. As despesas confirmadas também podem ser enviadas a um grupo do Telegram.

## Funcionalidades

- Registra despesas recorrentes ou ocasionais, com descrição, valor, categoria e datas.
- Aceita fotos ou documentos como comprovantes.
- Lista as despesas pagas no mês atual.
- Permite criar lembretes para um dia do mês e envia avisos no grupo configurado.
- Usa tópicos de um grupo com fórum como categorias de despesas.
- Restringe os comandos a nomes de usuário do Telegram autorizados.

## Requisitos

- Node.js 20.6 ou superior e npm.
- Um bot do Telegram e o respectivo token.
- Para execução com PostgreSQL: Docker Compose ou uma instância PostgreSQL acessível.
- Um supergrupo do Telegram com tópicos ativados para receber registros organizados por categoria.

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
# Telegram
TOKEN=seu_token_do_bot
USERS=usuario1,usuario2
CHATID=chat_id_do_seu_grupo

# Expressão cron do node-schedule (exemplo: todos os dias às 09:00)
RULE=0 9 * * *

# URLs usadas para buscar e baixar comprovantes do Telegram.
# Mantenha os marcadores TELEGRAM_TOKEN, FILEID e PATH.
GETFILEINFO=https://api.telegram.org/botTELEGRAM_TOKEN/getFile?file_id=FILEID
GETFILEURL=https://api.telegram.org/file/botTELEGRAM_TOKEN/PATH

# Banco de dados: development usa SQLite; staging/production usam PostgreSQL.
ENVIRONMENT=development
DATABASE=financial_bot
DBUSER=postgres
DBPASSWORD=senha
DBPORT=5432
DBHOST=localhost
DATABASEURL=
```

`USERS` é uma lista separada por vírgulas de nomes de usuário do Telegram, sem `@`. `CHATID` é o identificador do grupo para o envio de mensagens. As variáveis `GETFILEINFO` e `GETFILEURL` são necessárias para processar comprovantes.

Para usar PostgreSQL, defina `ENVIRONMENT` como `staging` ou `production` e preencha as configurações do banco. `DATABASEURL` pode ser usada como connection string; as demais variáveis de conexão também são lidas pelo Knex. Na execução via Docker Compose, configure `DBHOST=postgresdb`.

## Executar localmente

```bash
npm install
npm start
```

O ambiente `development` usa SQLite no arquivo `dev.sqlite3`. Ao iniciar, a aplicação aplica automaticamente as migrations do Knex.

Para desenvolvimento com reinicialização automática:

```bash
npm run dev
```

## Executar com Docker Compose

Configure o `.env` para PostgreSQL, incluindo `ENVIRONMENT=production`, `DBHOST=postgresdb` e `DBPORT=5432`. Em seguida, execute:

```bash
docker compose up --build
```

O Compose inicia o PostgreSQL e a aplicação. Para encerrar os serviços:

```bash
docker compose down
```

## Uso no Telegram

- Envie `/start` para ver as instruções do bot.
- Envie `/novo` para registrar uma despesa.
- Envie `/lembrete` para criar um lembrete.
- Envie `/pago` ou uma mensagem contendo “pago” ou “paguei” para listar os pagamentos do mês.
- Envie uma foto ou documento para iniciar o registro de uma despesa com comprovante.

Para organizar despesas por categoria no grupo, crie tópicos no fórum do supergrupo. O bot registra os tópicos como categorias; adicione-o ao grupo com as permissões necessárias para enviar mensagens e fixar mensagens.
