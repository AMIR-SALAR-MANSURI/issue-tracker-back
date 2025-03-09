import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { promises } from 'dns';
import { IssueService } from 'src/Application/issues/isuues.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AssignIssueDto } from 'src/Core/DTO/asiign-issue.dto';
import { CreateIssueDto } from 'src/Core/DTO/create-issue.dto';
import { UpdateIssueDto } from 'src/Core/DTO/update-issue.dto';
import { Issue } from 'src/Core/Entity/issue.entity';

@Controller('issues')
export class IssueController {
  constructor(private readonly IssueService: IssueService) {}

  @Post("create")
  // @ApiBearerAuth()
  //  @UseGuards(JwtAuthGuard)
  async create(@Body() createIssueDto: CreateIssueDto): Promise<Issue> {
    return await this.IssueService.create(createIssueDto);
  }

@Get()
@ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, example: 5, description: 'Number of items per page (default: 5)' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number
  ) {
    return this.IssueService.findAll(page, limit);
  }



   @Post('/assign')
  async assignIssueToUser(
    // @Param('issueId') issueId: number,
    @Body()body:AssignIssueDto
  ): Promise<Issue> {
    try {
      return await this.IssueService.assignIssueToUser(body);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

    @Get('user/:userId')
  async getIssuesByUser(@Param('userId') userId: string): Promise<Issue[]> {
    try {
      return await this.IssueService.getIssuesByUser(userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
    
  }

      @Get('/:issueId')
  async getIssueById(@Param('issueId') issueId: number): Promise<Issue[]> {
    try {
      return await this.IssueService.getIssueById(issueId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
    
  }

  @Patch('edit/:id')
  async update(
    @Param('id',ParseIntPipe)id:number,
    @Body()updateIssue:UpdateIssueDto,

  ):Promise<Issue |any>{
    const updatedIssue = await this.IssueService.update(updateIssue,id);

    if (!updatedIssue) {
      throw new NotFoundException(`Issue with ID ${id} not found.`);
    }
  return updatedIssue
  }


  @Delete('delete/:id')
  async delete(@Param('id',ParseIntPipe)id:number):Promise<{message:string}>{
    return await this.IssueService.deleteIssue(id)
  }

  

  //     @Patch(':id')
  // async assinedUser(@Param('id') id: number): Promise<Issue> {
  //   return await this.IssueService.assigned(+id);
  // }
  // @Get()
  // async findAll(): Promise<[]> {
  //   return await this.usersService.findAll();
  // }

//   @Get(':id')
//   async findOne(@Param('id') id: number): Promise<User> {
//     return await this.usersService.findOne(+id);
//   }
}