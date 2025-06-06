import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './rag/dto/create-rag.dto';

@Injectable()
export class MessageService {
  private chat: any;
  private chatInitialized: Promise<void>;

  async initializeChat() {
    console.log('iniciando chat...1');
    try {
      console.log('iniciando chat...2');
      const { default: ragDantas } = (await import('rag-dantas'));
      this.chat = new ragDantas.SimpleChatBot();
      console.log('chat inicializado com sucesso');
    } catch (error) {
      console.error('Failed to initialize chat:', error);
      throw error;
    }
  }

  async processMessage(createMessageDto: CreateMessageDto): Promise<string> {
    try {
      // Wait for chat to be initialized before processing messages
      await this.chatInitialized;

      if (!this.chat) {
        throw new Error('Chat not initialized');
      }

      const processMessage = this.handleTextInput(createMessageDto.text, createMessageDto.clientId);

      const response = await this.chat.sendMessage(processMessage); // Use the correct method name from your lib

      return response;
    } catch (error) {
      console.error('Error processing message:', error);
      throw error;
    }
  }

  handleTextInput(text: string, clientId: string): string {
    if (!this.chat) {
      throw new Error('Chat not initialized');
    }

    const inputText = `Processe a seguinte pergunta :${text}, apenas para o cliente de id: ${clientId}, dê uma resposta curta e objetiva, sem explicações, apenas a resposta, sem mencionar outros dados do banco de dados.`;

    return inputText;
  }
}
