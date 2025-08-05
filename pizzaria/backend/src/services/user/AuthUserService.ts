import prismaClient from "../../prisma/index.js";
import { compare } from "bcryptjs";
import jwt from 'jsonwebtoken';


const { sign } = jwt;

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: AuthRequest){
        
        // Verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("User/password incorrect")
        }

        // Verificar se a senha que o usuario usou é a correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("User/password incorrect")
        }

        // Se tudo certo gera o token do usuario
        const token = sign({
            name: user.name,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: '30d'
        }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService };