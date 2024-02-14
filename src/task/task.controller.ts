import { Body, Controller, Delete, Get, Param, Put, Post, BadRequestException, NotFoundException } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "@prisma/client";

@Controller('tasks')
export class TaskController{

    constructor(private readonly taskService: TaskService){};
    
    @Post()
    async create(@Body() data:Task){
        return this.taskService.create(data);
    }

    @Get()
    async findAll(): Promise<Task[]>{
        return this.taskService.findAll();
    }

    
    @Get(':id')
    async fibdById(@Param('id') id:string){
        const found = await this.taskService.findById(Number(id));
        if(!found) throw new NotFoundException("The task with that id doesn't exist");
        return found;
    }
    
    @Put(':id')
    async update(@Param('id') id:string, @Body() data:Task){
        return this.taskService.update(Number(id), data);
    }
    
    @Delete(':id')
    async delete(@Param('id') id:string){
        const found = await this.taskService.findById(Number(id));
        if(!found) throw new BadRequestException("The task with that id doesn't exist");
        return this.taskService.delete(Number(id));
    }
}