const { prisma } = require("../service/prisma")

exports.createUser = async (data) => {
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password,
            status: data.status
        }, 
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
            status: true,
            createdAt: true,
            updatedAt:true
        }
    })

    return user
}

exports.getAll = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
            status: true,
            createdAt: true,
            updatedAt:true
        }
    });
    return users;
}

exports.getById = async (id) => {
    const user = await prisma.user.findUnique({ 
        where: {
            id
        }, 
        
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
            status: true,
            createdAt: true,
            updatedAt:true
        }
    })

    return user
}

exports.update = async (id, data) => {
    const user = await prisma.user.update({
        where: {
            id
        }, 
        data: {
            name: data.name,
            email: data.email,
            status: data.status
        },

        select: {
            id: true,
            name: true,
            email: true,
            password: false,
            status: true,
            createdAt: true,
            updatedAt:true
        }
    })
    return user
}

exports.deleteUser = async id => {
    await prisma.inputs.deleteMany({
        where: {
            userId: id
        }
    }) 
    await prisma.outputs.deleteMany({
        where: {
            userId: id
        }
    }) 
    const user = await prisma.user.delete({
        where: {
            id
        }
    })

    return user
}