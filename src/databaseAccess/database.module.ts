import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { AuthModule } from 'src/auth/auth.module';
import { GitHubStrategy } from 'src/auth/github.strategy';
import { Account } from 'src/Core/Entity/account.entity';
import { Issue } from 'src/Core/Entity/issue.entity';
import { Session } from 'src/Core/Entity/sesssion.entity';
import { User } from 'src/Core/Entity/user.entity';
=======
import { Product } from 'src/Core/Entity/product.entity';
>>>>>>> 91ba71987149fcba486f2abf9e1a87350177615e

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   useFactory: async () => ({
    //     type: 'mysql',
    //     host: process.env.DB_HOST || 'localhost',
    //     port: 3306,
    //     username: process.env.DB_USER || 'root',
    //     password: process.env.DB_PASS || '',
    //     database: process.env.DB_NAME || 'co-website',
    //     entities: [Product],
    //     synchronize: true, // Disable in production
    //     migrationsRun: true, // Run migrations automatically
    //   }),
    // }),

       TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        host:'localhost',
        port: 3306,
        username: 'root',
<<<<<<< HEAD
        password: '',
        database: 'nest',
        entities: [User, Issue, Account, Session],
        synchronize: true,
        migrationsRun: true,
      }),
    }),
    TypeOrmModule.forFeature([User]), // Add this line
    AuthModule, // Ensure that AuthModule is imported as well
  ],
  providers: [GitHubStrategy],
=======
        password:  '',
        database: 'co-website',
        entities: [Product],
        synchronize: true, // Disable in production
        migrationsRun: true, // Run migrations automatically
      }),
    }),


  ],
  

>>>>>>> 91ba71987149fcba486f2abf9e1a87350177615e
})
export class DatabaseAccess {}
