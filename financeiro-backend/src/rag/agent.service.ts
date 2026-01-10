import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { SqlDatabase } from "langchain/sql_db";
import { createSqlAgent, SqlToolkit } from 'langchain/agents/toolkits/sql';
import { BufferMemory } from 'langchain/memory';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatPromptTemplate, MessagesPlaceholder, PromptTemplate } from '@langchain/core/prompts';

export class AgentService {
  private agentExecutor: Awaited<ReturnType<typeof createSqlAgent>>;
  private configService: ConfigService;
  private memoryBuffer: BufferMemory;
  private chain: RunnableSequence;
  private dbSchema: string;

  constructor(configService: ConfigService, promptTemplate: string) {
    this.memoryBuffer = new BufferMemory({
      memoryKey: 'chat_history',
      returnMessages: true,
    });

    this.configService = configService;
  }

  async init(promptTemplate: string) {
    const datasource = new DataSource({
      type: 'mysql',
      database: this.configService.get('DB_NAME'),
      username: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASSWORD'),
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      synchronize: true,
    });

    const db = await SqlDatabase.fromDataSourceParams({ appDataSource: datasource });

    const model = new ChatOpenAI({
      temperature: 0,
      modelName: 'gpt-3.5-turbo',
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const toolkit = new SqlToolkit(db, model);
    this.agentExecutor = createSqlAgent(model, toolkit);

    this.dbSchema = await db.getTableInfo();

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', `Você é um assistente especializado em responder perguntas sobre este banco de dados:\n\n{schema}\n\nSeja claro e conciso. Sua tarefa é: {promptTemplate}, se clientId: {clientId} representar um inteiro maior que 0 filtre as respostas apenas pelas transações, categorias, centros de custo e contas bancárias desse cliente. A sua resposta tem que ser objetivo e não expor detalhes do banco de dados de forma alguma, isso inclui expor o id do cliente em questão caso você esteja filtrando por um, não retorne por exemplo "clienteID: 1", a resposta deve conter apenas o que foi perguntado e não passar nenhum tipo de instrução para que o usuário chegue a resposta.`],
      new MessagesPlaceholder('chat_history'),
      ['human', '{input}'],
    ]);

    this.chain = RunnableSequence.from([
      async (input: { input: string, clientId: string }) => {
        console.log(input)
        const chat_history = await this.memoryBuffer
          .loadMemoryVariables({})
          .then((vars) => vars.chat_history || []);
        return {
          input: input.input,
          clientId: input.clientId,
          schema: this.dbSchema,
          chat_history,
          promptTemplate
        };
      },
      prompt,
      model,
    ]);
  }

  async ask(input: string, clientId: string): Promise<string> {
    const response = await this.chain.invoke({ input, clientId });

    await this.memoryBuffer.saveContext(
      { input },
      { output: response.content }
    );

    return response.content;
  }

  async classify(description: string, categories: string[]): Promise<string> {
    const categoriesToString = categories.join(',');

    const input = PromptTemplate.fromTemplate(`Com base nos registros já existentes do tabela de transações e nessa descrição: ${description}, em quais das seguintes categorias a transação sem enquandra: ${categoriesToString}, responda apenas o nome da categoria, apenas uma única palavra, a resposta deve ser uma das categorias contidas em ${categoriesToString}.`)
    const response = await this.chain.invoke({ input });

    return response.content.trim();
  }
}
