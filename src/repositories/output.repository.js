const { prisma } = require('../service/prisma')

exports.createOutput = async (data) => {
    const output = await prisma.outputs.create({
        data: {
            name: data.name,
            value: data.value,
            date: data.date,
            month: data.month,
            userId: data.userId
        },
    });
    return output;
}

exports.getAll = async (userId) => {
    const outputs = await prisma.outputs.findMany({
        where: {
            userId
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: false,
                    updatedAt: false
                }
            }
        }
    })
    return outputs
}

exports.getOutput = async (id) => {
    const output = await prisma.outputs.findUnique({ 
        where: {
            id
        },

        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: false,
                    updatedAt: false
                }
            }
        }
    })

    return output
}

exports.updateOutput = async (id, data) => {
    const output = await prisma.outputs.update({
        where: {
            id
        },

        data: {
            name: data.name,
            value: data.value,
            date: data.date,
            month: data.month,
            userId: data.userId
        }
    })

    return output
}

exports.deleteOutput = async (id) => {
    await prisma.outputs.delete({
        where: { 
            id
        }
    })

    return 
}

exports.filterMonth = async (month, userId) => {
    const output = await prisma.outputs.findMany({
        where: { 
            month,
            userId
        },

        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: false,
                    updatedAt: false
                }
            }
        }
    })

    return output
}