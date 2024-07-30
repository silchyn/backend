import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { CreatePostDto } from './dto/createPost.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postsRepository: typeof Post,
    private filesService: FilesService,
  ) {}

  async createPost(
    dto: CreatePostDto,
    image: Express.Multer.File,
  ): Promise<Post> {
    const filename = await this.filesService.createFile(image);

    return this.postsRepository.create({ ...dto, image: filename });
  }
}
