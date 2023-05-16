import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateNoteDto } from './dtos/CreateNote.dto';
import { UpdateNoteDto } from './dtos/UpdateNote.dro';
import { NoteService } from './note.service';

@Controller('api/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}
  // Create note
  @UseGuards(JwtAuthGuard)
  @Post('create')
  CreateNote(@Body() createNote: CreateNoteDto, @Request() req) {
    return this.noteService.createNote(createNote, req);
  }

  // gets Notes
  @UseGuards(JwtAuthGuard)
  @Get('gets')
  getNotes(@Request() req) {
    return this.noteService.getNotes(req);
  }

  // get Single Notes
  @UseGuards(JwtAuthGuard)
  @Get('get/:id')
  getNote(@Request() req, @Param() params) {
    return this.noteService.getNote(req, params);
  }

  // update Notes
  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  updateNote(
    @Request() req,
    @Param() params,
    @Body() updateNote: UpdateNoteDto,
  ) {
    return this.noteService.updateNote(req, params, updateNote);
  }

  // Delete note
  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  removeNote(@Request() req, @Param() params) {
    return this.noteService.removeNote(req, params);
  }
}
