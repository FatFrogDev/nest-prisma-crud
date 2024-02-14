import { Injectable } from "@nestjs/common";
import { Task } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TaskService{
    constructor(private prisma:PrismaService){}

    findAll(): Promise<Task[]>{
        return this.prisma.task.findMany();
    }

    async findById(id:number): Promise<Task>{
        return this.prisma.task.findUnique({
            where:{
                id
            }
        });
    }

    async create(data:Task): Promise<Task>{
        return this.prisma.task.create({
            data
        });
    }

    async update(id:number, data:Task): Promise<Task>{
        return this.prisma.task.update({
            where:{id},
            data
        });
    }

    async delete(id:number): Promise<Task>{
        return this.prisma.task.delete({
            where:{id}
        });
    }
}