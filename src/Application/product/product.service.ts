import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { CreateProductDto } from 'src/Core/DTO/createProduct.dto';
import { Product } from 'src/Core/Entity/product.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

 async create(createProductDto: CreateProductDto, file: Express.Multer.File): Promise<Product> {
    const { title } = createProductDto;

    // Check for duplicate title
    const existingProduct = await this.productRepository.findOne({ where: { title } });
    if (existingProduct) {
      throw new ConflictException('A product with the same title already exists.');
    }

    // Save the file path instead of the buffer
    const filePath = `uploads/${file.filename}`;

    const product = this.productRepository.create({
      ...createProductDto,
      imageName: filePath, 
    });

    return await this.productRepository.save(product);
  }


  


  //  async update(updateIssuedto: UpdateIssueDto,issueId:number): Promise<Issue | any> {


  //    const issue = await this.productRepository.findOne({where:{id:issueId}})
 

  //    if (!issue) {
  //       throw new NotFoundException(`Issue with ID ${issueId} not found`);
  //    }
    
  //   Object.assign(issue, updateIssuedto);


  //   const updateIssue= await  this.productRepository.save(issue)


  //   return {
  //     // success: 200,
  //     // message: 'ok',
  //     data: updateIssue,
  //   };

  // }

  async findAll(page: number = 1, limit: number = 5): Promise<any> {
    const skip = (page - 1) * limit;
    const [list, total] = await this.productRepository.findAndCount({
      skip,
      take: limit,
    });


    const mappedProducts = list.map((product) => ({

      id: product.id,
      title: product.title,
      imageName: product.imageName, 
      imageUrl: product.imageName ? `${product.imageName}` : null, 
    }));

    return {
      data: mappedProducts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  

  
//   async assignIssueToUser(assign:AssignIssueDto): Promise<Issue> {
//     const issue = await this.productRepository.findOne({ where: { id: assign.issueId } });
//     if (!issue) {
//       throw new NotFoundException(`Issue with ID ${assign.issueId} not found`);
//     }

//     const user = await this.userRepository.findOne({ where: { id: assign.userId } });
//     if (!user) {
//       throw new NotFoundException(`User with ID ${assign.userId} not found`);
//     }

//     issue.assignedUser = user;
//     issue.assignedUserId = user.id;

//     return this.productRepository.save(issue);
//   }

//   async getIssuesByUser(userId: string): Promise<Issue[]> {
//     return this.productRepository.find({ where: { assignedUserId: userId } });
//   }


//   async getIssueById (issueId:number):Promise<Issue[]|any>{
//     const getIssue= await this.productRepository.find({where:{id:issueId}})
//     return {
//         data:getIssue
//     }
//   }


//   async deleteIssue(issueId:number):Promise<Issue|any>{
//      const issue = await this.productRepository.findOne({where:{id:issueId}})

//       if (!issue) {
//       throw new NotFoundException(`Issue with ID ${issueId} not found.`);
//     }

//  await this.productRepository.remove(issue);

//     return { message: `Issue with ID ${issueId} deleted successfully.` };  }


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
