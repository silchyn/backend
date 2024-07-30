import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { Post as PostModel } from './post.model';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { permittedRoles } from '../auth/permittedRoles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({ status: 200, type: PostModel })
  @permittedRoles('USER')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(
    @Body() dto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<PostModel> {
    return this.postsService.createPost(dto, image);
  }
}
