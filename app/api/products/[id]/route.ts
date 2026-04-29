
 import { prisma } from "@/lib/prisma";

type RouteContext = {
    params: Promise<{ id: string }>;
}

async function getId(context: RouteContext){
    const {id} = await context.params;
    return Number(id);
}

export async function GET(_req:Request,context:RouteContext){
    const id = await getId(context);
    const product = await prisma.product.findUnique({
        where :{id},
    });
    return Response.json(product);
}

export async function PUT(req: Request, context: RouteContext) {
    const id = await getId(context);
    const body = await req.json();
    const product =await prisma.product.update({
        where : {id},
        data :{
            name : body.name,
            price : body.price,
        }
    });
    return Response.json(product);
}