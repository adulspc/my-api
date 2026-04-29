import {prisma} from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    const body =await req.json();

    const user = await prisma.user.findUnique({
        where : {
            email : body.email,
        }
    });

    if(!user){
        return Response.json({error : "Invalid email or password"}, {status : 401});
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if(!isPasswordValid){
        return Response.json({error : "Invalid email or password"}, {status : 401});
    }

    const secert = process.env.JWT_SECRET;

    if(!secert){
        throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({userId : user.id}, process.env.JWT_SECRET!, {expiresIn : "1d"});
    return Response.json({token});
}