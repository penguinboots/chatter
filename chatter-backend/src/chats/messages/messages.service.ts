import { Injectable } from '@nestjs/common';
import { ChatsRepository } from '../chats.respository';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './entities/message.entity';
import { Types } from 'mongoose';

@Injectable()
export class MessagesService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async createMessage({ content, chatId }: CreateMessageInput, userId: string) {
    const message: Message = {
      content,
      userId,
      createdAt: new Date(),
      _id: new Types.ObjectId(),
    };

    await this.chatsRepository.findOneAndUpdate(
      {
        // Find chat
        _id: chatId,
        // Confirm access
        $or: [
          { userId },
          {
            userIds: {
              $in: [userId],
            },
          },
        ],
      },
      {
        // Add message
        $push: {
          messages: message,
        },
      },
    );

    return message;
  }
}
