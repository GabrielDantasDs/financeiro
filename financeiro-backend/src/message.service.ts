import { Injectable } from "@nestjs/common";
import { RagService } from "./rag/rag.service";

@Injectable()
export class MessageService {
  constructor(Rag:RagService) {
    const rag = Rag;
  }
  
  processMessage(text: string) {
    return `Processed: ${text}`;
  }
}
