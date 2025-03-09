import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIssueDto } from 'src/Core/DTO/create-issue.dto';
import { Issue } from 'src/Core/Entity/issue.entity';
import { User } from 'src/Core/Entity/user.entity';
import { UpdateIssueDto } from 'src/Core/DTO/update-issue.dto';
import { AssignIssueDto } from 'src/Core/DTO/asiign-issue.dto';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private readonly issueRepository: Repository<Issue>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createIssueDto: CreateIssueDto): Promise<Issue | any> {

     const { title, description } = createIssueDto;

    const existingIssue = await this.issueRepository.findOne({
      where: { title, description },
    });

    if (existingIssue) {
      throw new ConflictException('An issue with the same title and description already exists.');
    }
    const issue = this.issueRepository.create(createIssueDto);
    const  savedIssue = await this.issueRepository.save(issue); // Save the user to the database

    return {
      // success: 200,
      // message: 'ok',
      data: savedIssue,
    };

  }

   async update(updateIssuedto: UpdateIssueDto,issueId:number): Promise<Issue | any> {


     const issue = await this.issueRepository.findOne({where:{id:issueId}})
 

     if (!issue) {
        throw new NotFoundException(`Issue with ID ${issueId} not found`);
     }
    
    Object.assign(issue, updateIssuedto);


    const updateIssue= await  this.issueRepository.save(issue)


    return {
      // success: 200,
      // message: 'ok',
      data: updateIssue,
    };

  }

async findAll(page: number = 1, limit: number = 5): Promise<any> {
    const skip = (page - 1) * limit;
    const [list, total] = await this.issueRepository.findAndCount({
      skip,
      take: limit,
    });

    return {
      data: list,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  
  async assignIssueToUser(assign:AssignIssueDto): Promise<Issue> {
    const issue = await this.issueRepository.findOne({ where: { id: assign.issueId } });
    if (!issue) {
      throw new NotFoundException(`Issue with ID ${assign.issueId} not found`);
    }

    const user = await this.userRepository.findOne({ where: { id: assign.userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${assign.userId} not found`);
    }

    issue.assignedUser = user;
    issue.assignedUserId = user.id;

    return this.issueRepository.save(issue);
  }

  async getIssuesByUser(userId: string): Promise<Issue[]> {
    return this.issueRepository.find({ where: { assignedUserId: userId } });
  }


  async getIssueById (issueId:number):Promise<Issue[]|any>{
    const getIssue= await this.issueRepository.find({where:{id:issueId}})
    return {
        data:getIssue
    }
  }


  async deleteIssue(issueId:number):Promise<Issue|any>{
     const issue = await this.issueRepository.findOne({where:{id:issueId}})

      if (!issue) {
      throw new NotFoundException(`Issue with ID ${issueId} not found.`);
    }

 await this.issueRepository.remove(issue);

    return { message: `Issue with ID ${issueId} deleted successfully.` };  }


}

  // async assignedUser(id:number):Promise<User | null>{

  //   const assigne = await this.userRepository.findOne({where:{id}})

  //   return assigne
  // }

  //   async assigned(id:number): Promise<Issue>{
  //  const assigne = await this.userRepository.findOne({ where:{id}});
  //      if (!assigne) {
  //         throw new NotFoundException(`User with ID ${id} not found`);

  //     }  
  //    return assigne
  // }
