const { prisma } = require('../service/prisma')

exports.createInputs = async (data) => {
    const input = await prisma.inputs.create({
        data: {
            name: data.name,
            value: data.value,
            date: data.date,
            month: data.month,
            userId: data.userId
        }
    })
    return input

}

exports.getAll = async (userId) => {
    const allInputs = await prisma.inputs.findMany({
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
    return allInputs
}

exports.getId = async (id) => {
    const input = await prisma.inputs.findUnique({
         where:{
            id
         }
        
    })


    return input
}

exports.update = async (id, data) => {
    const input = await prisma.inputs.update({
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

    return input
}

exports.deleteInput = async (id) => {
    await prisma.inputs.delete({
        where: {
            id
        }
    })
    return
}

exports.filterMonth = async (month, userId) => {
    const inputs = await prisma.inputs.findMany({
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

    return inputs
}
