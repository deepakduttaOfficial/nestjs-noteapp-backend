import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateNoteDto } from './dtos/CreateNote.dto';
import { UpdateNoteDto } from './dtos/UpdateNote.dro';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  // Create note
  async createNote(createNote: CreateNoteDto, req) {
    try {
      const { title, description } = createNote;
      const { id } = req.user;
      const note = await this.prisma.notes.create({
        data: { title, description, user: { connect: { id } } },
      });

      return note;
    } catch (error) {
      console.log(error);
    }
  }

  // Get notes based on user
  async getNotes(req) {
    try {
      const { id } = req.user;
      const notes = await this.prisma.notes.findMany({
        where: { usersId: id },
        include: { user: true },
      });
      return notes;
    } catch (error) {
      console.log(error);
    }
  }

  // Get single note based on user
  async getNote(req, params) {
    try {
      const { id } = req.user;
      const note = await this.prisma.notes.findUnique({
        where: { id: params.id },
      });
      if (note.usersId !== id) {
        throw new HttpException(
          'Not authenticate user',
          HttpStatus.BAD_REQUEST,
        );
      }
      return note;
    } catch (error) {
      console.log(error);
    }
  }

  // Update note
  async updateNote(req, params, updateNote: UpdateNoteDto) {
    const { title, description } = updateNote;
    try {
      const note = await this.prisma.notes.findUnique({
        where: { id: params.id },
      });

      if (!note && note.usersId !== req.id)
        throw new HttpException('Notes not found', HttpStatus.BAD_REQUEST);

      const updateNote = await this.prisma.notes.update({
        where: { id: params.id },
        data: { title, description },
      });

      return updateNote;
    } catch (error) {
      console.log(error);
    }
  }

  // Delete note
  async removeNote(req, params) {
    try {
      const note = await this.prisma.notes.findUnique({
        where: { id: params.id },
      });
      if (!note && note.usersId !== req.id)
        throw new HttpException('Notes not found', HttpStatus.BAD_REQUEST);

      await this.prisma.notes.delete({
        where: { id: params.id },
      });
      return { success: 'Note removed successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}
