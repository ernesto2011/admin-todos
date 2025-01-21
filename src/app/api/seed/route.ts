import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {
    await prisma.todo.deleteMany() 
    const todo= await prisma.todo.createMany({
        data: [
            { description: 'Piedra del Alma', complete: true },
            { description: 'Piedra del Infinito' },
            { description: 'Piedra del Tiempo' },
            { description: 'Piedra del Poder' },
            { description: 'Piedra del Realidad' }
        ]
    })

  return NextResponse.json({
    message:'Seed DataBase executed successfully!!!',
    todo:todo
  })
}