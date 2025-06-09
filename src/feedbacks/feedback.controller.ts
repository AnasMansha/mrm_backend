import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { FeedbacksService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { AddFeedbackChatDto } from './dto/add-feedback-chat.dto';

@ApiTags('feedbacks')
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post()
  @ApiOperation({
    summary: 'Create feedback if order exists and user owns the order',
  })
  @ApiBody({ type: CreateFeedbackDto })
  @ApiResponse({ status: 201, description: 'Feedback created successfully' })
  create(@Body() dto: CreateFeedbackDto) {
    return this.feedbacksService.create(dto);
  }

  @Put(':id/chats')
  @ApiOperation({ summary: 'Add a chat message to the feedback chat array' })
  @ApiParam({ name: 'id', type: String, description: 'Feedback ID' })
  @ApiBody({ type: AddFeedbackChatDto })
  @ApiResponse({ status: 200, description: 'Chat added successfully' })
  addChat(@Param('id') id: string, @Body() dto: AddFeedbackChatDto) {
    return this.feedbacksService.addChat(id, dto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete feedback by comma-separated IDs' })
  @ApiQuery({
    name: 'ids',
    type: String,
    description: 'Comma-separated feedback IDs (e.g. uuid1,uuid2)',
  })
  @ApiResponse({ status: 200, description: 'Feedback(s) deleted successfully' })
  delete(@Query('ids') ids: string) {
    return this.feedbacksService.delete(ids.split(','));
  }

  @Get('user/:user_id')
  @ApiOperation({ summary: 'Get all feedbacks by user ID' })
  @ApiParam({ name: 'user_id', type: String, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Feedbacks fetched successfully' })
  getByUser(@Param('user_id') userId: string) {
    return this.feedbacksService.getByUser(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all feedbacks' })
  @ApiResponse({
    status: 200,
    description: 'All feedbacks fetched successfully',
  })
  getAll() {
    return this.feedbacksService.getAll();
  }
}
