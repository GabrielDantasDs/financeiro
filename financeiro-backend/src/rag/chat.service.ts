import { SqlDatabase } from 'langchain/sql_db';
import { DataSource } from 'typeorm';
import { Annotation, AnnotationRoot, MessagesAnnotation, START, END, MemorySaver } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StateGraph } from '@langchain/langgraph';
import { AIMessage, BaseMessage, HumanMessage, MessageContent } from '@langchain/core/messages';
import { createSqlAgent, SqlToolkit } from 'langchain/agents/toolkits/sql';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import mysql from 'mysql2/promise';
import { AgentExecutor } from 'node_modules/langchain/dist/agents/executor';
import { throws } from 'assert';
import { AgentService } from './agent.service';

@Injectable()
export class ChatService {
  private conversationHistory: BaseMessage[] = [];
  private formated_input!: { question: string };
  private datasource: DataSource;
  private db: SqlDatabase;
  private queryPromptTemplate!: ChatPromptTemplate;
  private input!: string;
  private model: ChatOpenAI;
  private messages: BaseMessage[];
  private stateNotation: AnnotationRoot<any>;
  private template: MessageContent = 'Seja gentil';
  private config: any;
  private memorySave: any;
  private toolkit: SqlToolkit;
  private agent: AgentService;

  /**
   * Você é um assistente de IA especializado em responder perguntas sobre o sistema financeiro. Você deve responder com base nas informações disponíveis no banco de dados. Se não souber a resposta, diga que não sabe. Você pode fazer perguntas adicionais para obter mais informações se necessário.
   *
   */

  constructor(private configService: ConfigService) {
    this.datasource = new DataSource({
      type: 'mysql',
      database: this.configService.get('DB_NAME'),
      username: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASSWORD'),
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      synchronize: true,
    });

    this.model = new ChatOpenAI({
      model: 'gpt-4o-mini',
      temperature: 0,
    });

    this.stateNotation = Annotation.Root({
      ...MessagesAnnotation.spec,
    });

    this.config = {
      configurable: {
        thread_id: uuidv4(),
      },
    };

    this.messages = [];

    this.memorySave = new MemorySaver();

    this.agent = new AgentService(this.configService);

    this.setDataSource();

    this.agent.init();
  }

  async setDataSource() {
    this.db = await SqlDatabase.fromDataSourceParams({ appDataSource: this.datasource });
  }

  async initChat() {
    await this.model.invoke([{ role: 'system', content: this.template }]);
    return;
  }

  async processMessage(input: string, clientId: string) {
    return await this.agent.ask(input, clientId);
  }

  private isSqlQuestion(text: string): boolean {
    console.log('text ' + text)
    return text.toLowerCase().includes('quantos') || text.toLowerCase().includes('listar') || text.toLowerCase().includes('clientes') || text.toLowerCase().includes('vendas');
  }
}
